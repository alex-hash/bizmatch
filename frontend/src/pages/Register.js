import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { signUp } from '../http/authService';
import { Link, useHistory } from 'react-router-dom';

export function Register() {
  const { handleSubmit, register, errors, formState, setError, setValue } = useForm({
    mode: 'onBlur'
  });
  const history = useHistory();

  const handleRegister = (formData) => {
    return signUp(formData)
      .then(() => {
        window.alert('El usuario ha sido creado con exito');
        history.push('/login');
      })
      .catch((error) => {
        if (error.response.status === 409) {
          setValue('email', '');
          setError('email', 'conflict', 'The email you entered already exists');
        }
      });
  };

  return(
<div className="flex items-center justify-center bg-green-400">
  <div className="w-full max-w-md mt-4">
    <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 mx-4" onSubmit={handleSubmit(handleRegister)} noValidate>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" for="name">
          Name
        </label>
        <input ref={register({
          required: '*El nombre es necesario',
          maxLength: {
            message: "*Su nombre no debe exceder los 45 caracteres",
            value: 45
          },
        })}
        name="name"
        type="text"
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
        placeholder="Nombre"
        ></input>
        {errors.name && (
          <span className="error-validate">{errors.name.message}</span>
        )}
      </div>
      <div className="mb-4">
        <div className="flex justify-between">
          <label className="block text-gray-700 text-sm font-bold mb-2" for="first_name">
            Primer apellido
          </label>
        </div>
        <input ref={register({
          required: '*El primer apellido es necesario',
          maxLength: {
            message: "*Su primer apellido no debe exceder los 45 caracteres",
            value: 45
          },
        })}
        name="first_name"
        type="text"
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
        placeholder="Primer apellido"
        ></input>
        {errors.first_name && (
          <span className="error-validate">{errors.first_name.message}</span>
        )}
      </div>
      <div className="mb-4">
        <div className="flex justify-between">
          <label className="block text-gray-700 text-sm font-bold mb-2" for="last_name">
            Segundo apellido
          </label>
        </div>
        <input ref={register({
          required: '*El segundo apellido es necesario',
          maxLength: {
            message: "*Su segundo apellido no debe exceder los 45 caracteres",
            value: 45
          },
        })}
        name="last_name"
        type="text"
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
        placeholder="Segundo Apellido"
        ></input>
        {errors.last_name && (
          <span className="error-validate">{errors.last_name.message}</span>
        )}
      </div>
      <div className="mb-4">
        <div className="flex justify-between">
          <label className="block text-gray-700 text-sm font-bold mb-2" for="email">
            Email
          </label>
        </div>
        <input ref={register({
          required: '*El email es necesario',
          maxLength: {
            message: "*El email no debe exceder los 255 caracteres",
            value: 255
          },
          pattern: {
            message: '*El email no es válido',
            value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          },
        })}
        name="email"
        type="email"
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
        placeholder="Email"></input>
        {errors.email && (
          <span className="error-validate">{errors.email.message}</span>
        )}
      </div>
      <div className="mb-4">
        <div className="flex justify-between">
          <label className="block text-gray-700 text-sm font-bold mb-2" for="password">
            Contraseña
          </label>
        </div>
        <input
        ref={register({
          required: '*La contraseña es necesaria',
          minLength: {
            message: '*La contraseña debe superar los 8 caracteres',
            value: 8
          },
          pattern: {
            message: "*La contraseña solo puede tener a-zA-Z0-9@#$*",
            value: /^[a-zA-Z0-9@#$*]{3,30}$/
          }
        })}
        name="password"
        type="password"
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
        placeholder="Contraseña"
      ></input>
      {errors.password && (
        <span className="error-validate">{errors.password.message}</span>
      )}
      </div>
      <div className="mb-4">
        <div className="flex justify-between">
          <label className="block text-gray-700 text-sm font-bold mb-2" for="birthday">
            Fecha de nacimiento
          </label>
        </div>
        <input
          ref={register({
            required: '*La fecha de nacimiento es necesaria',
            pattern: {
              message: '*El formato debe ser YYYY-MM-DD y debes ser mayor de edad',
              value: /^(19[5-9][0-9]|200[0-2])[-](0?[1-9]|1[0-2])[-](0?[1-9]|[12][0-9]|3[01])$/
            }
          })}
          name="birthday"
          type="text"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
          placeholder="Fecha de nacimiento"
          ></input>
          {errors.birthday && (
            <span className="error-validate">{errors.birthday.message}</span>
          )}
      </div>
      <div className="mb-4">
        <div className="flex justify-between">
          <label className="block text-gray-700 text-sm font-bold mb-2" for="country">
            País
          </label>
        </div>
        <input ref={register({
          required: 'El país es necesario',
          maxLength: {
            message: "*El país no puede exceder los 20 caracteres",
            value: 20
          },
          })}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
          name="country"
          type="text"
          placeholder="País"
          ></input>
          {errors.country && (
            <span className="error-validate">{errors.country.message}</span>
          )}
      </div>
      <div className="mb-4">
        <div className="flex justify-between">
          <label className="block text-gray-700 text-sm font-bold mb-2" for="city">
            Ciudad
          </label>
        </div>
        <input ref={register({
          required: 'The city is mandatory',
          maxLength: {
            message: "City length should be less than 30",
            value: 30
          },
          })}
          name="city"
          type="text"
          placeholder="Ciudad"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
          ></input>
          {errors.city && (
            <span className="error-validate">{errors.city.message}</span>
          )}
      </div>
      <div className="mb-4">
        <div className="flex justify-between">
          <label className="block text-gray-700 text-sm font-bold mb-2" for="company_name">
            Empresa (Opcional)
          </label>
        </div>
        <input ref={register}
          name="company_name"
          type="text"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
          placeholder="La empresa en la que trabajas"
          ></input>
          {errors.company_name && (
            <span className="error-validate">{errors.company_name.message}</span>
          )}
      </div>
      <div className="mb-4">
        <div className="flex justify-between">
          <label className="block text-gray-700 text-sm font-bold mb-2" for="company_role">
            Cargo (Opcional)
          </label>
        </div>
        <input ref={register}
          name="company_role"
          type="text"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
          placeholder="Cargo que ocupas en tú empresa"
          ></input>
          {errors.company_role && (
            <span className="error-validate">{errors.company_role.message}</span>
          )}     
      </div>
      <div className="mb-4">
        <div className="flex justify-between">
          <label className="block text-gray-700 text-sm font-bold mb-2" for="company_role">
            Cargo (Opcional)
          </label>
        </div>
        <input ref={register}
          name="company_role"
          type="text"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
          placeholder="Cargo que ocupas en tú empresa"
          ></input>
          {errors.company_role && (
            <span className="error-validate">{errors.company_role.message}</span>
          )}     
      </div>
      <div className="mb-6">
        <div className="flex justify-between">
          <label className="block text-gray-700 text-sm font-bold mb-2" for="type">
            Tipo de usuario
          </label>
        </div>
        <select ref={register({ required: true })}
          name="type" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
          >
            <option value="E">Emprendedor</option>
            <option value="M">Mentor</option>
          </select>
          {errors.type && (
            <span className="error-validate">{errors.type.message}</span>
          )}     
      </div>
    <div className="flex items-center justify-center">
      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-8 rounded focus:outline-none focus:shadow-outline" type="submit" disabled={formState.isSubmitting}>
        Regístrate
      </button>
    </div>
    </form>
    <p className="text-center text-white text-xs">
      &copy;2020 Bizmatch. Todos los derechos reservados.
    </p>
  </div>
</div>
    /*
    <div className="container bg-form">
      <div class="container padding-top-20">
        <div className="row">
          <div className="col-8 mt-3">
            <a href="#" className="btn btn-xl-siguiente btn-xl-form-perfil">
              Ayúdanos a conocerte más
            </a>
          </div>
          <div className="col-3">
            <img className="img-fluid image-logo-form" src="/image/logo_form.png" />
          </div>
        </div>
        <form onSubmit={handleSubmit(handleRegister)} noValidate>
          <div className="row mt-3">
            <div className="col-md-12">
              <input ref={register({
                required: '*El nombre es necesario',
                maxLength: {
                  message: "*Su nombre no debe exceder los 45 caracteres",
                  value: 45
                },
              })}
              name="name"
              type="text"
              className="input-login"
              placeholder="Nombre"
              ></input>
              {errors.name && (
                <span className="error-validate">{errors.name.message}</span>
              )}
            </div>
          </div>
          
          <div className="row mt-3">
            <div className="col-md-12">
              <input ref={register({
                required: '*El segundo apellido es necesario',
                maxLength: {
                  message: "*Su segundo apellido no debe exceder los 45 caracteres",
                  value: 45
                },
              })}
              name="last_name"
              type="text"
              className="input-login"
              placeholder="Segundo Apellido"
              ></input>
              {errors.last_name && (
                <span className="error-validate">{errors.last_name.message}</span>
              )}
            </div>
          </div>
          <div className="row mt-3">
            <div className="col-md-12">
              <input ref={register({
                required: '*El email es necesario',
                maxLength: {
                  message: "*El email no debe exceder los 255 caracteres",
                  value: 255
                },
                pattern: {
                  message: '*El email no es válido',
                  value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                },
              })}
              name="email"
              type="email"
              className="input-login"
              placeholder="Email"></input>
              {errors.email && (
                <span className="error-validate">{errors.email.message}</span>
              )}
            </div>
          </div>
          <div className="row mt-3">
            <div className="col-md-12">
              <input
                ref={register({
                  required: '*La contraseña es necesaria',
                  minLength: {
                    message: '*La contraseña debe superar los 8 caracteres',
                    value: 8
                  },
                  pattern: {
                    message: "*La contraseña solo puede tener a-zA-Z0-9@#$*",
                    value: /^[a-zA-Z0-9@#$*]{3,30}$/
                  }
                })}
                name="password"
                type="password"
                className="input-login"
                placeholder="Contraseña"
              ></input>
              {errors.password && (
                <span className="error-validate">{errors.password.message}</span>
              )}
            </div>
          </div>
          <div className="row mt-3">
            <div className="col-md-12">
            <input
              ref={register({
                required: '*La fecha de nacimiento es necesaria',
                pattern: {
                  message: '*El formato debe ser YYYY-MM-DD y debes ser mayor de edad',
                  value: /^(19[5-9][0-9]|200[0-2])[-](0?[1-9]|1[0-2])[-](0?[1-9]|[12][0-9]|3[01])$/
                }
              })}
              name="birthday"
              type="text"
              className="input-login"
              placeholder="Fecha de nacimiento"
              ></input>
              {errors.birthday && (
                <span className="error-validate">{errors.birthday.message}</span>
              )}
            </div>
          </div>
          
          <div className="row mt-3">
            <div className="col-md-12">
              
            </div>
          </div>
          <div className="row mt-3">
            <div className="col-md-12">
              
            </div>
          </div>
          <div class="row mt-3">
            <div class="col-md-12">
              <a href="#" class="btn btn-xl-siguiente btn-xl-form-perfil">
                Datos empresa (Opcional)
              </a>
            </div>
          </div>
          <div className="row mt-3">
            <div className="col-md-12">
              <input ref={register}
              name="company_name"
              type="text"
              className="input-login"
              placeholder="Empresa"
              ></input>
              {errors.company_name && (
                <span className="error-validate">{errors.company_name.message}</span>
              )}
            </div>
          </div>
          <div className="row mt-3">
            <div className="col-md-12">
              <input ref={register}
              name="company_role"
              type="text"
              className="input-login"
              placeholder="Cargo"
              ></input>
              {errors.company_role && (
                <span className="error-validate">{errors.company_role.message}</span>
              )}
            </div>
          </div>
          <div className="row mt-3">
            <div className="col-md-12">
              <input ref={register}
              name="page_url"
              type="text"
              className="input-login"
              placeholder="Sitio web"
              ></input>
              {errors.page_url && (
                <span className="error-validate">{errors.page_url.message}</span>
              )}
            </div>
          </div>
          <div className="row mt-3">
            <div className="col-md-12">
              <select ref={register({ required: true })}
              name="type" className="input-login"
              >
                <option value="E">Emprendedor</option>
                <option value="M">Mentor</option>
              </select>
              {errors.type && (
                <span className="error-validate">{errors.type.message}</span>
              )}
            </div>
          </div>
          <div class="row mt-4">
            <div class="col-md-12 mb-5">
              <button
                type="submit"
                className="btn btn-xl-siguiente btn-xl-form-perfil btn-block"
                disabled={formState.isSubmitting}
              >
                Hecho
              </button>
            </div>
          </div>
          <div className="d-flex justify-content-center">
            <div class="col-md-12 mb-5">
              <Link to="/login" className="text-uppercase font-12 color-texto-login">Ya tienes una cuenta, porfavor inicia sesión</Link>
            </div>
          </div>
        </form>
      </div>
    </div>*/
  )
}
