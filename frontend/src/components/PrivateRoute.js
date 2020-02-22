import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useAuth } from '../context/auth-context';
import Swal from 'sweetalert2'

export function PrivateRoute({ children, allowedRoles, ...others }) {
  const { role } = useAuth();
  function loginOrNot(){
    if(role === null){
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Tú token de sesión ha expirado o tú rol no te permite acceder a este contenido'
      });
    }
  }
  return (
    <React.Fragment>
      {(role !== null ? allowedRoles.includes(role.role) : false) ? (<Route {...others}>{children}</Route>
      ) : (
        loginOrNot(),
        <Redirect to="/"/>
      )}
    </React.Fragment>
);
}
