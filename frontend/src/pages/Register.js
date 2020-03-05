import React from 'react';
import { useForm } from 'react-hook-form';
import { signUp } from '../http/authService';
import { useHistory } from 'react-router-dom';
import { useAuth } from '../context/auth-context';
import Navbar from '../components/Navbar';
import Swal from 'sweetalert2';

export function Register() {
  const { handleSubmit, register, errors, formState, setError, setValue } = useForm({
    mode: 'onBlur'
  });
  const history = useHistory();
  const { role } = useAuth();

  const handleRegister = (formData) => {
    return signUp(formData)
      .then(() => {
        Swal.fire('Genial!', 'Te has registrado en nuestra web!', 'success');
        history.push('/login');
      })
      .catch((error) => {
        if (error.response.status === 409) {
          setValue('email', '');
          setError('email', 'conflict', 'The email you entered already exists');
        }
      });
  };

  return (
    <div>
      <div>
        <Navbar role={role}></Navbar>
      </div>
      <div className="flex items-center justify-center min-h-screen bg-no-repeat bg-left backimage">
        <div className="w-full max-w-md mt-2">
          <form
            className="bg-background-primary border-background-borderf border-2 shadow-md rounded px-8 pt-6 pb-8 mb-4 mx-4"
            onSubmit={handleSubmit(handleRegister)}
            noValidate
          >
            <h3 className="font-bold text-copy-primary">Datos personales</h3>
            <hr className="style1 mb-4" />
            <div className="mb-4">
              <input
                ref={register({
                  required: '*El nombre es necesario',
                  maxLength: {
                    message: '*Su nombre no debe exceder los 45 caracteres',
                    value: 45
                  }
                })}
                name="name"
                type="text"
                className="shadow appearance-none border rounded w-full py-2 px-3 border-background-borderf bg-background-secondary text-copy-primary leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Nombre"
              ></input>
              {errors.name && <span className="error-validate">{errors.name.message}</span>}
            </div>
            <div className="mb-4">
              <input
                ref={register({
                  required: '*El primer apellido es necesario',
                  maxLength: {
                    message: '*Su primer apellido no debe exceder los 45 caracteres',
                    value: 45
                  }
                })}
                name="first_name"
                type="text"
                className="shadow appearance-none border rounded w-full py-2 px-3 border-background-borderf bg-background-secondary text-copy-primaryleading-tight focus:outline-none focus:shadow-outline"
                placeholder="Primer apellido"
              ></input>
              {errors.first_name && <span className="error-validate">{errors.first_name.message}</span>}
            </div>
            <div className="mb-4">
              <input
                ref={register({
                  required: '*El segundo apellido es necesario',
                  maxLength: {
                    message: '*Su segundo apellido no debe exceder los 45 caracteres',
                    value: 45
                  }
                })}
                name="last_name"
                type="text"
                className="shadow appearance-none border rounded w-full py-2 px-3 border-background-borderf bg-background-secondary text-copy-primary leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Segundo Apellido"
              ></input>
              {errors.last_name && <span className="error-validate">{errors.last_name.message}</span>}
            </div>
            <div className="mb-4">
              <input
                ref={register({
                  required: '*El email es necesario',
                  maxLength: {
                    message: '*El email no debe exceder los 255 caracteres',
                    value: 255
                  },
                  pattern: {
                    message: '*El email no es válido',
                    value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                  }
                })}
                name="email"
                type="email"
                className="shadow appearance-none border rounded w-full py-2 px-3 border-background-borderf bg-background-secondary text-copy-primary leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Email"
              ></input>
              {errors.email && <span className="error-validate">{errors.email.message}</span>}
            </div>
            <div className="mb-4">
              <input
                ref={register({
                  required: '*La contraseña es necesaria',
                  minLength: {
                    message: '*La contraseña debe superar los 8 caracteres',
                    value: 8
                  },
                  pattern: {
                    message: '*La contraseña solo puede tener a-zA-Z0-9@#$*',
                    value: /^[a-zA-Z0-9@#$*]{3,30}$/
                  }
                })}
                name="password"
                type="password"
                className="shadow appearance-none border rounded w-full py-2 px-3 border-background-borderf bg-background-secondary text-copy-primary leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Contraseña"
              ></input>
              {errors.password && <span className="error-validate">{errors.password.message}</span>}
            </div>
            <div className="mb-4">
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
                className="shadow appearance-none border rounded w-full py-2 px-3 border-background-borderf bg-background-secondary text-copy-primary leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Fecha de nacimiento"
              ></input>
              {errors.birthday && <span className="error-validate">{errors.birthday.message}</span>}
            </div>
            <h3 className="font-bold text-copy-primary">Datos empresa</h3>
            <hr className="style1 mb-4" />
            <div className="mb-4">
              <input
                ref={register}
                name="company_name"
                type="text"
                className="shadow appearance-none border rounded w-full py-2 px-3 border-background-borderf bg-background-secondary text-copy-primary leading-tight focus:outline-none focus:shadow-outline"
                placeholder="La empresa en la que trabajas"
              ></input>
              {errors.company_name && <span className="error-validate">{errors.company_name.message}</span>}
            </div>
            <div className="mb-4">
              <input
                ref={register}
                name="company_role"
                type="text"
                className="shadow appearance-none border rounded w-full py-2 px-3 border-background-borderf bg-background-secondary text-copy-primary leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Cargo que ocupas en tú empresa"
              ></input>
              {errors.company_role && <span className="error-validate">{errors.company_role.message}</span>}
            </div>
            <div className="mb-4">
              <input
                ref={register}
                name="page_url"
                type="text"
                className="shadow appearance-none border rounded w-full py-2 px-3 border-background-borderf bg-background-secondary text-copy-primary leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Web url de la empresa"
              ></input>
              {errors.page_url && <span className="error-validate">{errors.page_url.message}</span>}
            </div>
            <div className="mb-6">
              <select
                ref={register({ required: true })}
                name="type"
                className="shadow appearance-none border rounded w-full py-2 px-3 border-background-borderf bg-background-secondary text-copy-primary leading-tight focus:outline-none focus:shadow-outline"
              >
                <option value="E">Emprendedor</option>
                <option value="M">Mentor</option>
              </select>
              {errors.type && <span className="error-validate">{errors.type.message}</span>}
            </div>
            <div className="flex items-center justify-center">
              <button
                className="bg-button text-white font-bold py-2 px-8 rounded focus:outline-none focus:shadow-outline"
                type="submit"
                disabled={formState.isSubmitting}
              >
                Regístrate
              </button>
            </div>
          </form>
          <p className="text-center text-copy-primary text-xs">&copy;2020 Bizmatch. Todos los derechos reservados.</p>
        </div>
      </div>
    </div>
  );
}
