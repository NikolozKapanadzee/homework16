import mongoose, { Schema, Model } from "mongoose";

const productSchema: Schema<IProducts> = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    caption: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);
const ProductModel: Model<IProducts> = mongoose.model<IProducts>(
  "Product",
  productSchema
);
export default ProductModel;
