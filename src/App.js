import React, {useEffect} from "react";
import {useSelector} from "react-redux";

import {Layout} from "antd";

import Routes from "./screens/Routes";

import Header from "./components/Layout/Header";
import Sider from "./components/Layout/Sider";

import useBaseScreen from "./hooks/useBaseScreen";

const {Content} = Layout;

const App = () => {
  const loggedIn = useSelector((state) => state.auth.loggedIn);
  const {dispatchAction, $} = useBaseScreen();

  useEffect(() => {
    if (!loggedIn) {
      dispatchAction($().AUTO_LOGIN_REQUEST);
    }
  }, [$, dispatchAction, loggedIn]);

  useEffect(() => {
    dispatchAction($().GET_THE_GUARDIAN_CATEGORIES_REQUEST);
    dispatchAction($().GET_NEW_YORK_TIMES_CATEGORIES_REQUEST);
  }, [$, dispatchAction]);

  return (
    <Layout style={{minHeight: "100vh"}}>
      <Sider />
      <Layout className="site-layout">
        <Header />
        <Content style={{margin: "0 16px"}}>
          <Routes />
        </Content>
      </Layout>
    </Layout>
  );
};

export default App;
