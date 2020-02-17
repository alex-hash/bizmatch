import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import Navbar from '../components/Navbar';
import { Link, useHistory } from 'react-router-dom';
import { useAuth } from '../context/auth-context';
import jwt_decode from 'jwt-decode';

export function Init({ projects }) {
  console.log(projects);
  const [backendErrorMessage, setBackendErrorMessage] = useState('');
  const { handleSubmit, register, errors, watch, formState, setError, setValue, reset } = useForm({
    mode: 'onBlur'
  });
  let history = useHistory();
  const { role, setRole, setCurrentUser } = useAuth();
  return (
    <div>
      <div>
        <Navbar role={role} />
      </div>
      <div class="bg-cover mt-4 md:mt-0 min-h-screen backimageinit flex flex-wrap px-4 md:px-0">
        <div className="w-full md:w-2/5 bg-white rounded px-10 py-8 self-center md:ml-32">
          <h1 className="font-bold text-xl md:text-3xl pb-1">¿A quién se dirige Bizmatch?</h1>
          <p className="text-gray-700 pb-2 md:pb-4 md:text-xl">En Bizmatch tenemos dos tipos de perfiles:</p>
          <p className="font-semibold">Emprendedor</p>
          <p className="pb-2 md:pb-4">
            Crea tú proyecto, exponlo ante nuestra comunidad de mentores y recibe feedback sobre tu proyecto.
          </p>
          <p className="font-semibold">Mentor</p>
          <p className="pb-4 md:pb-6">
            Da feedback sobre los proyectos de los emprendedores, recibe valoraciones del resto de usuarios y alzate
            como uno de los mejores profesionales de tu sector.
          </p>
          <Link
            to="/register"
            className="text-right relative bg-button text-white font-bold py-2 px-8 rounded focus:outline-none focus:shadow-outline"
          >
            Comenzar
          </Link>
        </div>
      </div>

      <div class="mt-10">
        <div class="px-10">
          <div class="block md:flex justify-between md:-mx-2">
            <div class="w-full lg:w-1/3 md:mx-2 mb-4 md:mb-0">
              <div class="bg-white rounded-lg overflow-hidden shadow relative">
                <img
                  class="h-56 w-full object-cover object-center"
                  src="https://images.unsplash.com/photo-1457282367193-e3b79e38f207?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1654&q=80"
                  alt=""
                />
                <div class="p-4 h-auto md:h-40 lg:h-48">
                  <a
                    href="#"
                    class="block text-blue-500 hover:text-blue-600 font-semibold mb-2 text-lg md:text-base lg:text-lg"
                  >
                    Importar Título aquí
                  </a>
                  <div class="text-gray-600 text-sm leading-relaxed block md:text-xs lg:text-sm">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo quidem blanditiis unde asperiores?
                    Officia amet perspiciatis ad quibusdam incidunt eaque, nobis, eveniet neque porro id commodi
                    quisquam debitis!
                  </div>
                </div>
              </div>
            </div>

            <div class="w-full lg:w-1/3 md:mx-2 mb-4 md:mb-0">
              <div class="bg-white rounded-lg overflow-hidden shadow relative">
                <img
                  class="h-56 w-full object-cover object-center"
                  src="https://images.unsplash.com/photo-1465188162913-8fb5709d6d57?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60"
                  alt=""
                />
                <div class="p-4 h-auto md:h-40 lg:h-48">
                  <a
                    href="#"
                    class="block text-blue-500 hover:text-blue-600 font-semibold mb-2 text-lg md:text-base lg:text-lg"
                  >
                    Woman walking on pathway
                  </a>
                  <div class="text-gray-600 text-sm leading-relaxed block md:text-xs lg:text-sm">
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit. Iure aut quia alias ullam eveniet sunt!
                    Ipsa, sunt. Inventore ipsum sit quasi. Alias quasi officiis blanditiis!
                  </div>
                  <div class="relative mt-2 lg:absolute bottom-0 mb-4 md:hidden lg:block"></div>
                </div>
              </div>
            </div>
            <div class="w-full lg:w-1/3 md:mx-2 mb-4 md:mb-0">
              <div class="bg-white rounded-lg overflow-hidden shadow relative">
                <img
                  class="h-56 w-full object-cover object-center"
                  src="https://images.unsplash.com/photo-1467238307002-480ffdd260f2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60"
                  alt=""
                />
                <div class="p-4 h-auto md:h-40 lg:h-48">
                  <a
                    href="#"
                    class="block text-blue-500 hover:text-blue-600 font-semibold mb-2 text-lg md:text-base lg:text-lg"
                  >
                    Walking through a forest in the afternoon
                  </a>
                  <div class="text-gray-600 text-sm leading-relaxed block md:text-xs lg:text-sm">
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit. Commodi nemo magni saepe cumque error quia
                    quae sint ducimus, maiores doloremque.
                  </div>
                  <div class="relative mt-2 lg:absolute bottom-0 mb-4 md:hidden lg:block"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
