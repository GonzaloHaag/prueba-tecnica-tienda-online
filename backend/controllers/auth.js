import express from "express";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';
import config from "../utils/config.js";
import { User } from "../models/user.js";
const authRouter = express.Router();

authRouter.post("/register", async (req, res) => {
  const { email, password, role } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: "Todos los campos son requeridos" });
  }
  if(password.length < 6) {
    return res.status(400).json({message:'La contraseña debe tener como minimo 6 caracteres'})
  }
  try {
    const userExist = await User.findOne({ email });
    if (userExist) return res.status(409).json({ message: "El usuario ya existe" });
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      email: email,
      password: hashedPassword,
      role: role || 'cliente'
    });
    await newUser.save();
    res.status(201).json({message:'Usuario creado exitosamente'})
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
});
authRouter.post('/login',async (req,res) => {
    const { email, password } = req.body;
    if(!email || !password) {
        return res.status(400).json({ message: "Todos los campos son requeridos" });
    }
    try {
      const findUser = await User.findOne({ email });
      const passwordCorrect = findUser ?  await bcrypt.compare(password,findUser.password) : false;
      if(!findUser || !passwordCorrect) {
          return res.status(401).json({ message: 'Credenciales inválidas'})
      }
      const userForToken = {
          _id: findUser._id,
          email: findUser.email,
          role:findUser.role
      }
      /** Creacion del token */
      const token = jwt.sign(
          userForToken,
          config.JWT_SECRET,
          { expiresIn: 60*60 }
      );
      const user = {
        _id: findUser._id,
        email: findUser.email,
        role: findUser.role
      };
      
      /** Devolvemos el token y los datos del usuario */
      res.status(200).send({ 
        token, 
        user,
        message: 'Login exitoso'
      })
    } catch (error) {
      console.error(error)
      return res.status(500).json({message:'Error en el servidor'})
    }
});

export default authRouter;
