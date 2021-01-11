import axios, { AxiosError } from "axios";
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
  return await axios.get(appApiURL + "products/" + name).then(res => {
    return {
      type: FETCH_PRODUCT,
      payload: res.data.data,
    };
  }).catch((err: AxiosError) => {
    if (typeof err.response !== "undefined") { // it means the error gets from server
      console.log(err.response);
    } else {
      // TODO log the error
    }

    return {
      type: FETCH_PRODUCT,
      payload: {}
    };
  });


}
