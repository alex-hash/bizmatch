import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useHistory } from 'react-router-dom';
import { signIn } from '../http/authService';
import Navbar from '../components/Navbar';
import { useAuth } from '../context/auth-context';
  import jwt_decode from 'jwt-decode';

export function Login() {
  const [backendErrorMessage, setBackendErrorMessage] = useState('');
  const { handleSubmit, register, errors, watch, formState, setError, setValue, reset } = useForm({
    mode: 'onBlur'
  });
  let history = useHistory();
  const { role, setRole, setCurrentUser } = useAuth();

  const handleLogin = (formData) => {
    return signIn(formData)
      .then((response) => {
        setRole(jwt_decode(response.data.accessToken));
        setCurrentUser(response.data);
        history.push('/');
      })
      .catch((error) => {
        setBackendErrorMessage('The credentials are invalid');
        setValue('password', '');
        setError('password', 'credentials', 'The credentials are invalid');
      });
  };

  return (
    <div>
      <div>
        <Navbar Role={role}/>
      </div>
      <div className="-mt-16 flex flex-wrap items-center justify-center min-h-screen" >
        <div className="w-full max-w-md">
          <form className="bg-white border-gray-200 border-2 shadow-md rounded px-8 pt-6 pb-8 mb-4 mx-4" onSubmit={handleSubmit(handleLogin)} noValidate>
            <h1 className="text-center font-bold text-gray-700 text-lg mb-2">Iniciar sesión</h1>
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
                className="relative shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                id="email" 
                type="text" 
                name="email"
                placeholder="Email" />
                {errors.email && <span className="error-validate">{errors.email.message}</span>}
            </div>
            <div className="mb-6">
              <div className="flex justify-between">
                <label className="block text-gray-700 text-sm font-bold mb-2 mr-4" for="password">
                  Contraseña
                </label>
                <Link className="relative inline-block align-baseline font-bold text-xs underline text-black text-right" href="#">
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
                className="relative shadow appearance-none rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                id="password"
                type="password"
                name="password"
                placeholder="***********" />
                {errors.password && <span className="error-validate">{errors.password.message}</span>}
            </div>
            <div className="flex items-center justify-center">
              <button className="relative bg-button text-white font-bold py-2 px-8 rounded focus:outline-none focus:shadow-outline" type="submit" disabled={formState.isSubmitting}>
                Iniciar sesión
              </button>
              
            </div>
            <div className="flex flex-wrap justify-center mt-2">
              <Link className="relative inline-block align-baseline font-bold text-xs text-black text-center" to="/register">
                Todavía no estás registrado?
              </Link>
            </div>
          </form> 
          <p className="text-center text-gray-700 text-xs">
            &copy;2020 Bizmatch. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </div>
);
}
