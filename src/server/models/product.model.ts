import { IProductImage } from "./../../common/resources/types/product";
import mongoose, { Schema, Document } from "mongoose";

// useful for sql actions
export interface ProductModel extends Document {
  name: string;
  price: number;
  sku: string;
  _id: string;
  images?: Array<IProductImage>;
}

const ProductSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  price: {
    type: Number,
    required: true,
  },
  sku: {
    type: String,
    required: true,
    unique: true,
  },
  images: [
    {
      path: {
        type: String,
      },
    },
  ],
});
export const Product = mongoose.model<ProductModel>("Product", ProductSchema);
