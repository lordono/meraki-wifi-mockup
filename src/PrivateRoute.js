import React from "react";
import { Redirect, Route } from "react-router-dom";

const PrivateRoute = ({ children, myAuth, ...rest }) => {
  console.log(myAuth);
  return (
    <Route
      {...rest}
      render={({ location }) =>
        myAuth ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location },
            }}
          />
        )
      }
    />
  );
};

export default PrivateRoute;
