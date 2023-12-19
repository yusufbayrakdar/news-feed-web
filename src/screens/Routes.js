import React from "react";
import {Redirect, Route, Switch} from "react-router-dom";

import styled, {keyframes} from "styled-components";

import News from "./News";

const ROUTES = {
  Dashboard: "/"
};

const opacity = keyframes`
  from {
    opacity:0;
  }
  to {
    opacity:1;
  }
`;

const OpacityAnimation = styled.div`
  animation: ${opacity} 0.4s ease-in;
`;

// prettier-ignore
const routes = [
  {path: ROUTES.Dashboard, Component: News, name: ""},
];

const renderRoutes = () => {
  return routes.map(({path, Component, redirect}, key) => (
    <Route
      exact
      path={path}
      key={key}
      render={(props) => (
        <OpacityAnimation key={key}>
          {redirect ? <Redirect to={redirect} /> : <Component {...props} />}
        </OpacityAnimation>
      )}
    />
  ));
};

const Routes = () => {
  return <Switch>{renderRoutes()}</Switch>;
};

export default Routes;
