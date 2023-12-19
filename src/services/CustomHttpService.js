import * as $ from "../redux/actionTypes";
import store from "../redux/configureStore";

import {DEFAULT_HEADERS} from "../utils/index";

import APP_CONFIG from "../config/env-config";

const STATUS_UNAUTHORIZED = 401;
const STATUS_SERVER_ERROR = 500;
const STATUS_NOT_SUCCESS = (status) => parseInt(status / 100, 10) !== 2;
export default class CustomHttpService {
  fetch = async (options) => {
    const fullApiPath = `${APP_CONFIG.API_PATH}${options.endpoint}`;
    let body = options.body || {};
    const method = options.method || "GET";
    const headers = options.headers || {};
    if ([undefined, null, "", "null", "undefined"].includes(headers.token)) {
      delete headers.token;
    }
    const defaultHeader = await DEFAULT_HEADERS();
    if (!options.isFormData) headers["Content-Type"] = "application/json";
    else {
      const formData = new FormData();
      Object.keys(body).forEach((item) => {
        const value = typeof body[item] !== "boolean" && !body[item] ? "" : body[item];
        formData.append(item, value);
      });
      body = formData;
    }
    const fetchOptions = {
      method,
      // credentials: "include",
      headers: {
        ...defaultHeader,
        ...headers
      }
    };

    if (method === "POST" || method === "PATCH" || method === "PUT") {
      fetchOptions.body = options.isFormData ? body : JSON.stringify(body);
    }

    return this._doFetch(fullApiPath, fetchOptions);
  };
  _doFetch = (fullApiPath, fetchOptions) => {
    return new Promise((resolve, reject) => {
      fetch(fullApiPath, fetchOptions)
        .then((res) => {
          res.json().then((data) => {
            if (res.status === STATUS_UNAUTHORIZED) {
              store.dispatch({
                type: $.LOGOUT_REQUEST
              });
              reject("Login again");
            } else if (STATUS_NOT_SUCCESS(res.status)) {
              const {error, message} = data;
              if (res.status === STATUS_SERVER_ERROR) reject("Something went wrong!");
              if (message && Array.isArray(message)) reject(message.join("\n"));
              else if (error) reject(error);
              else reject();
            } else resolve(data);
          });
        })
        .catch((err) => {
          if (err.message === "Failed to fetch" && window.location.host.includes("localhost")) {
            reject({message: "BACKEND IS OFFLINE!"});
          } else reject(err);
        });
    });
  };
}
