import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { useAuth } from '../context/auth-context';
import { updateProfile, updateAvatar } from '../http/userService';
import jwt_decode from 'jwt-decode';


export default class UserRender extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
			edit: this.props.edit,
			company_role: '',
			company_name: '',
			page_url: '',
			description: '',
			avatar: '',
		}
    }

    eOrM(type){
		if(type === "M"){
			return (
				<div className="mt-2 flex flex-wrap">     
					<img className="self-center" src="https://img.icons8.com/ios/25/000000/crowdfunding.png"/>
					<p className="text-sm mb-2 ml-2 mt-2">
						Mentor
					</p>
				</div>
			);
		}else{
			return (
				<div className="mt-2 flex flex-wrap">     
					<img className="self-center" src="https://img.icons8.com/ios/25/000000/light-on.png"/>
					<p className="text-sm mb-2 ml-2 mt-2">
						Emprendedor
					</p>
				</div>
			);
		}
    }
    
    roleE(role){
		if(role !== null){
			return(
				<div className="flex flex-wrap">     
					<img className="self-center" src="https://img.icons8.com/small/25/000000/reviewer-female.png"/>
					<p className="text-left text-sm mb-2 ml-2 mt-2">
						{this.props.user.company_role}
					</p>
				</div>
			);
		}
	}
    
    companyWork(work){
		if(work !== null){
			return(
				<div className="flex flex-wrap">     
					<img className="self-center" src="https://img.icons8.com/officel/25/000000/travel-card.png"/>
					<p className="text-left text-sm mb-2 ml-2 mt-2">
						{this.props.user.company_name}
					</p>
				</div>
			);
		}
	}

	urlDefinided(url){
		if(url !== null){
			return(
				<div className="flex flex-no-wrap">     
					<img className="self-center" src="https://img.icons8.com/ios-filled/25/000000/link.png"/>
					<a href={this.props.user.page_url} className="text-left text-sm mb-2 ml-2 mt-2">
						{this.props.user.page_url}
					</a>
				</div>
			);
		}
	}

	descriptionNote(text){
		if(text !== null){
			return(
				<div>
					<img className="mt-4" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAAZCAYAAADE6YVjAAAABmJLR0QA/wD/AP+gvaeTAAABcklEQVRIie2VsUvDQBSHv9cUHUqhi4i4+B8IzSvUrSC4dLAuOrs5OIpjoThawf/A0UnQwamDLkKh14Bzwc3ByR7oIjTnYITSVE2qxUG/JeTHu/fl7rgc/JMCGRcGQbAahmEDWEjb0Dm3UyqVWsNZdrSo3W7Ph2F4AVjgJopLwCJwPlRaA+6BTvQ+B1REJDfaMybxPM8HcsCWql4CGGNOgJqqbr7XGWMegWtV3QbodDoVEamMm11mNBCRmWjaz+MGTEJMMg1iy/UZvV5vtt/v7xUKhaa1dioSz1p7JiJVa+0K4E1DkgeqQCt6JibtntRVdU1E9qclqavqAYDv+4dpRImWK5PJHBeLxdvhzPf9wyAIlhONT1I0Kvgqn0jyXX73MIrIkTHGpeiVTy0BlkQkSGpw7uPviUmccy8ignNuV1VPk0qiv/BVIslgMOhms9knEWkaYzaSSni7T8YSk5TL5Ydut7vunGsAfgoJwN1PXhF/lFdP03Cy/K3aIgAAAABJRU5ErkJggg=="/>
					<p className="break-all">{this.props.user.description}</p>
				</div>
			);
		}
	}

	onChange = (e) => {
    	this.setState({ [e.target.name]: e.target.value });
	}

	onChangeHandler = (e) =>{
		this.setState({ [e.target.name]: e.target.files[0] })
	}
	
	onSubmit = (e) => {
		e.preventDefault();
		const data = new FormData();
		data.append('avatar', this.state.avatar);
		const { company_role, company_name, page_url, description} = this.state;
		const { email, name, first_name, last_name, type} = this.props.user;
		let {birthday} = this.props.user;
		birthday = birthday.substring(0,10);
		let country = "Tupu";
		let city = "sadsad";
		let promise1 = updateProfile({email, name, first_name, last_name, birthday, country, city, company_name, company_role, page_url, type, description});
		if(typeof data.get('avatar') === "string"){
			promise1.then(() => window.location.href = '/user');
		}else{
			Promise.all([promise1, updateAvatar(data)]).then(() => window.location.href = '/user');
		}
		
		
	}

    render(){
        if(this.state.edit === 0){
			this.state.company_name = this.props.user.company_name;
			this.state.company_role = this.props.user.company_role;
			this.state.page_url = this.props.user.page_url;
			this.state.avatar = this.props.user.avatar_url;
			this.state.description = this.props.user.description;
            return(
            <div>
				<div>
					<Navbar role={this.props.role}/>
				</div>
				<div className="mt-pefil mt-16 bg-white flex flex-col-reverse items-center lg:items-start lg:flex-row lg:flex-wrap lg:justify-center h-full">
					<div className="xl:w-1/5 lg:w-1/5">
					</div>
					<div className="text-center w-full p-6 md:p-0 lg:p-6 break-all md:w-2/3 xl:border lg:border xl:w-1/5 lg:w-1/5">
						<div>
							<img className="h-24 w-24 rounded-full mx-auto border-2 border-red-800 top-perfil" src={this.props.user.avatar_url} alt={this.props.user.name+" "+this.props.user.first_name} />
						</div>
						{this.eOrM(this.props.user.type)}   
						<p className="text-left text-sm mb-2 ml-2 mt-2">
							Valoración media
						</p>
						{this.roleE(this.props.user.company_role)}
						<div className="border-t-2 mt-4 text-left">
							<h1 className="font-bold text-lg pt-4 pb-2">Más información</h1>
							{this.companyWork(this.props.user.company_name)}
							<div className="flex flex-wrap">     
								<img className="self-center" src="https://img.icons8.com/ios-glyphs/25/000000/email.png"/>
								<p className="text-left text-sm mb-2 ml-2 mt-2">
									{this.props.user.email}
								</p>
							</div>
							{this.urlDefinided(this.props.user.page_url)}
						</div>
					</div>
					<div className="px-6 md:p-0 md:w-2/3 xl:w-2/5 lg:w-2/5 xl:pl-20 lg:pl-20 w-full">
						<h1 class="font-bold text-5xl ">{this.props.user.name+" "+this.props.user.first_name}</h1>
						<p className="text-gray-700">Se registró en {this.props.user.created_at !== undefined ? this.props.user.created_at.substring(0, 4): ""} - <button className="text-blue-500" onClick={() => this.setState({edit: 1})}>Editar Perfil</button></p>
						{this.descriptionNote(this.props.user.description)}
					</div>
					<div className="xl:w-1/5 lg:w-1/5">

					</div>
				</div>
			</div>
            );
        }else{
            return(
				<div>
				<div>
					<Navbar role={this.props.role}/>
				</div>
				<form onSubmit={this.onSubmit} noValidate>
					<div className="mt-pefil mt-16 bg-white flex flex-col-reverse items-center lg:items-start lg:flex-row lg:flex-wrap lg:justify-center h-full">
						<div className="xl:w-1/5 lg:w-1/5">
						</div>
						<div className="text-center w-full p-6 md:p-0 lg:p-6 break-all md:w-2/3 xl:border lg:border xl:w-1/5 lg:w-1/5">
							<div>
								<img className="h-24 w-24 rounded-full mx-auto border-2 border-red-800 top-perfil" src={this.props.user.avatar_url} alt={this.props.user.name+" "+this.props.user.first_name} />
								<h1 className="mt-4 float-left font-semibold">Cambiar foto perfil</h1>
								<input type="file" name="avatar" className="shadow appearance-none border rounded py-2 px-3 mb-2 text-gray-700 w-full leading-tight focus:outline-none focus:shadow-outline" onChange={this.onChangeHandler}/>
							</div>
							{this.eOrM(this.props.user.type)}   
							<p className="text-left text-sm mb-2 ml-2 mt-2">
								Valoración media
							</p>
							<div className="flex flex-wrap">     
								<img className="self-center" src="https://img.icons8.com/small/25/000000/reviewer-female.png"/>
								<input 
								defaultValue={this.props.user.company_role}
								name="company_role"
								type="text"
								className="shadow appearance-none border rounded py-2 px-3 mb-2 ml-2 mt-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
								placeholder="Cargo que ocupas en tú empresa"
								onChange={this.onChange}
								></input>
							</div>
							<div className="border-t-2 mt-4 text-left">
								<h1 className="font-bold text-lg pt-4 pb-2">Más información</h1>
								<div className="flex flex-wrap">     
									<img className="self-center" src="https://img.icons8.com/officel/25/000000/travel-card.png"/>
									<input 
									defaultValue={this.props.user.company_name}
									name="company_name"
									type="text"
									className="shadow appearance-none border rounded py-2 px-3 mb-2 ml-2 mt-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
									placeholder="La empresa en la que trabajas"
									onChange={this.onChange}
									></input>
								</div>
								<div className="flex flex-wrap">     
									<img className="self-center" src="https://img.icons8.com/ios-glyphs/25/000000/email.png"/>
									<p className="text-left text-sm mb-2 ml-2 mt-2">
										{this.props.user.email}
									</p>
								</div>
								<div className="flex flex-no-wrap">     
									<img className="self-center" src="https://img.icons8.com/ios-filled/25/000000/link.png"/>
									<input
									defaultValue={this.props.user.page_url}
									name="page_url"
									type="text"
									className="shadow appearance-none border rounded py-2 px-3 mb-2 ml-2 mt-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
									placeholder="Web url de la empresa"
									onChange={this.onChange}
									></input>
								</div>
							</div>
						</div>
						<div className="px-6 md:p-0 md:w-2/3 xl:w-2/5 lg:w-2/5 xl:pl-20 lg:pl-20 w-full">
							<h1 class="font-bold text-5xl ">{this.props.user.name+" "+this.props.user.first_name}</h1>
							<p className="text-gray-700">Se registró en {this.props.user.created_at !== undefined ? this.props.user.created_at.substring(0, 4): ""}</p>
							<img className="mt-4" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAAZCAYAAADE6YVjAAAABmJLR0QA/wD/AP+gvaeTAAABcklEQVRIie2VsUvDQBSHv9cUHUqhi4i4+B8IzSvUrSC4dLAuOrs5OIpjoThawf/A0UnQwamDLkKh14Bzwc3ByR7oIjTnYITSVE2qxUG/JeTHu/fl7rgc/JMCGRcGQbAahmEDWEjb0Dm3UyqVWsNZdrSo3W7Ph2F4AVjgJopLwCJwPlRaA+6BTvQ+B1REJDfaMybxPM8HcsCWql4CGGNOgJqqbr7XGWMegWtV3QbodDoVEamMm11mNBCRmWjaz+MGTEJMMg1iy/UZvV5vtt/v7xUKhaa1dioSz1p7JiJVa+0K4E1DkgeqQCt6JibtntRVdU1E9qclqavqAYDv+4dpRImWK5PJHBeLxdvhzPf9wyAIlhONT1I0Kvgqn0jyXX73MIrIkTHGpeiVTy0BlkQkSGpw7uPviUmccy8ignNuV1VPk0qiv/BVIslgMOhms9knEWkaYzaSSni7T8YSk5TL5Ydut7vunGsAfgoJwN1PXhF/lFdP03Cy/K3aIgAAAABJRU5ErkJggg=="/>
							<h1 className="font-semibold mb-2">Acerca de</h1>
							<textarea
							defaultValue={this.props.user.description}
							className="resize-none shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
							id="text"
							rows="6"
							type="text"
							name="description"
							placeholder=""
							onChange={this.onChange}
							></textarea>
							<div className="mt-2">
								<button className="bg-blue-500 text-white font-bold py-2 mr-2 px-2 rounded focus:outline-none focus:shadow-outline" type="submit" to="/user">
									Guardar
								</button>
								<button className="text-blue-500 font-bold py-2 px-2 rounded focus:outline-none focus:shadow-outline" onClick={() => this.setState({edit: 0})}>
									Cancelar
								</button>
							</div>
						</div>
						<div className="xl:w-1/5 lg:w-1/5">
						</div>
					</div>
				</form>
			</div>
			);
        }
    }
}   