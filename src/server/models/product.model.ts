import mongoose, { Schema } from "mongoose";
import { ProductModel } from "../../../@types/server/models";

const ProductSchema: Schema = new Schema(
  {
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
      index: true,
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
          type: String,
        },
      },
    ],
    deletedAt: {
      type: Date,
      default: null
    }
  },
  { timestamps: true },

);
ProductSchema.pre<ProductModel>("save", function (next) {
  this.createdAt = new Date();
  next();
});
ProductSchema.pre<ProductModel>("update", function (next) {
  this.updatedAt = new Date();
  next();
});
// TODO add the deleted_at support generally
export const Product = mongoose.model<ProductModel>("Product", ProductSchema);
