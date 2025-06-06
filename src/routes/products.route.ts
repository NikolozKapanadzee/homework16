import { Router } from "express";
import { getAllProducts, createProduct } from "../services/products.service";
const productsRouter = Router();

productsRouter.get("/", getAllProducts);
productsRouter.post("/", createProduct);

export default productsRouter;
