import React, { useState, useEffect, useReducer } from 'react';
import Navbar from '../components/Navbar';
import { Link, useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useAuth } from '../context/auth-context';
import { addCommentProject, deleteCommentProject, updateProject, addPictureProject } from '../http/projectService';

export function Project({ project, comments, projectId, onDeleteProject, onUpdateProject, dispatch }) {
  console.log(project);
  const { handleSubmit, register, errors, watch, formState, setError, setValue, reset } = useForm({
    mode: 'onBlur'
  });
  const { role, setRole, setUser } = useAuth();
  /*
  const [state, setState] = useState({
    image_url: project.image_url === null ? '' : project.image_url
  });*/

  const history = useHistory();

  function refreshPage() {
    window.location.reload(false);
  }

  function renderButtons(comment, index) {
    const actual_user = role === null ? null : role.userId;
    if (comment.user === actual_user) {
      return (
        <div className="text-xs self-end mt-2">
          <button
            onClick={() => renderEditHtml(index)}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-1 border border-blue-700 rounded mr-2"
          >
            Editar
          </button>
          <button
            onClick={() => deleteCommentProject(comment.id).then(refreshPage)}
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-1 border border-red-700 rounded"
          >
            Borrar
          </button>
        </div>
      );
    }
  }

  function renderNewComment() {
    if (role !== null) {
      return (
        <div>
          <hr className="style1 mb-2" />
          <h1 className="font-bold p-2 lg:mx-4">Nuevo comentario</h1>
          <div className="w-full">
            <form
              className="bg-white md:shadow-md md:rounded px-8 pt-6 pb-8 mb-4 lg:mx-4"
              onSubmit={handleSubmit(handleSend)}
              noValidate
            >
              <div>
                <textarea
                  ref={register({
                    required: '*El contenido es necesario',
                    maxLength: {
                      message: '*El comentario no debe exceder los 200 caracteres',
                      value: 200
                    }
                  })}
                  className="resize-none shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="text"
                  rows="6"
                  type="text"
                  name="text"
                  placeholder=""
                ></textarea>
                {errors.text && <span className="error-validate">{errors.text.message}</span>}
              </div>
              <div className="flex flex-wrap bg-gray-100 px-2 py-4 justify-between w-full">
                <div className="flex flex-wrap align-bottom">
                  <img class="w-10 h-10 rounded-full mr-4" src={role.avatar_url} alt="Avatar" />
                  <div className="text-xs lg:text-sm flex flex-wrap items-center">
                    <p className="text-black leading-none">{role.email}</p>
                  </div>
                </div>
                <div className="text-xs self-end mt-2">
                  <button
                    onClick={refreshPage}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold p-2 md:text-base border border-blue-700 rounded mr-2"
                  >
                    Enviar
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      );
    }
  }

  function renderButtonsProject() {
    const actual_user = role === null ? null : role.userId;
    if (project[0].user === actual_user) {
      return (
        <div className="text-xs flex flex-wrap justify-end p-3">
          <button
            onClick={() => {
              dispatch({ type: 'UPDATE_PROJECT', edit: 1 });
            }}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-1 border border-blue-700 rounded mr-2"
          >
            Editar
          </button>
          <button
            onClick={() => {
              onDeleteProject(project.id);
            }}
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-1 border border-red-700 rounded"
          >
            Borrar
          </button>
        </div>
      );
    }
  }

  function renderEditHtml(index) {
    const div = document.getElementById(index);
    const p = document.getElementById(index + 'p');
  }

  const handleSend = (formData) => {
    return addCommentProject(projectId, formData).catch((error) => {
      if (error.response.status === 401) {
        setRole(null);
        setUser(null);
      }
    });
  };

  function onSubmit(e) {
    e.preventDefault();
    const data = new FormData();
    /*  data.append('picture', state.picture);*/
    const { title, subtitle, ubication, category, text, image_url } = project;
    let promise1 = updateProject({
      title,
      subtitle,
      ubication,
      category,
      text,
      image_url
    });
    if (typeof data.get('picture') === 'string') {
      promise1.then(() => dispatch({ type: 'UPDATE_PROJECT', edit: 0 }));
    } else {
      Promise.all([
        promise1,
        addPictureProject(data).then((response) => localStorage.setItem('currentUser', JSON.stringify(response.data)))
      ]).then(() => {
        dispatch({ type: 'UPDATE_PROJECT', edit: 0 });
      });
    }
  }

  function showComments() {
    if (comments !== null) {
      return (
        <div className="border-gray-200 border-2 mx-2 bg-white rounded mb-4 md:mt-20 lg:mx-24 ">
          <h1 className="font-bold p-2">Comentarios más recientes</h1>
          {comments.map((comment, index) => (
            <React.Fragment key={comment.id}>
              <hr className="style1 mb-2" />
              <div className="break-all w-full" id={index}>
                <p className="mb-2 text-xs lg:text-sm px-2" id={index + 'p'}>
                  {comment.text}
                </p>
                <div className="flex flex-wrap bg-gray-100 px-2 py-4 justify-between w-full">
                  <div className="flex flex-wrap align-bottom">
                    <Link to={'/user/' + comment.user}>
                      <img className="w-10 h-10 rounded-full mr-4" src={comment.avatar_url} alt="Avatar" />
                    </Link>
                    <div className="text-xs lg:text-sm self-center">
                      <p className="text-black leading-none w-full">{comment.name + ' ' + comment.first_name}</p>
                      <p className="text-grey-dark">
                        {comment.updated_at === null
                          ? comment.created_at.replace('T', ' ').substring(0, 16)
                          : comment.updated_at.replace('T', ' ').substring(0, 16)}
                      </p>
                    </div>
                  </div>
                  {renderButtons(comment, index)}
                </div>
              </div>
            </React.Fragment>
          ))}
          {renderNewComment()}
        </div>
      );
    }
  }

  function something(onUpdateProject, projectC) {
    if (onUpdateProject === 0) {
      return (
        <div>
          <div>
            <Navbar role={role} />
          </div>
          <div className="">
            {project.map((project, index) => (
              <div key={project.id} className=" break-all rounded  md:mx-18 lg:mx-24  mt-nav">
                <div className=" p-4 text-center font-serif font-bold text-xl lg:text-4xl tracking-wide ">
                  {project.title}
                </div>
                <div className="p-2  text-center font-serif font-bold text:l lg:text-xl tracking-wide ">
                  {project.subtitle}
                </div>
                <div className="flex flex-wrap mt-nav">
                  <div className="lg:w-1/2">
                    <div class="bg-white rounded-lg overflow-hidden">
                      <img
                        class=" p-2 lg:p-0 w-full object-cover object-center"
                        src="https://images.unsplash.com/photo-1457282367193-e3b79e38f207?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1654&q=80"
                        alt=""
                      />
                    </div>
                    <div className="lg:mt-4 text-gray-500 text-base mb-3 ml-2">Ubicación: {project.ubication}</div>

                    <div className="text-gray-500 text-base mb-3 ml-2">Categoría: {project.category}</div>
                  </div>
                  <div className="lg:w-1/2">
                    <div className="flex justify-center p-32">cosas varias</div>
                  </div>
                </div>
                <p className="mx-4 lg:mx-0 lg:mt-12 text-gray-700 text-lg">{project.text}</p>

                {renderButtonsProject()}
              </div>
            ))}
          </div>
          <hr className="style1 mb-4 md:mb-0  mx-12 md:hidden" />
          {showComments()}
        </div>
      );
    } else {
      return (
        <div>
          <div>
            <Navbar role={role} />
          </div>
          <div className="flex flex-wrap justify-center">
            <div className="w-full lg:w-1/2 p-6 bg-white ">
              <form
                className="w-full mt-2 h-full bg-white md:shadow-md md:rounded px-6 pb-8 mb-4"
                onSubmit={handleSubmit(onSubmit)}
                noValidate
              >
                <div className="mb-4">
                  <label className="block text-gray-900 text-md font-bold" for="title">
                    Título del Proyecto
                  </label>
                  <p className="text-md text-gray-700 mb-2"></p>
                  <input
                    defaultValue={projectC.title}
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
                    defaultValue={projectC.subtitle}
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
                    defaultValue={projectC.category}
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
                    defaultValue={projectC.ubication}
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
                    defaultValue={projectC.text}
                    ref={register({
                      required: '*El contenido es necesario'
                    })}
                    className="md:text-lg h-64 relative resize-none shadow appearance-none border rounded w-full py-2 px-3 text-gray-800 leading-tight focus:outline-none focus:shadow-outline"
                    id="text"
                    rows="6"
                    type="text"
                    name="text"
                    placeholder=""
                  ></textarea>
                  {errors.text && <span className="error-validate">{errors.text.message}</span>}
                </div>
                <div>
                  <label className="block text-gray-700 text-sm font-bold" for="content">
                    Imagen del proyecto
                  </label>
                  <input
                    type="file"
                    id="image_url"
                    name="image_url"
                    className="shadow appearance-none border rounded py-2 px-1 mb-2 text-gray-700 w-full leading-tight focus:outline-none focus:shadow-outline"
                  />
                  <div className="mt-2">
                    <button
                      className="bg-blue-500 text-white font-bold py-2 mr-2 px-2 rounded focus:outline-none focus:shadow-outline"
                      type="submit"
                    >
                      Guardar
                    </button>
                    <button
                      className="text-blue-500 font-bold py-2 px-2 rounded focus:outline-none focus:shadow-outline"
                      onClick={() => dispatch({ type: 'UPDATE_PROJECT', edit: 0 })}
                    >
                      Cancelar
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      );
    }
  }

  return <div>{something(onUpdateProject, project[0])}</div>;
}
