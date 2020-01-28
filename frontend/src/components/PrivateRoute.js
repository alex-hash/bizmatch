import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useAuth } from '../context/auth-context';

export function PrivateRoute({ children, allowedRoles, ...others }) {
  const { role } = useAuth();
  return (
    <React.Fragment>
      {allowedRoles.includes(role) ? <Route {...others}>{children}</Route> : <Redirect to="/login" />}
    </React.Fragment>
  );
}
