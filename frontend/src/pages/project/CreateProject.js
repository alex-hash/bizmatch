import React, { useEffect, useReducer } from 'react';
import Navbar from '../../components/Navbar';
import { useForm } from 'react-hook-form';
import { addProject } from '../../http/projectService';
import { useHistory } from 'react-router-dom';
import { useAuth } from '../../context/auth-context';

function projectsReducer(state, action) {
  switch (action.type) {
    case 'CREATE_PROJECT':
      return { ...state, projects: [action.project, ...state.projects] };

    default:
      return state;
  }
}

export function CreateProject() {
  const { handleSubmit, register, errors, formState } = useForm({
    mode: 'onBlur'
  });
  const [state, dispatch] = useReducer(projectsReducer, {
    projects: [],
    selectedProject: null
  });

  let history = useHistory();

  const handleCreateProject = (formdata) => {
    const data = {
      title: formdata.title,
      subtitle: formdata.subtitle,
      category: formdata.category,
      ubication: formdata.ubication,
      text: formdata.text
    };
    addProject(data).then((response) => {
      if (response.status === 201) {
        dispatch({ type: 'CREATE_PROJECT', project: data });
      }
      history.push('/projects');
    });
  };
  const { role, setRole, setCurrentUser } = useAuth();
  return (
    <div>
      <div>
        <Navbar role={role} />
      </div>
      <div className="flex flex-wrap justify-center">
      <div className="w-full lg:w-1/2 p-6 bg-white ">
        <form
          className="w-full mt-2 h-full bg-white md:shadow-md md:rounded px-6 pb-8 mb-4"
          onSubmit={handleSubmit(handleCreateProject)}
          noValidate
        >
          <div className="mb-4">
            <label className="block text-gray-900 text-md font-bold" for="title">
              Título del Proyecto
            </label>
            <p className="text-md text-gray-700 mb-2"></p>
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
            <label className="block text-gray-800 text-md font-bold" for="title">
              Subtítulo del Proyecto
            </label>
            <p className="text-md text-gray-700 mb-2"></p>
            <input
              ref={register({
                required: '*El subtítulo es necesario',
                maxLength: {
                  message: '*El subtítulo no debe exceder los 135 caracteres',
                  value: 135
                }
              })}
              className="relative shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="subtitle"
              type="text"
              name="subtitle"
              placeholder=""
            />
            {errors.subtitle && <span className="error-validate">{errors.subtitle.message}</span>}
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" for="category">
              Categoría del proyecto
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
              <option value="Cine">Cine</option>
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
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold" for="title">
              Ubicación
            </label>
            <p className="text-sm text-gray-700 mb-2"></p>
            <input
              ref={register({
                required: '*La ubicación es necesaria',
                maxLength: {
                  message: '*La ubicación no debe exceder los 60 caracteres',
                  value: 60
                }
              })}
              className="relative shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="ubication"
              type="text"
              name="ubication"
              placeholder=""
            />
            {errors.ubication && <span className="error-validate">{errors.ubication.message}</span>}
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold" for="content">
              Contenido del Proyecto
            </label>
            <p className="text-sm text-gray-700 mb-2">Incluye todo la información necesaria</p>
            <textarea
              ref={register({
                required: '*El contenido es necesario'
              })}
              className="h-64 relative resize-none shadow appearance-none border rounded w-full py-2 px-3 text-gray-800 leading-tight focus:outline-none focus:shadow-outline"
              id="text"
              rows="6"
              type="text"
              name="text"
              placeholder=""
            ></textarea>
            {errors.text && <span className="error-validate">{errors.text.message}</span>}
          </div>

          <div className="flex items-center justify-center">
            <button
              className="relative bg-button text-white font-bold py-2 px-8 rounded focus:outline-none focus:shadow-outline"
              type="submit"
              disabled={formState.isSubmitting}
            >
              Crear proyecto
            </button>
          </div>
        </form>
      </div>
      </div>
    </div>
  );
}
