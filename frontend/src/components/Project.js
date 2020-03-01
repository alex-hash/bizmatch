import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useAuth } from '../context/auth-context';
import StarRating from '../components/StarRating';
import StarRatingComment from '../components/StarRatingComment';
import Swal from 'sweetalert2';
import {
  addCommentProject,
  deleteCommentProject,
  updateProject,
  addPictureProject,
  deleteProject
} from '../http/projectService';

export function Project({ project, comments, projectId, onUpdateProject, dispatch, assesment, assesmentC }) {
  const { handleSubmit, register, errors, formState } = useForm({
    mode: 'onBlur'
  });
  const { role, setRole, setUser } = useAuth();

  function refreshPage() {
    window.location.reload(false);
  }

  function renderButtons(comment, index) {
    const actual_user = role === null ? null : role.userId;
    if (comment.user === actual_user) {
      return (
        <div className="text-xs mt-2">
          <button
            onClick={() => deleteCommentProject(comment.id).then(refreshPage)}
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-1 border border-red-700 rounded mx-2"
          >
            <img src="https://img.icons8.com/android/15/000000/delete.png" />
          </button>
        </div>
      );
    } else {
      if(role.role === "E"){
        let assesmentForStarRating = 0;
        for(const element of assesmentC){
          if(element.id === comment.id){
            assesmentForStarRating = element.type;
          }
        }
        return (
          <div className="pr-2">
            <StarRatingComment comment={comment.id} assesment={assesmentForStarRating}></StarRatingComment>  
          </div>
        )
      }
    }
  }

  const handleSend = (formData) => {
    formData.text = formData.text.replace(/\n/g, '<br />');
    return addCommentProject(projectId, formData)
      .then(() => window.location.reload())
      .catch((error) => {
        if (error.response.status === 401) {
          setRole(null);
          setUser(null);
        }
      });
  };

  function renderNewComment() {
    if (role !== null) {
      if (role.role === 'M') {
        return (
          <div className="w-full p-2">
            <h1 className="font-bold mt-2">Nuevo comentario</h1>
            <div className="w-full ">
              <form
                className="bg-white md:shadow-md md:rounded pt-6 pb-8 mb-4 px-4 border-gray-200 border-2"
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
                    className="resize-none shadow appearance-none border rounded w-full py-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="text"
                    rows="6"
                    type="text"
                    name="text"
                    placeholder=""
                  ></textarea>
                  {errors.text && <span className="error-validate">{errors.text.message}</span>}
                </div>
                <div className="flex flex-wrap px-2 py-4 justify-between w-full">
                  <div className="flex flex-wrap align-bottom">
                    <img class="w-10 h-10 rounded-full mr-4 self-center" src={role.avatar_url} alt="Avatar" />
                    <p className="text-black text-sm leading-none self-center">{role.email}</p>
                  </div>
                  <div className="text-xs self-end mt-2">
                    <input
                      type="submit"
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold p-2 md:text-base border border-blue-700 rounded"
                      disabled={formState.isSubmitting}
                    />
                  </div>
                </div>
              </form>
            </div>
          </div>
        );
      }
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
              deleteProject(projectId)
                .then(() => (window.location.href = '/projects'))
                .catch((error) => {
                  if (error.response.status === 401) {
                    setRole(null);
                    setUser(null);
                  }
                });
            }}
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-1 border border-red-700 rounded"
          >
            Borrar
          </button>
        </div>
      );
    }
  }

  const [estado, setState] = useState(null);

  function onChangeHandler(e) {
    setState({ ...estado, [e.target.name]: e.target.files[0] });
  }

  const onSubmit = (formData, e) => {
    e.preventDefault();
    formData.text = formData.text.replace(/\n/g, '<br />');
    const data = new FormData();
    if (estado !== null) {
      data.append('image_url', estado.image_url);

      let promise1 = updateProject(projectId, formData);
      Promise.all([promise1, addPictureProject(projectId, data)])
        .then(() => (window.location.href = '/project/' + projectId))
        .then(() => {
          dispatch({ type: 'UPDATE_PROJECT', edit: 0 });
        }).catch((error) => {
          if (error.response.status === 401) {
            window.localStorage.clear();
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Tú token de sesión ha expirado'
            }).then(() => {
              window.location.href = '/';
            });
          } else if (error.response.status === 400) {
            window.location.href = '/404';
          }
        });
    } else {
      let promise1 = updateProject(projectId, formData);
      promise1
        .then(() => (window.location.href = '/project/' + projectId))
        .then(() => {
          dispatch({ type: 'UPDATE_PROJECT', edit: 0 });
        }).catch((error) => {
          if (error.response.status === 401) {
            window.localStorage.clear();
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Tú token de sesión ha expirado'
            }).then(() => {
              window.location.href = '/';
            });
          } else if (error.response.status === 400) {
            window.location.href = '/404';
          }
        });
    }
  };

  function showComments() {
    if (comments.length !== 0) {
      return (
        <div className="w-full flex flex-wrap justify-center border-gray-200 bg-gray-100 border-2 px-2 bg-white rounded mb-4 mt-10">
          <h1 className="font-bold p-2">Comentarios más recientes</h1>
          {comments.map((comment, index) => (
            <React.Fragment key={comment.id}>
              <hr className="style1 mb-2" />
              <div className="break-all w-full bg-white border-gray-200 border-2 mx-2" id={index}>
                <div className="flex flex-wrap py-4 justify-between w-full pl-2">
                  <div className="flex flex-wrap align-bottom">
                    <Link to={'/user/' + comment.user}>
                      <img className="w-10 h-10 rounded-full mr-2" src={comment.avatar_url} alt="Avatar" />
                    </Link>
                    <div className="text-xs lg:text-sm self-center">
                      <p className="text-black leading-none w-full">{comment.name + ' ' + comment.first_name}</p>
                      <p className="text-gray-500">
                        {comment.updated_at === null
                          ? comment.created_at.replace('T', ' ').substring(0, 16)
                          : comment.updated_at.replace('T', ' ').substring(0, 16)}
                      </p>
                    </div>
                  </div>
                  {renderButtons(comment, index)}
                </div>
                <p
                  dangerouslySetInnerHTML={{ __html: comment.text.replace(/<br\s*\\?>/g, '\r\n') }}
                  className="mb-2 text-xs lg:text-sm px-2"
                  id={index + 'p'}
                ></p>
                <hr/>
                <h1 className="mb-2 italic text-xs lg:text-sm px-2 mt-2">{(comment.avg === null ? '' : "Valorado "+Math.round(comment.avg * 100) / 100) +
                            (comment.avg === null ? 'Sin valoración todavía' : ' / ') +
                            (comment.avg === null ? '' : comment.counter + ' votos')}</h1>
              </div>
            </React.Fragment>
          ))}
          {renderNewComment()}
        </div>
      );
    } else {
      return (
        <div className="w-full flex flex-wrap justify-center border-gray-200 bg-gray-100 border-2 px-2 bg-white rounded mb-4 mt-10">
          <h1 className="font-bold p-2">No hay comentarios en este proyecto</h1>
          {renderNewComment()}
        </div>
      );
    }
  }

  function showStarIfLogged() {
    if (role) {
      return (
        <div className="mt-2">
          <StarRating assesment={assesment} project={projectId}></StarRating>
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
          <div className="flex flex-wrap">
            <div className="md:w-1/5"></div>
            <div className="w-full md:w-3/5">
              {project.map((project, index) => (
                <div key={project.id} className="break-words rounded mx-4 md:mx-0">
                  <div className="p-2 text-center font-serif font-bold text-xl lg:text-4xl tracking-wide ">
                    {project.title}
                  </div>
                  <div className="text-center font-serif text:l lg:text-xl tracking-wide ">{project.subtitle}</div>
                  <div className="flex flex-wrap mt-4 md:mt-10">
                    <div className="lg:w-1/2 -mx-4 md:mx-0">
                      <div class="bg-white sm:rounded-lg overflow-hidden">
                        <img class="img-project py-4 sm:w-auto" src={project.image_url} alt={project.title} />
                      </div>
                    </div>
                    <div className="order-2 lg:order-3">
                      {showStarIfLogged()}
                      <div className="w-full">
                        <div className="text-black font-semibold text-sm w-full">
                          Valoración media: {project.avg === null ? "Sin valoración todavía" : Math.round(project.avg * 100) / 100 + " / " + project.counter + " opiniones"}
                        </div>
                        <div className="text-gray-600 font-semibold text-sm w-full">Ubicación: {project.ubication}</div>
                        <div className="text-gray-600 font-semibold text-sm mb-2 w-full">
                          Categoría: {project.category}
                        </div>
                      </div>
                      <h1 className="font-bold w-full mt-6">Descripción del Proyecto </h1>
                      <p
                        dangerouslySetInnerHTML={{ __html: project.text }}
                        className="break-all text-gray-700 text-lg"
                      ></p>
                    </div>
                    <div className="w-full lg:w-1/2 md:p-16 mt-10 lg:mt-0 order-3 lg:order-2">
                      <div className="border-grey-400">
                        <h1 className="text-black font-semibold text-2xl text-center">Perfil del creador</h1>
                        <div className="flex flex-wrap justify-center mt-4">
                          <Link
                            to={'/user/' + project.user}
                            className="block h-20 w-20 rounded-full overflow-hidden focus:outline-none focus:border-white "
                          >
                            <img className="h-full w-full object-cover" src={project.avatar_url} alt="Your avatar" />
                          </Link>
                          <div className="text-black font-semibold text-center break-all p-4 w-full">
                            {project.name + ' ' + project.first_name}
                          </div>
                          <div
                            dangerouslySetInnerHTML={{
                              __html:
                                project.description === null ? '' : project.description.replace(/<br\s*\\?>/g, '\r\n')
                            }}
                            className="h-6 text-black font-semibold text-center truncate text-sm w-full"
                          ></div>
                          <a
                            href={'/user/' + project.user}
                            className=" mt-10 text-blue-500 font-semibold text-center text-sm w-full"
                          >
                            Continua conociendome
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                  {renderButtonsProject()}
                  {showComments()}
                </div>
              ))}
            </div>
          </div>
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
                    defaultValue={projectC.text.replace(/<br\s*\/?>/gm, '\n')}
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
                    id="file"
                    name="image_url"
                    className="shadow appearance-none border rounded py-2 px-1 mb-2 text-gray-700 w-full leading-tight focus:outline-none focus:shadow-outline"
                    onChange={onChangeHandler}
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
