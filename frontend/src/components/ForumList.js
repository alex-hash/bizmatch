import React from 'react';
import Navbar from '../components/Navbar';

export function ForumList({ forums }) {

  window.onload = function() {
    this.document.body.classList.replace("bg-white", "bg-green-400")
  };
  return (
    <div>
      <div>
        <Navbar />
      </div>
      <div className="ml-200p mt-nav bg-white md:bg-green-400 md:h-full mb-8 mt-nav-forum">
        <div className="flex flex-wrap justify-center">
          <div className="md:w-2/3 flex flex-wrap justify-end">
            <a
              href="/create-forum"
              className="relative bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded my-2 justify-end"
            >
              Crear nuevo tema
            </a>
          </div>
            {forums.map((forum) => (
              <div key={forum.id} className="md:w-2/3 break-all w-full">
                <div className="border-r border-b border-t border-l border-gray-400 lg:border-l-0 lg:border-t lg:border-gray-400 bg-white rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal">
                  <div className="mb-4">
                    <a href={"/forum/"+forum.id} className="relative text-gray-900 font-bold text-xl mb-2">
                      {forum.title}
                    </a>
                    <div className="text-gray-500 text-sm mb-3">{forum.category}</div>
                    <p className="text-gray-700 text-base">{forum.content}</p>
                  </div>
                  <div className="flex items-center">
                    <button className="block h-16 w-16 rounded-full overflow-hidden border-2 border-gray-600 focus:outline-none focus:border-white">
                      <img
                        className="h-full w-full object-cover"
                        src="https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=256&q=80"
                        alt="Your avatar"
                      />
                    </button>
                    <div className="text-sm ml-4">
                      <p className="text-gray-900 leading-none">{forum.name + " " + forum.first_name}</p>
                      <p className="text-gray-600">{forum.updated_at === null ? forum.created_at.replace('T', ' ').substring(0, 16) : forum.updated_at.replace('T', ' ').substring(0, 16)}</p>
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
