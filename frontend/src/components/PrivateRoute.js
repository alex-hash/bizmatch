import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useAuth } from '../context/auth-context';
import Swal from 'sweetalert2'

export function PrivateRoute({ children, allowedRoles, ...others }) {
  const { role } = useAuth();
  return (
    <React.Fragment>
      {(role !== null ? allowedRoles.includes(role.role) : false) ? (<Route {...others}>{children}</Route>
      ) : (
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Necesitas estar logueado para ver esta página!',
        }),
        <Redirect to="/login" />
      )}
    </React.Fragment>
);
}
