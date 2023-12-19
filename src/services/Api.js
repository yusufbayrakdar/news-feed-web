import {TOKEN} from "../utils";

import CustomHttpService from "./CustomHttpService";

/**
 * class that we call API calls
 */
class Api {
  httpService = new CustomHttpService();

  setHttpService = (httpService) => {
    this.httpService = httpService;
  };

  // PUT request
  _doPut = (endpoint, body) => {
    return this.httpService.fetch({
      method: "PUT",
      body,
      endpoint
    });
  };

  _doPutWithAuth = (endpoint, body, isFormData = false) => {
    return this.httpService.fetch({
      method: "PUT",
      body,
      endpoint,
      isFormData,
      headers: {token: window.localStorage.getItem(TOKEN)}
    });
  };
  // POST request
  _doPost = (endpoint, body, isFormData = false) => {
    return this.httpService.fetch({
      method: "POST",
      body,
      endpoint,
      isFormData
    });
  };

  _doPostWithAuth = (endpoint, body, isFormData = false) => {
    return this.httpService.fetch({
      method: "POST",
      body,
      endpoint,
      headers: {token: window.localStorage.getItem(TOKEN)},
      isFormData
    });
  };

  _doDeleteWithAuth = (endpoint) => {
    return this.httpService.fetch({
      method: "DELETE",
      endpoint,
      headers: {token: window.localStorage.getItem(TOKEN)}
    });
  };

  // PATCH request
  _doPatch = (endpoint, body) => {
    return this.httpService.fetch({
      method: "PATCH",
      body,
      endpoint,
      headers: {token: window.localStorage.getItem(TOKEN)}
    });
  };

  // GET request
  _doGet = (endpoint) => {
    return this.httpService.fetch({
      method: "GET",
      endpoint
    });
  };

  _doGetWithAuth = (endpoint) => {
    return this.httpService.fetch({
      method: "GET",
      endpoint,
      headers: {token: window.localStorage.getItem(TOKEN)}
    });
  };

  objectToQueryString(obj) {
    if (typeof obj !== "object") return "";

    var str = [];
    for (var p in obj)
      if (obj.hasOwnProperty(p) && obj[p]) {
        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
      }
    return str.join("&") ? "?" + str.join("&") : "";
  }

  // auth
  signUp = (signUpData) => {
    return this._doPost("/auth/register", signUpData);
  };

  login = (loginData) => {
    return this._doPostWithAuth("/auth/login", loginData);
  };

  autoLogin = () => {
    return this._doGetWithAuth("/auth/profile");
  };

  // news
  theGuardianSearch = (payload) => {
    const query = this.objectToQueryString(payload);
    return this._doGetWithAuth("/news/the-guardian/search" + query);
  };

  getTheGuardianCategories = () => {
    return this._doGet("/news/the-guardian/categories");
  };

  newYorkTimesSearch = (payload) => {
    const query = this.objectToQueryString(payload);
    return this._doGetWithAuth("/news/new-york-times/search" + query);
  };

  getNewYorkTimesCategories = () => {
    return this._doGet("/news/new-york-times/categories");
  };

  saveUserPreferredCategories = (payload) => {
    return this._doPostWithAuth("/users/categories", payload);
  };
}
export default new Api();
