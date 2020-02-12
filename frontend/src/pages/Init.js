import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import Navbar from '../components/Navbar';
import { Link, useHistory } from 'react-router-dom';
import { useAuth } from '../context/auth-context';
import jwt_decode from 'jwt-decode';

export function Init() {
  const [backendErrorMessage, setBackendErrorMessage] = useState('');
  const { handleSubmit, register, errors, watch, formState, setError, setValue, reset } = useForm({
    mode: 'onBlur'
  });
  let history = useHistory();
  const { setRole, setCurrentUser } = useAuth();


return (
    <div>
      <div>
        <Navbar />
      </div>
    </div>  
);
}
