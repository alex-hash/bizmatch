import React from 'react';
import Navbar from '../components/Navbar';
import { Link } from 'react-router-dom';
import { Video } from '../components/Youtube';
import YouTube from 'react-youtube';

export function Init({ projects, role }) {
  if (role === null)
    return (
      <div>
      <div>
        <Navbar role={role} />
      </div>
      <div className="mt-4 md:mt-0 px-4 md:px-0 flex">
        <div className="lg:w-1/3"></div>
        <div className="w-full rounded py-8 bg-background-primary">
          <div className="text-center">
            <h1 className="font-bold text-copy-primary text-2xl sm:text-3xl lg:text-4xl pb-1 font-sans self">Bizmatch es una plataforma para</h1>
            <h1 className="font-bold text-copy-primary text-2xl font-sans sm:text-3xl lg:text-4xl">Emprendedores y Mentores</h1>
            <p className="text-copy-primary text-sm sm:text-base md:text-xl lg:text-2xl pt-4 md:pt-8">Bizmatch lo hace fácil para conectar emprendedores con mentores</p>
            <p className=" pt-8 pb-20">
              <Link
                to="/register"
                className="bg-button text-white font-bold py-2 px-8 rounded focus:outline-none focus:shadow-outline"
              >
                Comenzar
              </Link>
            </p>
          </div>
        </div>
        <div className="lg:w-1/3"></div>
      </div>
      <div className="flex">
        <div className="lg:w-1/12 xl:w-1/5"></div>
        <div className="w-full md:flex md:flex-wrap lg:flex-no-wrap md:justify-center px-4 sm:mx-32 md:mx-0">
          <div className="w-full md:w-2/6 md:mr-5 lg:mr-0 lg:w-1/3 border-background-borderf border bg-background-secondary rounded py-4 px-8">
            <h1 className="text-center font-semibold rounded bg-background-terciary text-white py-2">Emprendedor</h1>
            <li className="font-normal text-copy-primary pt-4">Crea tú proyecto</li>
            <li className="font-normal text-copy-primary">Exponlo ante nuestra comunidad de mentores</li>
            <li className="font-normal text-copy-primary">Recibe feedback sobre tu proyecto</li>
            <li className="font-normal text-copy-primary">Mejora tú proyecto</li>
            <li className="font-normal text-copy-primary">Alzate como unos de los mejores emprendedores de tú sector</li>
          </div>
          <div className="w-full md:w-2/6 md:ml-5 lg:w-1/3 border-background-borderf border rounded bg-background-secondary py-4 px-8 lg:mx-10 mt-5 md:mt-0">
            <h1 className="text-center font-semibold rounded bg-background-terciary text-white py-2">Mentor</h1>
            <li className="font-normal text-copy-primary pt-4">Da feedback sobre los proyectos de los emprendedores</li>
            <li className="font-normal text-copy-primary">Recibe valoraciones del resto de usuarios</li>
            <li className="font-normal text-copy-primary">Alzate como
              uno de los mejores profesionales de tu sector</li>
          </div>
          <div className="w-full md:w-2/6 md:mt-5 lg:mt-0 lg:w-1/3 border-background-borderf border bg-background-secondary rounded py-4 px-8 mt-5 md:mt-0">
            <h1 className="text-center text-copy-primary font-semibold rounded bg-background-terciary text-white py-2">Proyectos</h1>
            <li className="font-normal text-copy-primary pt-4">Los proyectos son creados por los emprendedores</li>
            <li className="font-normal text-copy-primary">Reciben valoraciones y comentarios de los mentores sobre como pueden mejorar los proyectos</li>
            <li className="font-normal text-copy-primary">Los proyectos mejor valorados </li>
          </div>
        </div>
        <div className="lg:w-1/12 xl:w-1/5">
        </div>
      </div>
      <div className="mt-16">
        <div class="mb-10 font-bold text-xl md:text-2xl flex justify-center text-copy-primary">Proyectos Destacados</div>
        <div className="px-4 my-6 sm:mx-10 mb-16">
          <div className="block md:flex flex-wrap justify-center">
            {projects.map((project) => (
              <div class="w-full md:w-full md:px-2 lg:w-1/3 mb-4" key={project.id}>
              <div class="bg-background-secondary rounded-lg border border-background-borderf overflow-hidden shadow">
                <a href={'/project/' + project.id}>
                  <img
                    class="h-48 w-full object-cover object-center"
                    src={project.image_url}
                    alt="Foto de Proyecto"
                  />
                </a>
                <div class="p-4 h-auto md:h-48 mt-2">
                  <a href={'/project/' + project.id} className="text-copy-primary font-bold text-xl mb-2">
                    {project.title}
                  </a>
                  <div class="text-copy-primary text-sm leading-relaxed block md:text-xs lg:text-sm">
                    {project.subtitle}
                  </div>
                  <p class="text-copy-primary text-sm leading-relaxed block md:text-xs lg:text-sm">{project.category}</p>
                  <p class="text-sm leading-relaxed font-semibold text-copy-primary block md:text-xs lg:text-sm">Valoración media: {project.avg === null ? "Sin valoración todavía" : Math.round(project.avg * 100) / 100 + " / " + project.counter + " opiniones"}</p>
                  <div className="flex items-center">
                    <Link
                      to={'/user/' + project.user}
                      className="mt-6 block h-12 w-12 rounded-full overflow-hidden border-2 border-gray-600 focus:outline-none focus:border-white"
                    >
                      <img className="h-full w-full object-cover" src={project.avatar_url} alt="Your avatar" />
                    </Link>
                    <div className="text-sm ml-4 pt-6">
                      <p className="text-copy-primary leading-none">{project.name + ' ' + project.first_name}</p>
                      <p className="text-copy-primary">
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
      <div className="mt-4 md:mt-0 px-4 md:px-0 flex">
        <div className="lg:w-1/3"></div>
        <div className="w-full rounded py-8 bg-background-primary">
          <div className="text-center">
            <h1 className="font-bold text-copy-primary text-2xl sm:text-3xl lg:text-4xl pb-1 font-sans self">Bizmatch es una plataforma para</h1>
            <h1 className="font-bold text-copy-primary text-2xl font-sans sm:text-3xl lg:text-4xl">Emprendedores y Mentores</h1>
            <p className="text-copy-primary text-sm sm:text-base md:text-xl lg:text-2xl pt-4 md:pt-8">Bizmatch lo hace fácil para conectar emprendedores con mentores</p>
            <p className=" pt-8 pb-20">
              <Link
                to="/projects"
                className="bg-button text-white font-bold py-2 px-8 rounded focus:outline-none focus:shadow-outline"
              >
                Comenzar
              </Link>
            </p>
          </div>
        </div>
        <div className="lg:w-1/3"></div>
      </div>
      <div className="flex">
        <div className="lg:w-1/12 xl:w-1/5"></div>
        <div className="w-full md:flex md:flex-wrap lg:flex-no-wrap md:justify-center px-4 sm:mx-32 md:mx-0">
          <div className="w-full md:w-2/6 md:mr-5 lg:mr-0 lg:w-1/3 border-background-borderf border bg-background-secondary rounded py-4 px-8">
            <h1 className="text-center font-semibold rounded bg-background-terciary text-white py-2">Emprendedor</h1>
            <li className="font-normal text-copy-primary pt-4">Crea tú proyecto</li>
            <li className="font-normal text-copy-primary">Exponlo ante nuestra comunidad de mentores</li>
            <li className="font-normal text-copy-primary">Recibe feedback sobre tu proyecto</li>
            <li className="font-normal text-copy-primary">Mejora tú proyecto</li>
            <li className="font-normal text-copy-primary">Alzate como unos de los mejores emprendedores de tú sector</li>
          </div>
          <div className="w-full md:w-2/6 md:ml-5 lg:w-1/3 border-background-borderf border bg-background-secondary rounded py-4 px-8 lg:mx-10 mt-5 md:mt-0">
            <h1 className="text-center text-copy-primary font-semibold rounded bg-background-terciary text-white py-2">Mentor</h1>
            <li className="font-normal text-copy-primary pt-4">Da feedback sobre los proyectos de los emprendedores</li>
            <li className="font-normal text-copy-primary">Recibe valoraciones del resto de usuarios</li>
            <li className="font-normal text-copy-primary">Alzate como
              uno de los mejores profesionales de tu sector</li>
          </div>
          <div className="w-full md:w-2/6 md:mt-5 lg:mt-0 lg:w-1/3 border-background-borderf border bg-background-secondary rounded py-4 px-8 mt-5 md:mt-0">
            <h1 className="text-center text-copy-primary font-semibold rounded bg-background-terciary text-white py-2">Proyectos</h1>
            <li className="font-normal text-copy-primary pt-4">Los proyectos son creados por los emprendedores</li>
            <li className="font-normal text-copy-primary">Reciben valoraciones y comentarios de los mentores sobre como pueden mejorar los proyectos</li>
            <li className="font-normal text-copy-primary">Los proyectos mejor valorados </li>
          </div>
        </div>
        <div className="lg:w-1/12 xl:w-1/5">
        </div>
      </div>
      <div className="mt-16">
        <div class="mb-10 font-bold text-xl md:text-2xl flex justify-center text-copy-primary">Proyectos Destacados</div>
        <div className="px-4 my-6 sm:mx-10 mb-16">
          <div className="block md:flex flex-wrap justify-center">
            {projects.map((project) => (
              <div class="w-full md:w-full md:px-2 lg:w-1/3 mb-4" key={project.id}>
              <div class="bg-background-primary rounded-lg bg-background-secondary border border-background-borderf overflow-hidden shadow">
                <a href={'/project/' + project.id}>
                  <img
                    class="h-48 w-full object-cover object-center"
                    src={project.image_url}
                    alt="Foto de Proyecto"
                  />
                </a>
                <div class="p-4 h-auto md:h-48 mt-2">
                  <a href={'/project/' + project.id} className="text-copy-primary font-bold text-xl mb-2">
                    {project.title}
                  </a>
                  <div class="text-copy-primary text-sm leading-relaxed block md:text-xs lg:text-sm">
                    {project.subtitle}
                  </div>
                  <p class="text-copy-primary text-sm leading-relaxed block md:text-xs lg:text-sm">{project.category}</p>
                  <p class="text-sm leading-relaxed font-semibold text-copy-primary block md:text-xs lg:text-sm">Valoración media: {project.avg === null ? "Sin valoración todavía" : Math.round(project.avg * 100) / 100 + " / " + project.counter + " opiniones"}</p>
                  <div className="flex items-center">
                    <Link
                      to={'/user/' + project.user}
                      className="mt-6 block h-12 w-12 rounded-full overflow-hidden border border-gray-500 focus:outline-none focus:border-white"
                    >
                      <img className="h-full w-full object-cover" src={project.avatar_url} alt="Your avatar" />
                    </Link>
                    <div className="text-sm ml-4 pt-6">
                      <p className="text-copy-primary leading-none">{project.name + ' ' + project.first_name}</p>
                      <p className="text-copy-primary">
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
