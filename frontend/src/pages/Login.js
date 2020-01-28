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
        history.push('/');
      })
      .catch((error) => {
        setBackendErrorMessage('The credentials are invalid');
        setValue('password', '');
        setError('password', 'credentials', 'The credentials are invalid');
      });
  };

  return (
    <React.Fragment>
      <main className="">
        <h3>Please Login</h3>
        <form onSubmit={handleSubmit(handleLogin)} noValidate>
          <div className={`form-control ${errors.email ? 'ko' : formState.touched.email && 'ok'}`}>
            <label>Email</label>
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
              placeholder="Please enter your email"
            ></input>
            {errors.email && <span className="errorMessage">{errors.email.message}</span>}
          </div>
          <div className={`form-control ${errors.password ? 'ko' : formState.touched.password && 'ok'}`}>
            <label>Password</label>
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
              placeholder="Please enter your password"
            ></input>
            {errors.password && <span className="errorMessage">{errors.password.message}</span>}
          </div>
          <div className="btn-container">
            <button type="submit" className="btn" disabled={formState.isSubmitting}>
              Login
            </button>
            <div className="m-t-lg">
              <Link to="/register">Don't have an account, please sign up</Link>
            </div>
            <div className="">
              <Link to="/">Forgot password?</Link>
            </div>
          </div>
        </form>
      </main>
    </React.Fragment>
  );
}
