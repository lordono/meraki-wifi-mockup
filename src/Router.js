import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import AppPage from "./App";
import LoginPage from "./Login";

const AppRouter = () => {
  const [myAuth, setMyAuth] = useState(false);
  return (
    <Router>
      <Switch>
        <PrivateRoute exact path="/" myAuth={myAuth}>
          <AppPage />
        </PrivateRoute>
        <Route path="/login">
          <LoginPage setMyAuth={setMyAuth} />
        </Route>
      </Switch>
    </Router>
  );
};

export default AppRouter;
