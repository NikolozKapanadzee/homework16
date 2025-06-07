import { Router } from "express";
import upload from "../config/clodinary.config";
import {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductById,
  addReview,
} from "../services/products.service";
import isAdmin from "../middlewares/isAdmin.middleware";
import hasEmail from "../middlewares/hasEmail.middleware";
const productsRouter = Router();

productsRouter.get("/", getAllProducts);
productsRouter.post("/", upload.single("image"), createProduct);
productsRouter.put("/:id", isAdmin, upload.single("image"), updateProduct);
productsRouter.delete("/:id", isAdmin, deleteProduct);
productsRouter.get("/:id", getProductById);
productsRouter.post("/:id/review", hasEmail, addReview);

export default productsRouter;
