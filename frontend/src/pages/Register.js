import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { signUp } from '../http/authService';
import { useAuth } from '../context/auth-context';
import { Link, useHistory } from 'react-router-dom';

export function Register() {
  const {
    handleSubmit,
    register,
    errors,
    watch,
    formState,
    setError,
    setValue,
    reset
  } = useForm({
    mode: 'onBlur'
  });
  const { setRole, setCurrentUser } = useAuth();
  const history = useHistory();

  const handleRegister = formData => {
    return signUp(formData)
      .then(() => {
        window.alert("El usuario ha sido creado con exito");
        history.push("/login");
      })
      .catch(error => {
        if(error.response.status === 409){
          setValue('email', '');
          setError('email', 'conflict', 'The email you entered already exists');
        }
      });
  };

  return(
    <main className="">
      <h3>Please Register</h3>
      <form onSubmit={handleSubmit(handleRegister)} noValidate>
        <div className={`form-control ${
          errors.name ? 'ko' : formState.touched.name && 'ok'
        }`}
        >
          <label>Name</label>
          <input ref={register({
            required: 'The name is mandatory',
            maxLength: {
              message: "Name length should be less than 45",
              value: 45
            },
          })}
          name="name"
          type="text"
          placeholder="Name"
          ></input>
          {errors.name && (
            <span className="">{errors.name.message}</span>
          )}
        </div>
        <div className={`form-control ${
          errors.first_name ? 'ko' : formState.touched.first_name && 'ok'
        }`}
        >
          <label>First Name</label>
          <input ref={register({
            required: 'The first name is mandatory',
            maxLength: {
              message: "First name length should be less than 45",
              value: 45
            },
          })}
          name="first_name"
          type="text"
          placeholder="First Name"
          ></input>
          {errors.first_name && (
            <span className="">{errors.first_name.message}</span>
          )}
        </div>
        <div className={`form-control ${
          errors.last_name ? 'ko' : formState.touched.last_name && 'ok'
        }`}
        >
          <label>Last Name</label>
          <input ref={register({
            required: 'The last name is mandatory',
            maxLength: {
              message: "Last name length should be less than 45",
              value: 45
            },
          })}
          name="last_name"
          type="text"
          placeholder="Last Name"
          ></input>
          {errors.last_name && (
            <span className="">{errors.last_name.message}</span>
          )}
        </div>
        <div className={`form-control ${
          errors.email ? 'ko' : formState.touched.email && 'ok'
        }`}
        >
          <label>Email</label>
          <input ref={register({
            required: 'The email is mandatory',
            maxLength: {
              message: "Email length should be less than 255",
              value: 255
            },
            pattern: {
              message: 'The email is not valid',
              value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            },
          })}
          name="email"
          type="email"
          placeholder="Email"></input>
          {errors.email && (
            <span className="">{errors.email.message}</span>
          )}
        </div>
        <div
          className={`form-control ${
            errors.password ? 'ko' : formState.touched.password && 'ok'
          }`}
        >
          <label>Password</label>
          <input
            ref={register({
              required: 'The password is mandatory',
              minLength: {
                message: 'Password length should be greater than 8',
                value: 8
              }
            })}
            name="password"
            type="password"
            placeholder="Password"
          ></input>
          {errors.password && (
            <span className="errorMessage">{errors.password.message}</span>
          )}
        </div>
        <div className={`form-control ${
          errors.birthday ? 'ko' : formState.touched.birthday && 'ok'
        }`}
        >
          <label>Birthday</label>
          <input ref={register({
            required: 'The birthday is mandatory',
          })}
          name="birthday"
          type="date"
          ></input>
          {errors.birthday && (
            <span className="">{errors.birthday.message}</span>
          )}
        </div>
        <div className={`form-control ${
          errors.country ? 'ko' : formState.touched.country && 'ok'
        }`}
        >
          <label>Country</label>
          <input ref={register({
            required: 'The country is mandatory',
            maxLength: {
              message: "Country length should be less than 20",
              value: 20
            },
          })}
          name="country"
          type="text"
          ></input>
          {errors.country && (
            <span className="">{errors.country.message}</span>
          )}
        </div>
        <div className={`form-control ${
          errors.city ? 'ko' : formState.touched.city && 'ok'
        }`}
        >
          <label>City</label>
          <input ref={register({
            required: 'The city is mandatory',
            maxLength: {
              message: "City length should be less than 30",
              value: 30
            },
          })}
          name="city"
          type="text"
          ></input>
          {errors.city && (
            <span className="">{errors.city.message}</span>
          )}
        </div>
        <div className={`form-control ${
          errors.company_name ? 'ko' : formState.touched.company_name && 'ok'
        }`}
        >
          <label>Company Name</label>
          <input ref={register}
          name="company_name"
          type="text"
          placeholder="The company where you works"
          ></input>
          {errors.company_name && (
            <span className="">{errors.company_name.message}</span>
          )}
        </div>
        <div className={`form-control ${
          errors.company_role ? 'ko' : formState.touched.company_role && 'ok'
        }`}
        >
          <label>Company Role</label>
          <input ref={register}
          name="company_role"
          type="text"
          placeholder="The role you play in your company"
          ></input>
          {errors.company_role && (
            <span className="">{errors.company_role.message}</span>
          )}
        </div>
        <div className={`form-control ${
          errors.page_url ? 'ko' : formState.touched.page_url && 'ok'
        }`}
        >
          <label>Page Url</label>
          <input ref={register}
          name="page_url"
          type="text"
          placeholder="Page Url"
          ></input>
          {errors.page_url && (
            <span className="">{errors.page_url.message}</span>
          )}
        </div>
        <div className={`form-control ${
          errors.type ? 'ko' : formState.touched.type && 'ok'
        }`}
        >
          <label>Type</label>
          <select ref={register({ required: true })}
          name="type"
          >
            <option value="E">Enterpreneur</option>
            <option value="M">Mentor</option>
          </select>
          {errors.type && (
            <span className="">{errors.type.message}</span>
          )}
        </div>
        <div className="btn-container">
          <button
            type="submit"
            className="btn"
            disabled={formState.isSubmitting}
          >
            Register
          </button>
          <div className="m-t-lg">
            <Link to="/login">Already have an account, please sign in</Link>
          </div>
        </div>
      </form>
    </main>
  )
}