import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { useAuth } from '../context/auth-context';
import { useForm } from 'react-hook-form';
import { getProfile, getProfileOther } from '../http/userService';
import UserRender from '../components/User' 
import jwt_decode from 'jwt-decode';

export function User({ match }){
    const history = useHistory();
	const { role, setRole, currentUser, setCurrentUser } = useAuth();

    useEffect(() => {
		if(match === undefined){
			getProfile().then((response) => {
				setCurrentUser(response.data);
			});
		}else{
			getProfileOther(match.params.userId).then((response) => {
				setCurrentUser(response.data);
			});
		}
	}, [role]);
	
	function logout(){
		window.localStorage.clear();
		setRole(null);
		setCurrentUser(null);
	}

	return(
		<UserRender user={currentUser} edit={0} role={role}/>
	);
}

