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
  const history = useHistory();
  const { setRole, setCurrentUser } = useAuth();

  const handleLogin = (formData) => {
    return signIn(formData)
      .then((response) => {
        setRole(jwt_decode(response.data.accessToken));
        setCurrentUser(response.data);
        history.push('/dashboard');
      })
      .catch((error) => {
        setBackendErrorMessage('The credentials are invalid');
        setValue('password', '');
        setError('password', 'credentials', 'The credentials are invalid');
      });
  };

  return (
    <React.Fragment>
      <body class="bg-comun">
        <form class="container-fluid container-form" onSubmit={handleSubmit(handleLogin)} noValidate>
          <div class="row mt-10">
            <div class="col-12 d-flex justify-content-center">
              <img class="img-fluid witdh" src="/image/logo_color.png" />
            </div>
          </div>
          <div class="row mt-3">
            <div class="text-center col-12 d-flex justify-content-center">
              <p class="font-20">
                ¡Adéntrate ahora en el <br></br>mundo de las empresas!
              </p>
            </div>
          </div>

          <div class="row mt-3">
            <div class="col-12">
              <input
                ref={register({
                  required: 'The email is mandatory',
                  pattern: {
                    value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                    message: 'The email is not valid'
                  }
                })}
                name="email"
                type="email"
                class="input-login"
                placeholder="Correo electrónico"
              ></input>
            </div>
            {errors.email && <span className="errorMessage">{errors.email.message}</span>}
          </div>
          <div class="row mt-2">
            <div class="col-12">
              <input
                ref={register({
                  required: 'The password is mandatory',
                  minLength: {
                    value: 6,
                    message: 'You should enter a password with at least 6 characters'
                  }
                })}
                name="password"
                type="password"
                class="input-login"
                placeholder="Contraseña"
              ></input>
            </div>
            {errors.password && <span className="errorMessage">{errors.password.message}</span>}
          </div>
          <div class="row mt-3">
            <div class="col-6">
              <Link class="text-uppercase font-12 color-texto-login" to="/register">
                ¿AÚN NO ESTAS REGISTRADO?
              </Link>
            </div>
            <div class="col-6">
              <Link class="text-uppercase font-12 pull-right color-texto-login" to="/">
                RECORDAR CONTRASEÑA
              </Link>
            </div>
          </div>
          <div class="row mt-4">
            <div class="col-12 mx-auto text-center">
              <button type="submit" className="btn btn-xl-siguiente btn-xl" disabled={formState.isSubmitting}>
                ENTRAR
              </button>
            </div>
          </div>
          <div class="row mt-4">
            <div class="col-12 mx-auto text-center">
              <p class="text-inicio-sesion-login">Si lo prefieres puedes iniciar sesión con:</p>
            </div>
          </div>

          <div class="row mt-2">
            <div class="col-6">
              <button class="btn btn-redes-sociales-login btn-xl btn-facebook">Facebook</button>
            </div>
            <div class="col-6">
              <button class="btn btn-redes-sociales-login btn-xl btn-google">Google</button>
            </div>
          </div>
          <div class="row mt-5">
            <div class="col-12 mx-auto text-center">
              <p class="text-condiciones-login mt-5 mb-10">
                Para continuar, por favor, debes aceptar nuestros <br></br>Términos y condiciones
              </p>
            </div>
          </div>
        </form>
      </body>
    </React.Fragment>
  );
}
