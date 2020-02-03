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
        <React.Fragment>
        <nav className="navbar navbar-inverse sidebar" role="navigation">
			    <div className="container-fluid">
					<div className="navbar-header">

						<button type="button" className="navbar-toggle" data-toggle="collapse" data-target="#bs-sidebar-navbar-collapse-1">
							<span className="sr-only">Toggle navigation</span>
							<span className="icon-bar"></span>
							<span className="icon-bar"></span>
							<span className="icon-bar"></span>
						</button>
						<a className="navbar-brand navbar-nombre" href="#">
							<h4 className="text-center">Carla Álvarez</h4>
						</a>
						<a className="navbar-brand pull-right" href="#">
							<img className="img-responsive" src="image/logo_movil.png" />
						</a>

					</div>
					<div className="collapse navbar-collapse" id="bs-sidebar-navbar-collapse-1">
						<ul className="nav navbar-nav">
							<li ><a href="#">Proyectos</a></li>							
							<li className="dropdown">
								<a href="#" className="dropdown-toggle text-bold" data-toggle="dropdown">Consultas <span className="caret"></span><span style={style} className="pull-right hidden-xs showopacity glyphicon glyphicon-cog"></span></a>
								<ul className="dropdown-menu forAnimate" role="menu">
									<li><a href="#">Start-ups</a></li>
									<li><a href="#">Diseño UX</a></li>
									<li><a href="#">Redes móviles</a></li>
									<li><a href="#" className="active">Robótica</a></li>
								</ul>
							</li>
							<li className="dropdown">
								<a href="#" className="dropdown-toggle" data-toggle="dropdown">Configuración <span className="caret"></span><span style={style} className="pull-right hidden-xs showopacity glyphicon glyphicon-cog"></span></a>
								<ul className="dropdown-menu forAnimate" role="menu">
									<li><a href="#">Foto de perfil</a></li>
									<li><a href="#">Información personal</a></li>
									<li><a href="#">Estadísticas</a></li>
									<li><a href="#">Ajustes</a></li>
									<li><a href="#">Cerrar sesión</a></li>
								</ul>
							</li>	
						</ul>
					</div>
				</div>
            </nav>

			<div className="container container-main">
				<div className="row">	
					<div className="col-xs-12 text-center user-profile">
						<center>
							<img className="img-responsive image" src="image/user_icon.png" />
							<div className="middle">
							    <div className="text">Editar</div>
							</div>
						</center>
					</div>
				</div>

				<div className="row mt-5">
					<div className="col-xs-6">

						<p>Carla Álvarez, 32 años</p>
						<div className="row">
							<div className="col-xs-3">
								<img className="img-responsive" src="image/twitter.png" />
							</div>
							<div className="col-xs-9">								
								<p className="text-twitter">@carlaalvarez123</p>
							</div>
						</div>
						<div className="row">
							<div className="col-xs-3">
								<img className="img-responsive" src="image/linkedin.png" />
							</div>
							<div className="col-xs-9">								
								<p className="text-twitter">c.alvarez</p>
							</div>
						</div>
						
					</div>
					<div className="col-xs-6">
						<p>Analista de Sistemas<br/> Xiaomi, Inc.</p>
					</div>
				</div>

				<div className="row mt-5">
					<div className="col-xs-12">
						<p className="text-bio">Bio</p>
					</div>
				</div>

				<div className="row container">
					<div className="col-xs-12 container-text-description">
						<p className="text-bio-description">
							Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley...
						</p>
					</div>
				</div>


				<div className="row">
					<div className="col-xs-12">
						<hr/>
					</div>
				</div>

				<div className="row footer-perfil">

					<div className="col-xs-4">
						<div className="row">
							<div className="col-xs-12">
								<center><img className="img-responsive" src="image/proyecto_icon.png" /></center>
							</div>
						</div>
						<div className="row">
							<div className="col-xs-12">
								<h1 className="text-center">2</h1>
							</div>
						</div>
						<div className="row">
							<div className="col-xs-12">
								<h4 className="text-uppercase text-center">Bizmatches</h4>
							</div>
						</div>
					</div>

					<div className="col-xs-4">
						<div className="row">
							<div className="col-xs-12">
								<center><img className="img-responsive" src="image/bombilla_icon.png" /></center>
							</div>
						</div>
						<div className="row">
							<div className="col-xs-12">
								<h1 className="text-center">1</h1>
							</div>
						</div>	
						<div className="row">
							<div className="col-xs-12">
								<h4 className="text-uppercase text-center"><a className="text-consulta" href="editar-proyecto.html">Proyecto</a></h4>
							</div>
						</div>					
					</div>

					<div className="col-xs-4">
						<div className="row">
							<div className="col-xs-12">
								<center><img className="img-responsive" src="image/bizmach.png" /></center>
							</div>
						</div>	
						<div className="row">
							<div className="col-xs-12">
								<h1 className="text-center">3</h1>
							</div>
						</div>	
						<div className="row">
							<div className="col-xs-12">
								<h4 className="text-uppercase text-center"><a className="text-consulta" href="foro-proyectos.html">Foro</a></h4>
							</div>
						</div>				
					</div>
				</div>
            </div> 
	        <script>{`
	            function htmlbodyHeightUpdate(){
	                var height3 = $( window ).height()
	                var height1 = $('.nav').height()+50
	                height2 = $('.main').height()
	                if(height2 > height3){
	                    $('html').height(Math.max(height1,height3,height2)+10);
	                    $('body').height(Math.max(height1,height3,height2)+10);
	                }
	                else
	                {
	                    $('html').height(Math.max(height1,height3,height2));
	                    $('body').height(Math.max(height1,height3,height2));
	                }
	                
	            }
	            $(document).ready(function () {
	                htmlbodyHeightUpdate()
	                $( window ).resize(function() {
	                    htmlbodyHeightUpdate()
	                });
	                $( window ).scroll(function() {
	                    height2 = $('.main').height()
	                    htmlbodyHeightUpdate()
	                });
	            });
                `}</script>
    </React.Fragment>
    )
}