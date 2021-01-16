import { Document } from "mongoose";
import { LanguageParams } from "../common/lang";
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


export interface AdminMenuModel extends Document {
  id: number,
  name: string,
  label: IAdminMenuLabel | string,
  url?: string,
  parentID: number
}


export interface IAdminMenu {
  id: AdminMenuModel['id']
  name: AdminMenuModel['name']
  label: AdminMenuModel['label']
  url?: AdminMenuModel['url']
  parentID: AdminMenuModel['parentID']
  children?: Array<IAdminMenu>
}

export interface IAdminMenuLabel {
  key: string,
  params: LanguageParams
}
