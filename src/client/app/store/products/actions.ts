import axios from "axios";
import { appApiURL } from "../../../resources/strings/apiURL";
import { FETCH_PRODUCTS } from "./types";

export async function fetchProducts() {  
  const res = await axios.get(appApiURL + "products");
  return {
    type: FETCH_PRODUCTS,
    payload: res.data.data,
  };
}
