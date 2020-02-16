import React from 'react';
import Navbar from '../components/Navbar';

export function ProjectList({ projects }) {
  return (
    <div>
      <div>
        <Navbar />
      </div>
      <div className=" mt-nav mr-32 flex flex-wrap justify-end">
        <a
          href="/create-project"
          className="mt-nav relative bg-button text-white font-bold py-2 px-8 rounded focus:outline-none focus:shadow-outline"
        >
          Crear nuevo proyecto
        </a>
      </div>
      <div class="mt-24">
        <div class="px-10 mx-10">
          <div class=" block md:flex flex-wrap justify-left md:-mx-2">
            {projects.map((project) => (
              <div class="p-10 w-full lg:w-1/3 mb-4 md:mb-0" key={project.id}>
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
                      <button className="mt-6 block h-16 w-16 rounded-full overflow-hidden border-2 border-gray-600 focus:outline-none focus:border-white">
                        <img
                          className="h-full w-full object-cover"
                          src="https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=256&q=80"
                          alt="Your avatar"
                        />
                      </button>
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
