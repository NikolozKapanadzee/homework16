import { Request, Response } from "express";
import ProductModel from "../models/products.model";
import { isValidObjectId } from "mongoose";
import {
  productsSchema,
  updateProductSchema,
} from "../validations/products.validation";
import { CloudinaryImageTypes } from "../types/index";
import { v2 as cloudinary } from "cloudinary";

const getAllProducts = async (req: Request, res: Response): Promise<void> => {
  try {
    const { category, price, page = 1, limit = 30, search } = req.query;
    const filter: Record<string, unknown> = {};
    if (typeof category === "string" && category.trim()) {
      filter.category = category.trim();
    }
    if (typeof search === "string" && search.trim()) {
      const term = search.trim();
      filter.title = { $regex: "^" + term, $options: "i" };
    }
    //aq ver mivxvdi sad unda gvedzebna da marto title shi ra sityvacaa iq edzebs, anu sityvaze mountain ro eweros captionshi ar modzebnis marto titleshi edzebs
    const sort: Record<string, 1 | -1> = {};
    if (price === "asc") {
      sort.price = 1;
    } else if (price === "desc") {
      sort.price = -1;
    }
    const pageNum = Math.max(Number(page), 1);
    const limitNum = Math.min(Math.max(Number(limit), 1), 30);
    const skip = (pageNum - 1) * limitNum;
    const products = await ProductModel.find(filter)
      .sort(sort)
      .skip(skip)
      .limit(limitNum);
    if (category && products.length === 0) {
      res
        .status(404)
        .json({ error: `No products found in category '${filter.category}'` });
      return;
    }
    res.json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const createProduct = async (req: Request, res: Response) => {
  try {
    if (!req.file) {
      res.status(400).json({ error: "Image is required" });
      return;
    }
    const newImage: CloudinaryImageTypes = {
      url: req.file.path,
      public_id: req.file.filename,
    };
    const bodyToValidate = {
      ...req.body,
      image: newImage,
    };
    const { error, value } = productsSchema.validate(bodyToValidate, {
      abortEarly: false,
    });
    if (error) {
      res.status(400).json({ error: error.details.map((err) => err.message) });
      return;
    }
    const newProduct = await ProductModel.create(value);
    res.status(201).json(newProduct);
  } catch (err) {
    console.error("Create product error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

const updateProduct = async (req: Request, res: Response): Promise<void> => {
  console.log("req.body raw:", req.body);
  const extractPublicId = (url: string): string => {
    const parts = url.split("/");
    const filename = parts[parts.length - 1];
    return filename.split(".")[0];
  };
  try {
    const file = req.file as Express.Multer.File | undefined;
    const imageUrl = file?.path;
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
      res.status(400).json({ error: "wrong ID is provided" });
      return;
    }
    const existingProduct = await ProductModel.findById(productId);
    if (!existingProduct) {
      res.status(404).json({ error: "Product not found" });
      return;
    }
    if (imageUrl) {
      const oldPublicId: string | undefined = existingProduct.image?.public_id;
      if (oldPublicId) {
        try {
          await cloudinary.uploader.destroy(oldPublicId);
        } catch (err) {
          console.error("failed to delete image from Cloudinary:", err);
        }
      }
      const newImage: CloudinaryImageTypes = {
        url: imageUrl,
        public_id: extractPublicId(imageUrl),
      };
      value.image = newImage;
    }
    const updatedProduct = await ProductModel.findByIdAndUpdate(
      productId,
      {
        $set: value,
        $inc: { __v: 1 },
      },
      { new: true }
    );
    res.status(200).json({
      message: "Product updated",
      updatedProduct,
    });
  } catch (err) {
    console.error("update product error:", err);
    res.status(500).json({ error: "internal server error" });
  }
};
const deleteProduct = async (req: Request, res: Response) => {
  try {
    const productId = req.params.id;
    if (!isValidObjectId(productId)) {
      res.status(400).json({ error: "wrong id is provided" });
      return;
    }
    const productToDelete = await ProductModel.findById(productId);
    if (!productToDelete) {
      res.status(404).json({ error: "product not found" });
      return;
    }
    if (productToDelete.image?.public_id) {
      const fullPublicId = `uploads/${productToDelete.image.public_id}`;
      const deleteResult = await cloudinary.uploader.destroy(fullPublicId);
    }
    const deletedProduct = await ProductModel.findByIdAndDelete(productId);
    res.status(200).json({
      message: "product and image deleted successfully",
      deletedProduct,
    });
  } catch (err) {
    console.error("Delete product error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
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
