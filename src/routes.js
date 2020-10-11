import React from "react";
import { Route, Switch, BrowserRouter, Redirect } from "react-router-dom";

import Login from "./pages/Login";
import Home from "./pages/Home";

const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Redirect path="/auth" to="/home" />
        <Route component={Login} path="/" exact />
        <Route component={Home} path="/home" />
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
