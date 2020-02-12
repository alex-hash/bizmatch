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
				console.log(response.data)
				setCurrentUser(response.data);
			});
		}else{
			getProfileOther(match.params.userId).then((response) => {
				setCurrentUser(response.data);
			});
		}
	}, [role]);

	function eOrM(type){
		if(type === "M"){
			return (
				<div className="mt-4 flex flex-wrap">     
					<img className="self-center" src="https://img.icons8.com/ios/25/000000/crowdfunding.png"/>
					<p className="text-sm mb-2 ml-2 mt-2">
						Mentor
					</p>
				</div>
			);
		}else{
			return (
				<div className="mt-4 flex flex-wrap">     
					<img className="self-center" src="https://img.icons8.com/ios/25/000000/light-on.png"/>
					<p className="text-sm mb-2 ml-2 mt-2">
						Emprendedor
					</p>
				</div>
			);
		}
	}

	function roleE(role){
		if(role !== undefined){
			return(
				<div className="flex flex-wrap">     
					<img className="self-center" src="https://img.icons8.com/small/25/000000/reviewer-female.png"/>
					<p className="text-left text-sm mb-2 ml-2 mt-2">
						{currentUser.company_role}
					</p>
				</div>
			);
		}
	}

	function companyWork(work){
		if(work !== undefined){
			return(
				<div className="flex flex-wrap">     
					<img className="self-center" src="https://img.icons8.com/officel/25/000000/travel-card.png"/>
					<p className="text-left text-sm mb-2 ml-2 mt-2">
						{currentUser.company_name}
					</p>
				</div>
			);
		}
	}

	function urlDefinided(url){
		if(url !== undefined){
			return(
				<div className="flex flex-no-wrap">     
					<img className="self-center" src="https://img.icons8.com/ios-filled/25/000000/link.png"/>
					<a href={currentUser.page_url} className="relative text-left text-sm mb-2 ml-2 mt-2">
						{currentUser.page_url}
					</a>
				</div>
			);
		}
	}
	
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
			<div className="mt-nav mt-pefil mt-16 bg-white flex flex-col-reverse items-center lg:items-start lg:flex-row lg:flex-wrap lg:justify-center h-full">
					<div className="xl:w-1/5 lg:w-1/5">

					</div>
					<div className="text-center w-full p-6 md:p-0 lg:p-6 break-all md:w-2/3 xl:border lg:border xl:w-1/5 lg:w-1/5">
						<img className="h-24 w-24 rounded-full mx-auto border-2 border-red-800 top-perfil" src="https://randomuser.me/api/portraits/men/24.jpg" alt="Randy Robertson" />
                        {eOrM(currentUser.type)}   
                        <p className="text-left text-sm mb-2 ml-2 mt-2">
							Valoración media
						</p>
						{roleE(currentUser.company_role)}
						<div className="border-t-2 mt-4 text-left">
							<h1 className="font-bold text-lg pt-4 pb-2">Más información</h1>
							{companyWork(currentUser.company_name)}
							<div className="flex flex-wrap">     
								<img className="self-center" src="https://img.icons8.com/ios-glyphs/25/000000/email.png"/>
								<p className="text-left text-sm mb-2 ml-2 mt-2">
									{currentUser.email}
								</p>
							</div>
							{urlDefinided(currentUser.page_url)}
						</div>
					</div>
					<div className="px-6 md:p-0 md:w-2/3 xl:w-2/5 lg:w-2/5 xl:pl-20 lg:pl-20">
						<h1 class="font-bold text-5xl ">{currentUser.name+" "+currentUser.first_name}</h1>
						<p className="text-gray-700">Se registró en {currentUser.created_at !== undefined ? currentUser.created_at.substring(0, 4): ""}</p>
						<img className="mt-4" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAAZCAYAAADE6YVjAAAABmJLR0QA/wD/AP+gvaeTAAABcklEQVRIie2VsUvDQBSHv9cUHUqhi4i4+B8IzSvUrSC4dLAuOrs5OIpjoThawf/A0UnQwamDLkKh14Bzwc3ByR7oIjTnYITSVE2qxUG/JeTHu/fl7rgc/JMCGRcGQbAahmEDWEjb0Dm3UyqVWsNZdrSo3W7Ph2F4AVjgJopLwCJwPlRaA+6BTvQ+B1REJDfaMybxPM8HcsCWql4CGGNOgJqqbr7XGWMegWtV3QbodDoVEamMm11mNBCRmWjaz+MGTEJMMg1iy/UZvV5vtt/v7xUKhaa1dioSz1p7JiJVa+0K4E1DkgeqQCt6JibtntRVdU1E9qclqavqAYDv+4dpRImWK5PJHBeLxdvhzPf9wyAIlhONT1I0Kvgqn0jyXX73MIrIkTHGpeiVTy0BlkQkSGpw7uPviUmccy8ignNuV1VPk0qiv/BVIslgMOhms9knEWkaYzaSSni7T8YSk5TL5Ydut7vunGsAfgoJwN1PXhF/lFdP03Cy/K3aIgAAAABJRU5ErkJggg=="/>
						<p className="break-all">sdaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa</p>
					</div>
					<div className="xl:w-1/5 lg:w-1/5">

					</div>
				</div>
		</div>
	);
}