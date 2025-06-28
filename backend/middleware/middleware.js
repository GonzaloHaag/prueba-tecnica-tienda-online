import jwt from "jsonwebtoken";
import config from "../utils/config.js";
import { User } from "../models/user.js";
/** Middleware para capturar lo que viene en la request de cada solicitud */
const requestLogger = (req, res, next) => {
  console.log("Method:", req.method);
  console.log("Path:  ", req.path);
  console.log("Body:  ", req.body);
  console.log("---");
  next();
};
/** Middleware para extraer el usuario en la request y validar la sesion */
const userExtractor = async (req, res, next) => {
  const authorization = req.get("Authorization");
  
  if (!authorization) {
    return res.status(401).json({ error: "Token no proporcionado" });
  }
  
  if (!authorization.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Formato de token inválido" });
  }
  
  try {
    const token = authorization.substring(7);
    req.token = token;
    
    const decodedToken = jwt.verify(token, config.JWT_SECRET);
    
    if (!decodedToken._id) {
      return res.status(401).json({ error: "Token inválido - ID de usuario no encontrado" });
    }
    
    const user = await User.findById(decodedToken._id).select('-password');
    
    if (!user) {
      return res.status(401).json({ error: "Usuario no encontrado" });
    }
    
    req.user = user;
    return next();
  } catch (error) {
    console.error('Error en userExtractor:', error.message);
    
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ error: "Token expirado" });
    }
    
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({ error: "Token inválido - Verifica que el JWT_SECRET sea correcto" });
    }
    
    return res.status(500).json({ error: "Error interno del servidor" });
  }
};

/** Middleware para rutas que son solo para admin */
const requireAdmin = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({ error: 'Usuario no autenticado' });
  }
  
  if (req.user.role === "admin") {
    return next();
  }
  
  return res.status(403).json({ error: 'Acceso denegado - Se requieren permisos de administrador' });
};

export default {
  requestLogger,
  userExtractor,
  requireAdmin
};
