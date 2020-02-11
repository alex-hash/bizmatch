import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { useAuth } from '../context/auth-context';
import { getProfile, getProfileOther } from '../http/userService';
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
				console.log(response.data);
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
		<div>
			<div>
        		<Navbar />
      		</div>
			<div className="ml-200p mt-nav-user bg-white md:bg-green-400 flex flex-wrap justify-center h-full md:flex md:flex-wrap md:justify-center md:items-center md:h-screen lg:flex lg:flex-wrap lg:justify-center lg:items-center lg:h-screen">
				<div class="bg-white rounded  md:w-2/3 overflow-hidden break-all w-full">
					<div class="text-center p-6 border-b">
						<img class="h-24 w-24 rounded-full mx-auto border-2 border-red-800" src="https://randomuser.me/api/portraits/men/24.jpg" alt="Randy Robertson" />
						<p class="pt-2 text-lg font-semibold">
							{currentUser.name+" "+currentUser.first_name} 
						</p>
						<p className="text-sm mb-2">
							{currentUser.company_role}
						</p>
                        <div className="flex flex-wrap justify-center">
                            <img className="self-center" src="https://img.icons8.com/metro/26/000000/linkedin.png"/>
                            <p className="text-sm mb-2 ml-2 mt-2">
							alex.velo.santorum
						    </p>
                        </div>
                        <div className="flex flex-wrap justify-center">
                            <img className="self-center" src="https://img.icons8.com/metro/26/000000/twitter.png"/>
                            <p className="text-sm mb-2 ml-2 mt-2">
							alex-velo
						    </p>
                        </div>
					</div>
					<div class="border-b">
							<div class="px-8 py-4">
								<p class="text-xl font-semibold text-center">
									Información personal
								</p>
                                <p class="text-md mt-4 text-gray-900">
									<b>Nombre</b>: {currentUser.name}
								</p>
                                <p class="text-md mt-4 text-gray-900">
									<b>Apellidos</b>: {currentUser.first_name + " " + currentUser.last_name}
								</p>
								<p class="text-md mt-4 text-gray-900">
									<b>Email</b>: {currentUser.email}
								</p>
							</div>
					</div>
                    <div class="border-b">
							<div class="px-8 py-4">
								<p class="text-xl font-semibold text-center">
									Información empresarial
								</p>
                                <p class="text-md mt-4 text-gray-900">
									<b>Empresa</b>: {currentUser.company_name}
								</p>
                                <p class="text-md mt-4 text-gray-900">
									<b>Puesto</b>: {currentUser.company_role}
								</p>
								<p class="text-md mt-4 text-gray-900">
									<b>Página web</b>: {currentUser.page_url}
								</p>
							</div>
					</div>
					<div class="border-b">
						<div class="px-6 py-4 text-center">
							<Link to="/login" onClick={() => logout()} className="relative border rounded py-2 px-4 text-xs font-semibold text-gray-70">
								Cerrar Sesión
							</Link>
						</div>
					</div>	
				</div>
			</div>
		</div>
	);
}