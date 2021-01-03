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
  type: 'rest' | 'cli'
  endpoint: string
  log: object
  message: string
  status: "error" | "warning" | "success"
  statusCode?: number
  createdAt?: Date
  updatedAt?: Date
  deletedAt?: Date
}

export interface ILog {
  type: LogModel['type']
  endpoint: LogModel['endpoint']
  log: LogModel['log']
  message: LogModel['message']
  status: LogModel['status']
  statusCode?: LogModel['statusCode']
  createdAt?: LogModel['createdAt']
  updatedAt?: LogModel['updatedAt']
  deletedAt?: LogModel['deletedAt']
}