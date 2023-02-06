import axios from "axios";
import {store} from  '../react-redux/store'

axios.defaults.baseURL = "http://127.0.0.1:5000";

axios.interceptors.request.use(
  function (config) {
    store.dispatch({ type: "show-loading" });
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  function (response) {
    store.dispatch({ type: "hide-loading" });
    return response;
  },
  function (error) {
    return Promise.reject(error);
  }
);