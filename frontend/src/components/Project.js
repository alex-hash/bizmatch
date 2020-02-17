import React from 'react';
import Navbar from '../components/Navbar';
import { Link, useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useAuth } from '../context/auth-context';
import { addCommentProject, deleteCommentProject } from '../http/projectService';

export function Project({ project, comments, projectId, onDeleteProject }) {
  const { handleSubmit, register, errors, watch, formState, setError, setValue, reset } = useForm({
    mode: 'onBlur'
  });

  const { role } = useAuth();

  const history = useHistory();

  function refreshPage() {
    window.location.reload(false);
  }

  function renderButtons(comment, index) {
    const actual_user = role.userId;
    if (comment.user === actual_user) {
      return (
        <div className="text-xs self-end mt-2">
          <button
            onClick={() => renderEditHtml(index)}
            className="relative bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-1 border border-blue-700 rounded mr-2"
          >
            Editar
          </button>
          <button
            onClick={() => deleteCommentProject(comment.id).then(refreshPage)}
            className="relative bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-1 border border-red-700 rounded"
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
    return addCommentProject(projectId, formData);
  };

  return (
    <div>
      <div>
        <Navbar role={role} />
      </div>
      <div className="">
        {project.map((project, index) => (
          <div key={project.id} className=" break-all rounded  md:mx-18 lg:mx-24  mt-nav">
            <div className=" p-4 text-center font-bold text-xl tracking-wide">{project.title}</div>
            <div className="p-2  text-center font-bold text tracking-wide">{project.subtitle}</div>
            <div className="flex flex-wrap">
              <div className="mt-6 lg:w-1/2">
                <div class="bg-white rounded-lg overflow-hidden shadow relative">
                  <img
                    class=" w-full object-cover object-center"
                    src="https://images.unsplash.com/photo-1457282367193-e3b79e38f207?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1654&q=80"
                    alt=""
                  />
                </div>
                <div className="lg:mt-4 text-gray-500 text-sm mb-3">Ubicación: {project.ubication}</div>

                <div className="text-gray-500 text-sm mb-3">Categoría: {project.category}</div>
              </div>
              <div classNmae="lg:w-1/2"></div>
            </div>
            <p className="mx-2 lg:mt-12 text-gray-700 text-base">{project.text}</p>

            <div className="text-xs flex flex-wrap justify-end p-3">
              <Link
                to={{
                  pathname: '/edite-project',
                  query: {
                    id: project.id,
                    title: project.title,
                    subtitle: project.subtitle,
                    category: project.category,
                    ubication: project.ubication,
                    text: project.text
                  }
                }}
                className="relative bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-1 border border-blue-700 rounded mr-2"
              >
                Editar
              </Link>
              <button
                onClick={() => {
                  onDeleteProject(project.id);
                }}
                className="relative bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-1 border border-red-700 rounded"
              >
                Borrar
              </button>
            </div>
          </div>
        ))}
      </div>
      <hr className="style1 mb-4 md:mb-0  mx-12 md:hidden" />
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
                  <img
                    className="w-10 h-10 rounded-full mr-4"
                    src="https://pbs.twimg.com/profile_images/885868801232961537/b1F6H4KC_400x400.jpg"
                    alt="Avatar of Jonathan Reinink"
                  />
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
        <hr className="style1 mb-2" />
        <h1 className="font-bold p-2 lg:mx-4">Nuevo comentario</h1>
        <div className="w-full">
          <form
            className="bg-white md:shadow-md md:rounded px-8 pt-6 pb-8 mb-4 lg:mx-4"
            onSubmit={handleSubmit(handleSend)}
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
              id="text"
              rows="6"
              type="text"
              name="text"
              placeholder=""
            ></textarea>
            <div className="flex flex-wrap bg-gray-100 px-2 py-4 justify-between w-full">
              <div className="flex flex-wrap align-bottom">
                <img
                  class="w-10 h-10 rounded-full mr-4"
                  src="https://pbs.twimg.com/profile_images/885868801232961537/b1F6H4KC_400x400.jpg"
                  alt="Avatar of Jonathan Reinink"
                />
                <div className="text-xs lg:text-sm flex flex-wrap items-center">
                  <p className="text-black leading-none">Jonathan Reinink</p>
                </div>
              </div>
              <div className="text-xs self-end mt-2">
                <button
                  onClick={refreshPage}
                  className="relative bg-blue-500 hover:bg-blue-700 text-white font-bold p-2 md:text-base border border-blue-700 rounded mr-2"
                >
                  Enviar
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
