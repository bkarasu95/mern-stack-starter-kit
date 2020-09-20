import { store } from "./../index";
import { adminApiURL } from "./../../resources/strings/apiURL";
import axios from "axios";
import querystring, { ParsedUrlQueryInput } from "querystring";
import { logout } from "../store/authenticate/actions";

class ApiRequest {
  headers: { Authorization: string };
  constructor() {
    this.headers = {
      Authorization: "Bearer " + localStorage.getItem("admin:accessToken"),
    };
  }
  async post(url: string, body: object) {
    return await axios.post(adminApiURL + url, body, {
      headers: this.headers,
    });
  }
  get(url: string, params?: ParsedUrlQueryInput) {
    return new Promise((resolve, reject) => {
      axios
        .get(adminApiURL + url + querystring.stringify(params), {
          headers: this.headers,
        })
        .then((res) => {
          resolve(res);
        })
        .catch((res) => {
          if (res.status === 401) {
            store.dispatch(logout());
          }
        });
    });
  }
}

export default ApiRequest;
