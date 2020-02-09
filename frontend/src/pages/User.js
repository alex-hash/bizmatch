import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useAuth } from '../context/auth-context';
import { getProfile } from '../http/userService';
import jwt_decode from 'jwt-decode';

export function User(){
    const history = useHistory();
    const { role, currentUser, setCurrentUser } = useAuth();
    let style = {
        fontSize: '16px',
    };

    useEffect(() => {
        getProfile().then((response) => {
            setCurrentUser(response.data);
        })
    });

	return(
		<h1>Hola</h1>
	);
}