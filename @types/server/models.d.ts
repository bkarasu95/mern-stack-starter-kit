import { Document } from "mongoose";
import { IProductImage } from "../common/product";

export interface ProductModel extends Document {
  name: string;
  price: number;
  sku: string;
  slug: string;
  _id: string;
  images?: Array<IProductImage>;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date
}

export interface IProduct {

}

export interface LogModel extends Document {
  type: string
  url: string
  log: object
  message: string
  statusCode: number
  createdAt?: Date
  updatedAt?: Date
  deletedAt?: Date
}

export interface ILog {
  type: LogModel['type']
  url: LogModel['url']
  log: LogModel['log']
  message: LogModel['message']
  statusCode: LogModel['statusCode']
  createdAt?: LogModel['createdAt']
  updatedAt?: LogModel['updatedAt']
  deletedAt?: LogModel['deletedAt']
}