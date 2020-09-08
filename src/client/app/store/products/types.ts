import { IProduct } from "./../../../../common/resources/types/product";
export const FETCH_PRODUCTS = "fetch_products";

export interface Products {
  products: Array<IProduct> | null;
}
