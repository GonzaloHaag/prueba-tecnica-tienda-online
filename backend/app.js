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
app.use(cors());
app.use(express.json());
app.use(middleware.requestLogger);
app.get("/", (req, res) => {
  res.send("Hello world!");
});
app.use("/api/auth", authRouter);
app.use("/api/products",middleware.userExtractor,productsRouter)
app.use("/api/admin/",middleware.userExtractor,middleware.requireAdmin,adminRouter)

export default app;
