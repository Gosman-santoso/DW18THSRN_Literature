import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import { Context } from "./../context/context";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const [state] = useContext(Context);

  return (
    <Route
      {...rest}
      render={props =>
        state.loading ? (
          <h1></h1>
        ) : state.isLogin ? (
          <Component {...props} />
        ) : (
          <Redirect to="/" />
        )
      }
    />
  );
};
export default PrivateRoute;
