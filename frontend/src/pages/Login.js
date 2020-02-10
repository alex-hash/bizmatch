import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useHistory } from 'react-router-dom';
import { signIn } from '../http/authService';
import { useAuth } from '../context/auth-context';
import jwt_decode from 'jwt-decode';

export function Login() {
  const [backendErrorMessage, setBackendErrorMessage] = useState('');
  const { handleSubmit, register, errors, watch, formState, setError, setValue, reset } = useForm({
    mode: 'onBlur'
  });
  let history = useHistory();
  const { setRole, setCurrentUser } = useAuth();

  const handleLogin = (formData) => {
    return signIn(formData)
      .then((response) => {
        setRole(jwt_decode(response.data.accessToken));
        setCurrentUser(response.data);
        history.push('/forums');
      })
      .catch((error) => {
        setBackendErrorMessage('The credentials are invalid');
        setValue('password', '');
        setError('password', 'credentials', 'The credentials are invalid');
      });
  };

  return (
<div className="flex items-center justify-center h-screen bg-green-400" >
  <div className="w-full max-w-md">
    <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 mx-4" onSubmit={handleSubmit(handleLogin)} noValidate>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" for="username">
          Email
        </label>
        <input 
          ref={register({
            required: '*El email es necesario',
            pattern: {
              value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
              message: '*El email no es válido'
            }
          })}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
          id="email" 
          type="text" 
          name="email"
          placeholder="Email" />
          {errors.email && <span className="error-validate">{errors.email.message}</span>}
      </div>
      <div className="mb-6">
        <div className="flex justify-between">
          <label className="block text-gray-700 text-sm font-bold mb-2" for="password">
            Contraseña
          </label>
          <Link className="inline-block align-baseline font-bold text-xs text-blue-500 hover:text-blue-800" href="#">
            Olvidaste tú contraseña?
          </Link>
        </div>
        <input 
          ref={register({
            required: '*La contraseña es necesaria',
            minLength: {
              value: 6,
              message: '*Su contraseña tiene más de 6 caracteres'
            }
          })}
          className="shadow appearance-none rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
          id="password"
          type="password"
          name="password"
          placeholder="******************" />
          {errors.password && <span className="error-validate">{errors.password.message}</span>}
      </div>
    <div className="flex items-center justify-center">
      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-8 rounded focus:outline-none focus:shadow-outline" type="submit" disabled={formState.isSubmitting}>
        Iniciar sesión
      </button>
    </div>
    </form>
    <p className="text-center text-white text-xs">
      &copy;2020 Bizmatch. Todos los derechos reservados.
    </p>
  </div>
</div>
    
);
}
