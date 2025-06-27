import express from "express";
import { v2 as cloudinary } from "cloudinary";
import multer from "multer";
import { Product } from "../models/product.js";
import { configCloudinary } from "../utils/cloudinary.js";
import streamifier from "streamifier";
const productsRouter = express.Router();

cloudinary.config(configCloudinary);
const upload = multer({ storage: multer.memoryStorage() });
productsRouter.post("/new", upload.single("image"), async (req, res) => {
  const { name, description, price, stock, category } = req.body;
  if (!name || !description || !price || !req.file || !stock || !category) {
    return res.status(400).json({ message: "Todos los campos son requeridos" });
  }
  if (price < 0) {
    return res.status(400).json({ message: "El precio no puede ser negativo" });
  }
  if (stock < 0) {
    return res.status(400).json({ message: "El stock no puede ser negativo" });
  }
  try {
    // Subir la imagen a cloudinary, en la carpeta prueba-tecnica
    const result = await new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        { folder: "prueba-tecnica" },
        (error, result) => {
          if (result) resolve(result);
          else reject(error);
        }
      );
      streamifier.createReadStream(req.file.buffer).pipe(stream); // streamifier para convertir el buffer a un stream de lectura
    });

    const newProduct = new Product({
      ...req.body,
      user_id: req.user._id,
      image: result.secure_url,
    });
    await newProduct.save();
    return res.status(201).json({ message: "Producto creado exitosamente" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error en el servidor" });
  }
});
productsRouter.get("/", async (req, res) => {
  try {
    const products = await Product.find({ user_id: req.user_id });
    return res.status(200).json(products);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error en el servidor" });
  }
});
productsRouter.put("/:id", upload.single("image"), async (req, res) => {
  const productId = req.params.id;
  try {
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Producto no encontrado" });
    }

    if (
      product.user_id.toString() !== req.user._id.toString()
    ) {
      return res
        .status(403)
        .json({ message: "No tienes permiso para actualizar este producto" });
    }

    // Actualizacion de campos
    const { name, description, price, stock, category } = req.body;
    if (name) product.name = name;
    if (description) product.description = description;
    if (price) {
      if (price < 0)
        return res
          .status(400)
          .json({ message: "El precio no puede ser negativo" });
      product.price = price;
    }
    if (stock) {
      if (stock < 0)
        return res
          .status(400)
          .json({ message: "El stock no puede ser negativo" });
      product.stock = stock;
    }
    if (category) product.category = category;

    // Si hay nueva imagen, la subo a cloudinary
    if (req.file) {
      const result = await new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { folder: "prueba-tecnica" },
          (error, result) => {
            if (result) resolve(result);
            else reject(error);
          }
        );
        streamifier.createReadStream(req.file.buffer).pipe(stream);
      });
      product.image = result.secure_url;
    }

    await product.save();
    return res
      .status(200)
      .json({ message: "Producto actualizado exitosamente", product });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error en el servidor" });
  }
});
productsRouter.delete("/:id", async (req, res) => {
  const productId = req.params.id;
  try {
    const findProduct = await Product.findOne({ _id: productId });
    if (!findProduct) {
      return res.status(404).json({ message: "Producto no encontrado" });
    }
    if (!findProduct.user_id || findProduct.user_id !== req.user._id) {
      return res.status(401).json({ error: "Usuario no autorizado" });
    }
    await Product.findByIdAndDelete(productId);
    return res
      .status(200)
      .json({ message: "Producto eliminado correctamente" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error en el servidor" });
  }
});
export default productsRouter;
