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

    reviews: [
      {
        email: { type: String, required: true },
        rating: { type: Number, required: true, min: 1, max: 5 },
        comment: { type: String, required: true },
        createdAt: { type: Date, default: Date.now },
      },
    ],
  },
  { timestamps: true }
);

const ProductModel: Model<IProductDocument> = mongoose.model<IProductDocument>(
  "Product",
  productSchema
);

export default ProductModel;
