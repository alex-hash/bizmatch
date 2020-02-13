import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import Navbar from '../components/Navbar';
import { Link, useHistory } from 'react-router-dom';
import { useAuth } from '../context/auth-context';
import jwt_decode from 'jwt-decode';

export function Init() {
  const [backendErrorMessage, setBackendErrorMessage] = useState('');
  const { handleSubmit, register, errors, watch, formState, setError, setValue, reset } = useForm({
    mode: 'onBlur'
  });
  let history = useHistory();
  const { setRole, setCurrentUser } = useAuth();

  return (
    <div>
      <div>
        <Navbar />
      </div>

      <div class="bg-cover bg-center min-h-screen backimageinit">
        <div>
          
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
                    Woman standing under blue sky
                  </a>
                  <div class="text-gray-600 text-sm leading-relaxed block md:text-xs lg:text-sm">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo quidem blanditiis unde asperiores?
                    Officia amet perspiciatis ad quibusdam incidunt eaque, nobis, eveniet neque porro id commodi
                    quisquam debitis!
                  </div>
                  <div class="relative mt-2 lg:absolute bottom-0 mb-4 md:hidden lg:block"></div>
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
