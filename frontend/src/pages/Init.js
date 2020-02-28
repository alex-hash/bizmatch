import React from 'react';
import Navbar from '../components/Navbar';
import { Link } from 'react-router-dom';

export function Init({ projects, role }) {
  if (role === null)
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
              Da feedback sobre los proyectos de los mentores, recibe valoraciones del resto de usuarios y alzate como
              uno de los mejores profesionales de tu sector.
            </p>
            <Link
              to="/register"
              className="text-right bg-button text-white font-bold py-2 px-8 rounded focus:outline-none focus:shadow-outline"
            >
              Comenzar
            </Link>
          </div>
        </div>
        <div className="mt-16">
          <div class="mb-10 font-bold text-xl md:text-2xl flex justify-center">Proyectos Destacados</div>
          <div className="px-4 my-6 sm:mx-10 mb-16">
            <div className="block md:flex flex-wrap justify-left">
              {projects.map((project) => (
                <div class="w-full md:w-1/2 md:px-2 lg:w-1/3 mb-4" key={project.id}>
                <div class="bg-white rounded-lg overflow-hidden shadow">
                  <a href={'/project/' + project.id}>
                    <img
                      class="h-48 w-full object-cover object-center"
                      src={project.image_url}
                      alt="Foto de Proyecto"
                    />
                  </a>
                  <div class="p-4 h-auto md:h-48 mt-2">
                    <a href={'/project/' + project.id} className="text-gray-800 font-bold text-xl mb-2">
                      {project.title}
                    </a>
                    <div class="text-gray-600 text-sm leading-relaxed block md:text-xs lg:text-sm">
                      {project.subtitle}
                    </div>
                    <p class="text-gray-600 text-sm leading-relaxed block md:text-xs lg:text-sm">{project.category}</p>
                    <p class="text-sm leading-relaxed font-semibold block md:text-xs lg:text-sm">Valoración media: {project.avg === null ? "Sin valoración todavía" : Math.round(project.avg * 100) / 100 + " / " + project.counter + " opiniones"}</p>
                    <div className="flex items-center">
                      <Link
                        to={'/user/' + project.user}
                        className="mt-6 block h-12 w-12 rounded-full overflow-hidden border-2 border-gray-600 focus:outline-none focus:border-white"
                      >
                        <img className="h-full w-full object-cover" src={project.avatar_url} alt="Your avatar" />
                      </Link>
                      <div className="text-sm ml-4 pt-6">
                        <p className="text-gray-900 leading-none">{project.name + ' ' + project.first_name}</p>
                        <p className="text-gray-600">
                          {project.updated_at === null
                            ? project.created_at.replace('T', ' ').substring(0, 16)
                            : project.updated_at.replace('T', ' ').substring(0, 16)}
                        </p>
                      </div>
                      <div class="mt-2 lg:absolute bottom-0 mb-4 md:hidden lg:block"></div>
                    </div>
                  </div>
                </div>
              </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );

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
        </div>
      </div>
      <div className="mt-16">
        <div class="mb-10 font-bold text-xl md:text-2xl flex justify-center">Proyectos Destacados</div>
        <div className="px-4 my-6 sm:mx-10 mb-16">
          <div className="block md:flex flex-wrap justify-left">
            {projects.map((project) => (
              <div class="w-full md:w-full md:px-2 lg:w-1/3 mb-4" key={project.id}>
              <div class="bg-white rounded-lg overflow-hidden shadow">
                <a href={'/project/' + project.id}>
                  <img
                    class="h-48 w-full object-cover object-center"
                    src={project.image_url}
                    alt="Foto de Proyecto"
                  />
                </a>
                <div class="p-4 h-auto md:h-48 mt-2">
                  <a href={'/project/' + project.id} className="text-gray-800 font-bold text-xl mb-2">
                    {project.title}
                  </a>
                  <div class="text-gray-600 text-sm leading-relaxed block md:text-xs lg:text-sm">
                    {project.subtitle}
                  </div>
                  <p class="text-gray-600 text-sm leading-relaxed block md:text-xs lg:text-sm">{project.category}</p>
                  <p class="text-sm leading-relaxed font-semibold block md:text-xs lg:text-sm">Valoración media: {project.avg === null ? "Sin valoración todavía" : Math.round(project.avg * 100) / 100 + " / " + project.counter + " opiniones"}</p>
                  <div className="flex items-center">
                    <Link
                      to={'/user/' + project.user}
                      className="mt-6 block h-12 w-12 rounded-full overflow-hidden border-2 border-gray-600 focus:outline-none focus:border-white"
                    >
                      <img className="h-full w-full object-cover" src={project.avatar_url} alt="Your avatar" />
                    </Link>
                    <div className="text-sm ml-4 pt-6">
                      <p className="text-gray-900 leading-none">{project.name + ' ' + project.first_name}</p>
                      <p className="text-gray-600">
                        {project.updated_at === null
                          ? project.created_at.replace('T', ' ').substring(0, 16)
                          : project.updated_at.replace('T', ' ').substring(0, 16)}
                      </p>
                    </div>
                    <div class="mt-2 lg:absolute bottom-0 mb-4 md:hidden lg:block"></div>
                  </div>
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
