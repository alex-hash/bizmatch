import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import Navbar from '../components/Navbar';
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
		<div>
			<div>
        		<Navbar />
      		</div>
			<div className="ml-200p mt-nav bg-white md:bg-green-400 flex flex-wrap justify-center h-full md:flex md:flex-wrap md:justify-center md:items-center md:h-screen lg:flex lg:flex-wrap lg:justify-center lg:items-center lg:h-screen">
				<div class="bg-white rounded  md:w-2/3 overflow-hidden break-all">
					<div class="text-center p-6 border-b">
						<img class="h-24 w-24 rounded-full mx-auto" src="https://randomuser.me/api/portraits/men/24.jpg" alt="Randy Robertson" />
						<p class="pt-2 text-lg font-semibold">
							Randy Robertson
						</p>
						<p class="text-sm text-gray-600">
							randy.robertson@example.com
						</p>
						<p className="text-sm">
							Soy un gran actor que quiere trabajar en nuevos proyectos	
						</p>
					</div>
					<div class="border-b">
							<div class="px-8 py-4">
								<p class="text-xl font-semibold">
									Información personal
								</p>
								<p class="text-xs mt-4 text-gray-600">
									johnny.depp@example.org
								</p>
							</div>
					</div>
					<div class="border-b">
						<div class="px-6 py-4 text-center">
							<a href="#" class="border rounded py-2 px-4 text-xs font-semibold text-gray-70">
							Cerrar Sesión
							</a>
						</div>
					</div>	
				</div>
			</div>
		</div>
	);
}