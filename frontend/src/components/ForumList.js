import React from 'react';
import Navbar from '../components/Navbar';

export function ForumList({ forums }) {

  return (
    <div>
      <div>
        <Navbar />
      </div>
      <div className="ml-200p mt-nav bg-white md:bg-green-400 md:h-full">
        <div className="flex flex-wrap justify-center">
          <div className="md:w-2/3 flex flex-wrap justify-end">
            <a
              href="/create-forum"
              className="relative bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded my-2 justify-end"
            >
              Crear nuevo tema
            </a>
          </div>
          {forums.map((forum, index) => (
            <div className="md:w-2/3 break-all w-full">
              <div class="border-r border-b border-l border-gray-400 lg:border-l-0 lg:border-t lg:border-gray-400 bg-white rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal">
                <div class="mb-4">
                  <a href="" class="relative text-gray-900 font-bold text-xl mb-2">
                    {forum.title}
                  </a>
                  <p class="text-gray-700 text-base">{forum.content}</p>
                </div>
                <div class="flex items-center">
                  <button class="block h-16 w-16 rounded-full overflow-hidden border-2 border-gray-600 focus:outline-none focus:border-white">
                    <img
                      class="h-full w-full object-cover"
                      src="https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=256&q=80"
                      alt="Your avatar"
                    />
                  </button>
                  <div class="text-sm ml-4">
                    <p class="text-gray-900 leading-none">Jonathan Reinink</p>
                    <p class="text-gray-600">Aug 18</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
