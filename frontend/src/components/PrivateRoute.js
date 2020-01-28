import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useAuth } from '../context/auth-context';

export function PrivateRoute({ children, allowedRoles, ...others }) {
  const { role } = useAuth();
  return <Route {...others}>{allowedRoles.includes(role) ? children : <Redirect to="/login" />}</Route>;
}
