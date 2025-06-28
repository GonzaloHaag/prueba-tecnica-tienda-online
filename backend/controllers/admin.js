import express from "express";
import { Product } from '../models/product.js';
const adminRouter = express.Router();

adminRouter.get("/count-products", async (req, res) => {
    try {
      // Contar todos los productos
      const count = await Product.countDocuments({});
      
      // Obtener productos con stock bajo (menores a 3)
      const lowStockProducts = await Product.find({ 
        stock: { $lt: 3 } 
      }).select();
      
      return res.status(200).json({
        count,
        lowStockProducts,
        lowStockCount: lowStockProducts.length
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Error en el servidor" });
    }
  });

export default adminRouter;