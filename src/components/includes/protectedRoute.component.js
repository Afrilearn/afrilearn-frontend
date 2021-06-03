import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

const ProtectedRoute = ({
  component: Component,
  auth: { isAuthenticated, authLoader },
  ...rest
}) => (
  <Route
    {...rest}
    render={(props) =>
      !isAuthenticated && !authLoader? <Redirect to="/login" /> : <Component {...props} />
    }
  />
);

const mapStateToProps = (state) => ({
  auth: state.auth,

});
export default connect(mapStateToProps)(ProtectedRoute);
