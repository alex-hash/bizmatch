import React, { useState, useEffect, useRef, useReducer } from 'react';
import { Link, useHistory } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { useAuth } from '../context/auth-context';
import { useForm } from 'react-hook-form';
import { getProfile, getProfileOther } from '../http/userService';
import { UserRender } from '../components/User' 
import jwt_decode from 'jwt-decode';

export function User({ match }){
	const { role, setRole, setCurrentUser} = useAuth();
	const [user, setUser] = useState(null);

	function userReducer(state, action) {
		switch (action.type) {
		  case 'EDIT':
			return { ...state, edit: action.edit};
		  default:
			return state;
		}
	}
	const [state, dispatch] = useReducer(userReducer, {
		edit: 0
	});

    useEffect(() => {
		if(match === undefined){
			getProfile().then((response) => {
				setUser(response.data);
			}).catch((error) => {
				if(error.response.status === 401){
					setRole(null);
					setUser(null);
					setCurrentUser(null);
					window.localStorage.clear();
				}
			});
		}else{
			getProfileOther(match.params.userId).then((response) => {
				setUser(response.data);
			}).catch((error) => {
				if(error.response.status === 401){
					setRole(null);
					setUser(null);
					setCurrentUser(null);
					window.localStorage.clear();
				}
			});;
		}
	}, []);

	if(user === null){
		return(
			<div class="w-full h-full fixed block top-0 left-0 bg-white opacity-75 z-50">
				<span class="text-green-500 opacity-75 top-1/2 my-0 mx-auto block relative w-0 h-0 top-50">
					<i class="fas fa-circle-notch fa-spin fa-5x"></i>
				</span>
			</div>
		);
	}else{
		return(
			<UserRender user={user} edit={state.edit} dispatch={dispatch} role={role}/>
		);
	}

	
}

