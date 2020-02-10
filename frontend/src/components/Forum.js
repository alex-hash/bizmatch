import React from 'react';
import Navbar from '../components/Navbar';
import { useForm } from 'react-hook-form';

export function Forum({ forum, comments, onDeleteForum }) {
  const { handleSubmit, register, errors, watch, formState, setError, setValue, reset } = useForm({
    mode: 'onBlur'
  });

  return (
    <div>
      <div>
        <Navbar />
      </div>
      <div className="ml-200p mt-nav bg-white md:bg-green-400 md:h-screen">
        <div className="md:bg-green-400 flex flex-wrap justify-center md:items-center">
          {forum.map((forum, index) => (
            <div className="md:w-2/3 break-all w-full rounded bg-white md:mx-8 md:mt-20">
              <div className="px-6 py-4">
                <div className="font-bold text-xl tracking-wide">{forum.title}</div>
                <div className="text-gray-500 text-sm mb-3">{forum.category}</div>
                <p className="text-gray-700 text-base">{forum.content}</p>
              </div>
              <div class="text-xs flex flex-wrap justify-end p-3">
                <a
                  href="/edite-forum"
                  class="relative bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-1 border border-blue-700 rounded mr-2"
                >
                  Editar
                </a>

                <a
                  class="relative bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-1 border border-red-700 rounded"
                  onClick={(e) => {
                    e.preventDefault();
                    onDeleteForum(forum.id);
                  }}
                >
                  Borrar
                </a>
              </div>
            </div>
          ))}
          <hr className="style1 mb-4 md:mb-0 w-full mx-2 md:hidden" />
          <div className="w-auto border-gray-200 border-2 mx-2 bg-white md:w-2/3 rounded mb-4 md:mt-20">
            <h1 className="font-bold p-2">Comentarios más recientes</h1>
            {comments.map((comment, index) => (
              <React.Fragment>
                <hr className="style1 mb-2" />
                <div className="break-all w-full">
                  <p className="mb-2 text-xs lg:text-sm px-2">{comment.text}</p>
                  <div class="flex flex-wrap bg-gray-100 px-2 py-4 justify-between w-full">
                    <div className="flex flex-wrap align-bottom">
                      <img
                        class="w-10 h-10 rounded-full mr-4"
                        src="https://pbs.twimg.com/profile_images/885868801232961537/b1F6H4KC_400x400.jpg"
                        alt="Avatar of Jonathan Reinink"
                      />
                      <div class="text-xs lg:text-sm">
                        <p class="text-black leading-none">Jonathan Reinink</p>
                        <p class="text-grey-dark">2 Aug 2019</p>
                      </div>
                    </div>
                    <div class="text-xs self-end">
                      <a
                        href="/edite-forum"
                        class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-1 border border-blue-700 rounded mr-2"
                      >
                        Editar
                      </a>
                      <button class="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-1 border border-red-700 rounded">
                        Borrar
                      </button>
                    </div>
                  </div>
                </div>
              </React.Fragment>
            ))}
            <hr className="style1 mb-2" />
            <h1 className="font-bold p-2 lg:mx-4">Nuevo comentario</h1>
            <div>
              <form
                className="bg-white md:shadow-md md:rounded px-8 pt-6 pb-8 mb-4 lg:mx-4"
                onSubmit={handleSubmit()}
                noValidate
              >
                <textarea
                  ref={register({
                    required: '*El contenido es necesario',
                    maxLength: {
                      message: '*El comentario no debe exceder los 200 caracteres',
                      value: 200
                    }
                  })}
                  className="relative resize-none shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="content"
                  rows="6"
                  type="text"
                  name="content"
                  placeholder=""
                ></textarea>
                <div class="flex flex-wrap bg-gray-100 px-2 py-4 justify-between w-full">
                  <div className="flex flex-wrap align-bottom">
                    <img
                      class="w-10 h-10 rounded-full mr-4"
                      src="https://pbs.twimg.com/profile_images/885868801232961537/b1F6H4KC_400x400.jpg"
                      alt="Avatar of Jonathan Reinink"
                    />
                    <div class="text-xs lg:text-sm">
                      <p class="text-black leading-none">Jonathan Reinink</p>
                      <p class="text-grey-dark">2 Aug 2019</p>
                    </div>
                  </div>
                  <div class="text-xs self-end">
                    <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold p-2 md:text-base border border-blue-700 rounded mr-2">
                      Enviar
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
