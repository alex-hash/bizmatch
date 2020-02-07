import React, { useEffect, useReducer } from 'react';
import Navbar from '../components/Navbar';
import { useForm } from 'react-hook-form';
import { addForum } from '../http/forumService';
import { useHistory } from "react-router-dom";

function forumsReducer(state, action) {
  switch (action.type) {
    case 'CREATE_FORUM':
      return { ...state, forums: [action.forum, ...state.forums] };

    default:
      return state;
  }
}

export function CreateForum() {
  const { handleSubmit, register, errors, formState } = useForm({
    mode: 'onBlur'
  });
  const [state, dispatch] = useReducer(forumsReducer, {
    forums: [],
    selectedForum: null
  });

  let history = useHistory();

  const handleCreateForum = (formdata) => {
    const data = {
      title: formdata.title,
      content: formdata.content,
      project_name: formdata.project_name,
      category: formdata.category
    };
    addForum(data).then((response) => {
      if (response.status === 201) {
        dispatch({ type: 'CREATE_FORUM', forum: data });
      }
      history.push('/');
    });
  };

  return (
    <div>
      <div>
        <Navbar />
      </div>
      <div className="ml-200p mt-nav bg-white md:bg-green-400 flex flex-wrap justify-center h-full md:flex md:flex-wrap md:justify-center md:items-center md:h-screen lg:flex lg:flex-wrap lg:justify-center lg:items-center lg:h-screen">
        <form
          className="mt-4 lg:w-5/6 bg-white md:shadow-md md:rounded px-8 pt-6 pb-8 mb-4 lg:mx-4"
          onSubmit={handleSubmit(handleCreateForum)}
          noValidate
        >
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold" for="title">
              Título de la consulta
            </label>
            <p className="text-sm text-gray-700 mb-2">Se específico, imagina que estás preguntando a otra persona</p>
            <input
              ref={register({
                required: '*El título es necesario',
                maxLength: {
                  message: '*El título no debe exceder los 60 caracteres',
                  value: 60
                }
              })}
              className="relative shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="title"
              type="text"
              name="title"
              placeholder=""
            />
            {errors.title && <span className="error-validate">{errors.title.message}</span>}
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold" for="content">
              Contenido de la consulta
            </label>
            <p className="text-sm text-gray-700 mb-2">
              Incluye todo la información necesaria para que una persona pueda contestar a tú pregunta
            </p>
            <textarea
              ref={register({
                required: '*El contenido es necesario'
              })}
              className="relative resize-none shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="content"
              rows="6"
              type="text"
              name="content"
              placeholder=""
            ></textarea>
            {errors.content && <span className="error-validate">{errors.content.message}</span>}
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" for="category">
              Categoría
            </label>
            <select
              ref={register({
                required: '*La categoría es necesaria'
              })}
              className=" relative shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="category"
              type="text"
              name="category"
              placeholder=""
            >
              <option value="Arte">Arte</option>
              <option value="Artesanías">Artesanías</option>
              <option value="Cine">Cine y vídeo</option>
              <option value="Comida">Comida</option>
              <option value="Cómics">Cómics</option>
              <option value="Danza">Danza</option>
              <option value="Diseño">Diseño</option>
              <option value="Fotografía">Fotografía</option>
              <option value="Juegos">Juegos</option>
              <option value="Moda">Moda</option>
              <option value="Música">Música</option>
              <option value="Periodismo">Periodismo</option>
              <option value="Publicaciones">Publicaciones</option>
              <option value="Teatro">Teatro</option>
              <option value="Tecnología">Tecnología</option>
            </select>
            {errors.category && <span className="error-validate">{errors.category.message}</span>}
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold" for="project">
              Título del proyecto
            </label>
            <p className="text-sm text-gray-700 mb-2">Proyecto que está relacionado con la duda</p>
            <input
              ref={register({
                required: '*El proyecto es necesario',
                maxLength: {
                  message: '*El proyecto no debe exceder los 60 caracteres',
                  value: 60
                }
              })}
              className="relative resize-none shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="project_name"
              type="text"
              name="project_name"
              placeholder=""
            />
            {errors.project && <span className="error-validate">{errors.project.message}</span>}
          </div>
          <div className="flex items-center justify-center">
            <button
              className="relative bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-8 rounded focus:outline-none focus:shadow-outline"
              type="submit"
              disabled={formState.isSubmitting}
            >
              Crear consulta
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
