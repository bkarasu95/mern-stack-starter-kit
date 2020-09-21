import axios from "axios";
import { appApiURL } from "../../../resources/strings/apiURL";
import { FETCH_PRODUCT, FETCH_PRODUCTS } from "./types";

export async function fetchProducts() {
  const res = await axios.get(appApiURL + "products");
  return {
    type: FETCH_PRODUCTS,
    payload: res.data.data,
  };
}

export async function fetchProduct(name: string) {
  const res = await axios
    .get(appApiURL + "products/" + name)
    .then((res) => {
      return res;
    })
    .catch((err) => {
      throw new Error(err);
    })
    
  return {
    type: FETCH_PRODUCT,
    payload: res.data.data,
  };
}
