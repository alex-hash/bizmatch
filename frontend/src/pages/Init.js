import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import { Link, useHistory } from 'react-router-dom';
import { useAuth } from '../context/auth-context';

export function Init({ projects, role }) {
  return (
    <div>
      <div>
        <Navbar role={role} />
      </div>
      <div className="bg-cover mt-4 md:mt-0 min-h-screen backimageinit flex flex-wrap px-4 md:px-0">
        <div className="w-full md:w-2/5 bg-white rounded px-10 py-8 self-center md:ml-32">
          <h1 className="font-bold text-xl md:text-3xl pb-1">¿A quién se dirige Bizmatch?</h1>
          <p className="text-gray-700 pb-2 md:pb-4 md:text-xl">En Bizmatch tenemos dos tipos de perfiles:</p>
          <p className="font-semibold">Emprendedor</p>
          <p className="pb-2 md:pb-4">
            Crea tú proyecto, exponlo ante nuestra comunidad de mentores y recibe feedback sobre tu proyecto.
          </p>
          <p className="font-semibold">Mentor</p>
          <p className="pb-4 md:pb-6">
            Da feedback sobre los proyectos de los mentores, recibe valoraciones del resto de usuarios y alzate como uno
            de los mejores profesionales de tu sector.
          </p>
          <Link
            to="/register"
            className="text-right bg-button text-white font-bold py-2 px-8 rounded focus:outline-none focus:shadow-outline"
          >
            Comenzar
          </Link>
        </div>
      </div>
      <div className="mt-6">
        <div className="px-4 sm:mx-10">
          <div className="block md:flex flex-wrap justify-left">
            {projects.map((project) => (
              <div className="break-all w-full md:w-1/2 md:px-2 lg:w-1/3 mb-4" key={project.id}>
                <div className="bg-white rounded-lg overflow-hidden shadow">
                  <img
                    className="h-48 w-full object-cover object-center"
                    src="https://images.unsplash.com/photo-1457282367193-e3b79e38f207?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1654&q=80"
                    alt=""
                  />
                  <div className="p-4 h-auto md:h-48 mt-2">
                    <a href={'/project/' + project.id} className="text-gray-800 font-bold text-xl mb-2">
                      {project.title}
                    </a>
                    <div className="text-gray-600 text-sm leading-relaxed block md:text-xs lg:text-sm">
                      {project.subtitle}
                    </div>
                    <p className="text-gray-600 text-sm leading-relaxed block md:text-xs lg:text-sm">{project.category}</p>
                    <div className="mt-4 truncate text-gray-600 text-sm leading-relaxed block md:text-xs lg:text-sm">
                      {project.text}
                    </div>
                    <div className="mt-2 lg:absolute bottom-0 mb-4 md:hidden lg:block"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
