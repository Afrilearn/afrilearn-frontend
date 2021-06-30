import React from "react";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
export default function AuthenticatedRoute({ component: C, ...rest }) {
  const token = localStorage.getItem("token");
  return (
    <Route
      {...rest}
      render={props =>
        token
          ? <C {...props} />
          : <Redirect
              to={`/login?redirect=${props.location.pathname}${props.location.search}`}
            />}
    />
  );
}