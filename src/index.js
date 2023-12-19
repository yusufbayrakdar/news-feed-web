import React from "react";
import ReactDOM from "react-dom";
import {Provider} from "react-redux";
import {BrowserRouter} from "react-router-dom";

import {ConfigProvider} from "antd";
import "antd/dist/antd.css";

import store from "./redux/configureStore";

import NoDataLogo from "./assets/no_data.svg";

import App from "./App";

const customizeRenderEmpty = () => (
  <div style={{textAlign: "center"}}>
    <img alt={"No data found"} src={NoDataLogo} style={{width: 100, height: "auto", marginBottom: 10}}></img>
    <p>Data Not Found</p>
  </div>
);

ReactDOM.render(
  <BrowserRouter>
    <Provider store={store}>
      <ConfigProvider renderEmpty={customizeRenderEmpty}>
        <App />
      </ConfigProvider>
    </Provider>
  </BrowserRouter>,
  document.getElementById("root")
);
