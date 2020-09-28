import { IProduct } from "../../../../../@types/common/product";

export const FETCH_PRODUCTS = "fetch_products";
export const FETCH_PRODUCT = "fetch_product";
export interface Products {
  products: Array<IProduct> | null;
}