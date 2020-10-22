import axios from "axios";
import { logout } from "../store/authenticate/actions";
import { adminApiURL } from "./../../resources/strings/apiURL";
import { store } from "./../index";

class ApiRequest {
  headers: { Authorization: string; "Content-type"?: string };
  constructor() {
    this.headers = {
      Authorization: "Bearer " + localStorage.getItem("admin:accessToken"),
      "Content-type": "multipart/form-data; boundary=" + Date.now(),
    };
  }
  post(url: string, body: object) {
    return new Promise((resolve, reject) => {
      axios.post(adminApiURL + url, body, {
        headers: this.headers,
      }).then(res => {
        resolve(res);
      }).catch((res) => {
        if (res.response.status === 401) {
          store.dispatch(logout());
        }
        resolve(res.response);
      });
    });
  }
  async put(url: string, body: object) {
    return await axios.put(adminApiURL + url, body, {
      headers: this.headers,
    });
  }
  get(url: string, params?: object) {
    return new Promise((resolve, reject) => {
      axios
        .get(adminApiURL + url, {
          headers: this.headers,
          params: params
        })
        .then((res) => {
          resolve(res);
        })
        .catch((res) => {
          if (res.response.status === 401) {
            store.dispatch(logout());
          }
          resolve(res);
        });
    });
  }
/**
 * 
 * @param url 
 * @param id if id is not in url param, set the id from there
 */
  delete(url: string, id: string = "") {
    return new Promise((resolve, reject) => {
      axios
        .delete(adminApiURL + url + id, {
          headers: this.headers,
        })
        .then((res) => {
          resolve(res);
        })
        .catch((res) => {
          if (res.response.status === 401) {
            store.dispatch(logout());
          }
          resolve(res);
        });
    });
  }
}

export default ApiRequest;
