import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useHistory } from 'react-router-dom';

export function ResetPassword() {
  const { handleSubmit, register, errors, watch, formState, setError, setValue, reset } = useForm({
    mode: 'onBlur'
  });

  return (
    <div>
      <div className="-mt-20 flex flex-wrap items-center justify-center min-h-screen">
        <div className="w-full max-w-md">
          <form
            className="bg-white border-gray-200 border-2 shadow-md rounded px-8 pt-6 pb-8 mb-4 mx-4"
            onSubmit={handleSubmit()}
            noValidate
          >
            <h1 className="text-center font-bold text-gray-700 text-lg mb-2">¿Olvidaste tu contraseña?</h1>
            <p>Ingrese su correo electrónico y le enviaremos un enlace para restablecer su contraseña.</p>
            <div className="mb-4">
              <label className="mt-2 block text-gray-700 text-sm font-bold mb-2" for="username">
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
                placeholder="Email"
              />
              {errors.email && <span className="error-validate">{errors.email.message}</span>}
            </div>

            <div className="flex items-center justify-center">
              <button
                className="relative bg-button text-white font-bold py-2 px-8 rounded focus:outline-none focus:shadow-outline"
                type="submit"
                disabled={formState.isSubmitting}
              >
                Recuperar contraseña
              </button>
            </div>
            <div className="flex flex-wrap justify-center mt-2">
              <Link
                className="relative inline-block align-baseline font-bold text-xs text-black text-center"
                to="/register"
              >
                Todavía no estás registrado?
              </Link>
            </div>
            <div className="flex flex-wrap justify-center mt-2">
              <Link
                className="relative inline-block align-baseline font-bold text-xs text-black text-center"
                to="/login"
              >
                Ya tengo cuenta, iniciar sesión
              </Link>
            </div>
          </form>
          <p className="text-center text-gray-700 text-xs">&copy;2020 Bizmatch. Todos los derechos reservados.</p>
        </div>
      </div>
    </div>
  );
}
