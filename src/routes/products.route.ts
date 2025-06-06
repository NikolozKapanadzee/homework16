import { Router } from "express";
import upload from "../config/clodinary.config";
import {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductById,
} from "../services/products.service";
const productsRouter = Router();

productsRouter.get("/", getAllProducts);
productsRouter.post("/", upload.single("image"), createProduct);
productsRouter.put("/:id", updateProduct);
productsRouter.delete("/:id", deleteProduct);
productsRouter.get("/:id", getProductById);

export default productsRouter;
