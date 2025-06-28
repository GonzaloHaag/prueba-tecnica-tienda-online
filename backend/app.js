import express from "express";
import cors from "cors";
import authRouter from "./controllers/auth.js";
import middleware from './middleware/middleware.js';
import productsRouter from "./controllers/products.js";
import adminRouter from "./controllers/admin.js";
import mongoose from "mongoose";
import { connectDb } from "./utils/db.js";
const app = express();

mongoose.set('strictQuery',false);
connectDb();

// Configuración de CORS más específica
const corsOptions = {
  origin: [
    'http://localhost:3000', // Desarrollo local
    'https://prueba-tecnica-tienda-online.vercel.app/',
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(middleware.requestLogger);
app.get("/", (req, res) => {
  res.send("Hello world!");
});
app.use("/api/auth", authRouter);
app.use("/api/products",middleware.userExtractor,productsRouter)
app.use("/api/admin/",middleware.userExtractor,middleware.requireAdmin,adminRouter)

export default app;
