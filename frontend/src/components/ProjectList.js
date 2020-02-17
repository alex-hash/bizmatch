import React from 'react';
import Navbar from '../components/Navbar';
import { Link, useHistory } from 'react-router-dom';

export function ProjectList({ projects }) {
  console.log(projects);
  return (
    <div>
      <div>
        <Navbar />
      </div>
      <div className="flex flex-wrap">
        <div class="w-screen sm:min-w-0 m-2 sm:m-0 order-1 sm:order-0 mt-nav sm:w-1/2 flex justify-center">
          <input
            type="search"
            class="min-w-full p-4 sm:ml-16 bg-purple-white shadow rounded border-0"
            placeholder="Busca por nombre,categoría..."
          />
        </div>
        <div className="w-screen sm:min-w-0 mt-nav sm:order-1 sm:w-1/2 flex justify-end mr-4 sm:mr-0">
          <a
            href="/create-project"
            className="sm:mr-16 bg-button text-white font-bold p-1 sm:p-4 rounded focus:outline-none focus:shadow-outline"
          >
            Crear nuevo proyecto
          </a>
        </div>
      </div>
      <div class="mt-12 md:mt-24">
        <div class="md:px-10 mx-2 md:mx-10">
          <div class=" block md:flex flex-wrap justify-left md:-mx-2">
            {projects.map((project) => (
              <div class="md:p-10 w-full lg:w-1/3 mb-4 md:mb-0" key={project.id}>
                <div class="bg-white rounded-lg overflow-hidden shadow relative">
                  <img
                    class="h-56 w-full object-cover object-center"
                    src="https://images.unsplash.com/photo-1457282367193-e3b79e38f207?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1654&q=80"
                    alt=""
                  />
                  <div class="p-4 h-auto md:h-40 lg:h-48">
                    <a href={'/project/' + project.id} className="relative text-gray-800 font-bold text-xl mb-2">
                      {project.title}
                    </a>
                    <div class="text-gray-600 text-sm leading-relaxed block md:text-xs lg:text-sm">
                      {project.subtitle}
                    </div>
                    <p class="text-gray-600 text-sm leading-relaxed block md:text-xs lg:text-sm">{project.category}</p>
                    <div className="flex items-center">
                      <Link
                        to="/user"
                        className="mt-6 block h-16 w-16 rounded-full overflow-hidden border-2 border-gray-600 focus:outline-none focus:border-white"
                      >
                        <img
                          className="h-full w-full object-cover"
                          src="https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=256&q=80"
                          alt="Your avatar"
                        />
                      </Link>
                      <div className="text-sm ml-4">
                        <p className="text-gray-900 leading-none">{project.name + ' ' + project.first_name}</p>
                        <p className="text-gray-600">
                          {project.updated_at === null
                            ? project.created_at.replace('T', ' ').substring(0, 16)
                            : project.updated_at.replace('T', ' ').substring(0, 16)}
                        </p>
                      </div>
                      <div class="relative mt-2 lg:absolute bottom-0 mb-4 md:hidden lg:block"></div>
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
