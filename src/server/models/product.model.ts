import mongoose, { Schema, Document } from "mongoose";
import { IProductImage } from "../../../@types/common/product";

// useful for sql actions
export interface ProductModel extends Document {
  name: string;
  price: number;
  sku: string;
  slug: string;
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
  slug: {
    type: String,
    required: true,
    unique: true,
    index:true
  },
  status: {
    type: Boolean,
    required: true,
    default: false,
  },
  content: {
    type: String,
    required: true,
  },
  images: [
    {
      
      path: {
        type: String
      },
    },
  ],
});
export const Product = mongoose.model<ProductModel>("Product", ProductSchema);
