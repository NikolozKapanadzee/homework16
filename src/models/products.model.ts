import mongoose, { Schema, Model, Document } from "mongoose";
import { IProducts } from "../types/index";

interface IProductDocument extends IProducts, Document {}

const productSchema = new Schema(
  {
    title: { type: String, required: true },
    caption: { type: String, required: true },
    price: { type: Number, required: true },
    image: {
      url: { type: String, required: true },
      public_id: { type: String, required: true },
    },
    category: { type: String, required: true },
  },
  { timestamps: true }
);

const ProductModel: Model<IProductDocument> = mongoose.model<IProductDocument>(
  "Product",
  productSchema
);

export default ProductModel;
