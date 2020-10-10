import { Document } from "mongoose";
import { IProductImage } from "../common/product";

// useful for sql actions
export interface ProductModel extends Document {
  name: string;
  price: number;
  sku: string;
  slug: string;
  _id: string;
  images?: Array<IProductImage>;
  createdAt: Date;
  updatedAt: Date;
}
