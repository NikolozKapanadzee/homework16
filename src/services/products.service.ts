import { Request, Response } from "express";
import ProductModel from "../models/products.model";
import { isValidObjectId } from "mongoose";
import {
  productsSchema,
  updateProductSchema,
} from "../validations/products.validation";

const getAllProducts = async (req: Request, res: Response) => {
  const products = await ProductModel.find();
  res.json(products);
};
const createProduct = async (req: Request, res: Response) => {
  const { error, value } = productsSchema.validate(req.body || {}, {
    abortEarly: false,
  });
  console.log(error);
  if (error) {
    res.status(400).json({
      error: error.details.map((err) => err.message),
    });
    return;
  }
  const newProduct = await ProductModel.create(value);
  console.log("product created:", newProduct);
  res.status(201).json(newProduct);
};
const updateProduct = async (req: Request, res: Response) => {
  const { error, value } = updateProductSchema.validate(req.body || {}, {
    abortEarly: false,
    allowUnknown: false,
  });
  if (error) {
    res.status(400).json({
      error: error.details.map((err) => err.message),
    });
    return;
  }
  const productId = req.params.id;
  if (!isValidObjectId(productId)) {
    res.status(400).json({ error: "wrong id is provided" });
  }
  const updatedProduct = await ProductModel.findByIdAndUpdate(
    productId,
    {
      $set: value,
      $inc: { __v: 1 },
    },
    { new: true }
  );
  if (!updatedProduct) {
    res.status(404).json({ error: "product not found" });
    return;
  }
  res.status(200).json({ message: "product updated", updatedProduct });
};
const deleteProduct = async (req: Request, res: Response) => {
  const productId = req.params.id;
  if (!isValidObjectId(productId)) {
    res.status(400).json({ error: "wrong id is provided" });
  }
  const deletedProduct = await ProductModel.findByIdAndDelete(productId);
  if (!deletedProduct) {
    res.status(404).json({ error: "product not found" });
  }
  res.status(200).json({ message: "product deleted", deletedProduct });
};
const getProductById = async (req: Request, res: Response) => {
  const productId = req.params.id;
  if (!isValidObjectId(productId)) {
    res.status(400).json({ error: "wrong id is provided" });
  }
  const product = await ProductModel.findById(productId);
  if (!product) {
    res.status(404).json({ error: "product not found" });
  }
  res.status(200).json({ product });
};

export {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductById,
};
