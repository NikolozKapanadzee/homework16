import { Request, Response } from "express";
import ProductModel from "../models/products.model";
import productsSchema from "../validations/products.validation";

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

export { getAllProducts, createProduct };
