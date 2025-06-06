import { Router } from "express";
import {
  getAllProducts,
  createProduct,
  updateProduct,
} from "../services/products.service";
const productsRouter = Router();

productsRouter.get("/", getAllProducts);
productsRouter.post("/", createProduct);
productsRouter.put("/:id", updateProduct);

export default productsRouter;
