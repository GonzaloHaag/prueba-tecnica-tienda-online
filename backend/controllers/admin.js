import express from "express";
import { Product } from '../models/product.js';
const adminRouter = express.Router();

adminRouter.get("/count-products", async (req, res) => {
    try {
      const count = await Product.countDocuments({});
      
      // Convertir stock a número para comparación correcta
      const lowStockProducts = await Product.find({}).then(products => 
        products.filter(product => {
          const stockNumber = parseInt(product.stock) || 0;
          return stockNumber < 3;
        })
      );
      
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