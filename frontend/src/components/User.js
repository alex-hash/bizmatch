import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import { useAuth } from '../context/auth-context';
import { updateProfile, updateAvatar } from '../http/userService';

export function UserRender({ user, edit, dispatch, projects, comments }) {
  const { role } = useAuth();

  const [estado, setState] = useState({
    company_name: user.company_name,
    company_role: user.company_role,
    page_url: user.page_url,
    description: user.description,
    avatar_url: user.avatar_url === null ? '' : user.avatar_url
  });

  function eOrM(type, edit) {
    if (type === 'M' && edit === 0) {
      return (
        <div>
          <div>
            <img
              className="h-24 w-24 rounded-full mx-auto border-4 border-gold top-perfil"
              src={user.avatar_url}
              alt={user.name + ' ' + user.first_name}
            />
          </div>
          <div className="mt-2 flex flex-wrap">
            <img className="self-center" src="https://img.icons8.com/ios/25/000000/crowdfunding.png" />
            <p className="text-sm mb-2 ml-2 mt-2">Mentor</p>
          </div>
        </div>
      );
    } else if (type === 'E' && edit === 0) {
      return (
        <div>
          <div>
            <img
              className="h-24 w-24 rounded-full mx-auto top-perfil"
              src={user.avatar_url}
              alt={user.name + ' ' + user.first_name}
            />
          </div>
          <div className="mt-2 flex flex-wrap">
            <img className="self-center" src="https://img.icons8.com/ios/25/000000/light-on.png" />
            <p className="text-sm mb-2 ml-2 mt-2">Emprendedor</p>
          </div>
        </div>
      );
    } else if (type === 'E' && edit === 1) {
      return (
        <div>
          <div>
            <img
              className="h-24 w-24 rounded-full mx-auto top-perfil"
              src={user.avatar_url}
              alt={user.name + ' ' + user.first_name}
            />
            <h1 className="mt-4 float-left font-semibold">Cambiar foto perfil</h1>
            <input
              type="file"
              name="avatar"
              className="shadow appearance-none border rounded py-2 px-3 mb-2 text-gray-700 w-full leading-tight focus:outline-none focus:shadow-outline"
              onChange={onChangeHandler}
            />
          </div>
          <div className="mt-2 flex flex-wrap">
            <img className="self-center" src="https://img.icons8.com/ios/25/000000/light-on.png" />
            <p className="text-sm mb-2 ml-2 mt-2">Emprendedor</p>
          </div>
        </div>
      );
    } else {
      return (
        <div>
          <div>
            <img
              className="h-24 w-24 rounded-full mx-auto border-4 border-gold top-perfil"
              src={user.avatar_url}
              alt={user.name + ' ' + user.first_name}
            />
            <h1 className="mt-4 float-left font-semibold">Cambiar foto perfil</h1>
            <input
              type="file"
              name="avatar"
              className="shadow appearance-none border rounded py-2 px-3 mb-2 text-gray-700 w-full leading-tight focus:outline-none focus:shadow-outline"
              onChange={onChangeHandler}
            />
          </div>
          <div className="mt-2 flex flex-wrap">
            <img className="self-center" src="https://img.icons8.com/ios/25/000000/crowdfunding.png" />
            <p className="text-sm mb-2 ml-2 mt-2">Mentor</p>
          </div>
        </div>
      );
    }
  }

  function roleE(role) {
    if (role !== null) {
      return (
        <div className="flex flex-wrap">
          <img className="self-center" src="https://img.icons8.com/small/25/000000/reviewer-female.png" />
          <p className="text-left text-sm mb-2 ml-2 mt-2">{user.company_role}</p>
        </div>
      );
    }
  }

  function companyWork(work) {
    if (work !== null) {
      return (
        <div className="flex flex-wrap">
          <img className="self-center" src="https://img.icons8.com/officel/25/000000/travel-card.png" />
          <p className="text-left text-sm mb-2 ml-2 mt-2">{user.company_name}</p>
        </div>
      );
    }
  }

  function urlDefinided(url) {
    if (url !== null) {
      return (
        <div className="flex flex-no-wrap">
          <img className="self-center" src="https://img.icons8.com/ios-filled/25/000000/link.png" />
          <a href={user.page_url} className="text-left text-sm mb-2 ml-2 mt-2">
            {user.page_url}
          </a>
        </div>
      );
    }
  }

  function descriptionNote(text) {
    if (text !== null) {
      return (
        <div className="">
          <img
            className="mt-4 sm:px-1"
            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAAZCAYAAADE6YVjAAAABmJLR0QA/wD/AP+gvaeTAAABcklEQVRIie2VsUvDQBSHv9cUHUqhi4i4+B8IzSvUrSC4dLAuOrs5OIpjoThawf/A0UnQwamDLkKh14Bzwc3ByR7oIjTnYITSVE2qxUG/JeTHu/fl7rgc/JMCGRcGQbAahmEDWEjb0Dm3UyqVWsNZdrSo3W7Ph2F4AVjgJopLwCJwPlRaA+6BTvQ+B1REJDfaMybxPM8HcsCWql4CGGNOgJqqbr7XGWMegWtV3QbodDoVEamMm11mNBCRmWjaz+MGTEJMMg1iy/UZvV5vtt/v7xUKhaa1dioSz1p7JiJVa+0K4E1DkgeqQCt6JibtntRVdU1E9qclqavqAYDv+4dpRImWK5PJHBeLxdvhzPf9wyAIlhONT1I0Kvgqn0jyXX73MIrIkTHGpeiVTy0BlkQkSGpw7uPviUmccy8ignNuV1VPk0qiv/BVIslgMOhms9knEWkaYzaSSni7T8YSk5TL5Ydut7vunGsAfgoJwN1PXhF/lFdP03Cy/K3aIgAAAABJRU5ErkJggg=="
          />
          <p
            dangerouslySetInnerHTML={{ __html: text.replace(/<br\s*\\?>/g, '\r\n') }}
            className="break-all sm:px-2"
          ></p>
        </div>
      );
    }
  }

  function buttonEdit() {
    if (role.email === user.email) {
      return (
        <span>
          -{' '}
          <button className="text-blue-500" onClick={() => dispatch({ type: 'EDIT', edit: 1 })}>
            Editar Perfil
          </button>
        </span>
      );
    }
  }

  function getTops() {
    if (user.type === 'E') {
      if (projects.length === 0) {
        return (
          <h1 class="font-semibold text-xl mt-4 mb-2 sm:px-2">
            Proyectos destacados - <span className="text-base font-normal">No hay proyectos</span>
          </h1>
        );
      } else {
        return (
          <div>
            <h1 class="font-semibold text-xl mt-4 mb-2 sm:px-2">
              Proyectos destacados -{' '}
              <a href={'/projects/' + user.identify} className="text-blue-500 text-base font-normal">
                Ver todos los proyectos
              </a>
            </h1>
            <div className="flex flex-wrap self-end">
              {projects.map((project, index) => (
                <div class="mb-4 w-full sm:w-1/2 sm:px-2 lg:w-full xl:w-1/2">
                  <div class="bg-white h-full rounded-lg overflow-hidden shadow">
                    <img class="h-32 w-full object-cover object-center" src={project.image_url} alt="" />
                    <div class="p-4 h-full">
                      <a
                        href={'/project/' + project.id}
                        class="block text-blue-500 hover:text-blue-600 font-semibold mb-2 text-lg md:text-base lg:text-lg"
                      >
                        {project.title}
                      </a>
                      <div class="text-gray-600 text-sm leading-relaxed block md:text-xs lg:text-sm break-all">
                        {project.text}
                      </div>
                      <div class="mt-2 lg:absolute bottom-0 mb-4 md:hidden lg:block"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      }
    } else {
      if (comments.length === 0) {
        return (
          <h1 class="font-semibold text-xl mt-4 mb-2 sm:px-2">
            Comentarios destacados - <span className=" text-base font-normal">No hay comentarios</span>
          </h1>
        );
      } else {
        return (
          <div>
            <h1 class="font-semibold text-xl mt-4 mb-2 sm:px-2">
              Comentarios destacados - <a className="text-blue-500 text-base font-normal">Ver todos los comentarios</a>
            </h1>
            <div className="flex flex-wrap self-end">
              {comments.map((comment, index) => (
                <div class="mb-4 w-full sm:w-1/3 sm:px-2 lg:w-full xl:w-1/2">
                  <div class="bg-white h-full rounded-lg overflow-hidden shadow">
                    <div class="p-4 h-full flex flex-col justify-between">
                      <div
                        dangerouslySetInnerHTML={{ __html: comment.text.replace(/<br\s*\\?>/g, '\r\n') }}
                        class="text-gray-600 text-sm leading-relaxed block md:text-xs lg:text-sm break-all"
                      ></div>
                      <div className="mt-2 text-sm leading-relaxed block md:text-xs lg:text-sm break-all self-start">
                        <a href={'/project/' + comment.project}>
                          En el proyecto: <span className="text-blue-500">{comment.title}</span>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      }
    }
  }

  function onChange(e) {
    setState({ ...estado, [e.target.name]: e.target.value });
  }

  function onChangeHandler(e) {
    setState({ ...estado, [e.target.name]: e.target.files[0] });
  }

  function onSubmit(e) {
    e.preventDefault();
    const data = new FormData();
    data.append('avatar', estado.avatar);
    let { company_role, company_name, page_url, description } = estado;
    company_role = company_role === '' ? null : company_role;
    company_name = company_name === '' ? null : company_name;
    page_url = page_url === '' ? null : page_url;
    description = description === null ? null : description.replace(/\n/g, '<br />');

    const { email, name, first_name, last_name, type } = user;
    let { birthday } = user;
    birthday = birthday.substring(0, 10);
    let country = 'Tupu';
    let city = 'sadsad';
    let promise1 = updateProfile({
      email,
      name,
      first_name,
      last_name,
      birthday,
      country,
      city,
      company_name,
      company_role,
      page_url,
      type,
      description
    });
    if (typeof data.get('avatar') === 'string') {
      promise1.then(() => (window.location.href = '/user'));
    } else {
      Promise.all([
        promise1,
        updateAvatar(data).then((response) => localStorage.setItem('currentUser', JSON.stringify(response.data)))
      ]).then(() => (window.location.href = '/user'));
    }
  }

  function something(edit) {
    if (edit === 0) {
      return (
        <div className="min-h-screen">
          <div>
            <Navbar role={role} />
          </div>
          <div className="mt-pefil mt-16 bg-white flex flex-col-reverse items-center lg:items-start lg:flex-row lg:flex-wrap lg:justify-center h-full">
            <div className="xl:w-1/5 lg:w-1/5"></div>
            <div className="text-center w-full p-6 md:p-0 lg:p-6 break-all md:w-2/3 xl:border lg:border xl:w-1/5 lg:w-1/5">
              {eOrM(user.type, 0)}
              <p className="text-left text-sm mb-2 ml-2 mt-2">Valoración media</p>
              {roleE(user.company_role)}
              <div className="border-t-2 mt-4 text-left">
                <h1 className="font-bold text-lg pt-4 pb-2">Más información</h1>
                {companyWork(user.company_name)}
                <div className="flex flex-wrap">
                  <img className="self-center" src="https://img.icons8.com/ios-glyphs/25/000000/email.png" />
                  <p className="text-left text-sm mb-2 ml-2 mt-2">{user.email}</p>
                </div>
                {urlDefinided(user.page_url)}
              </div>
            </div>
            <div className="px-6 md:p-0 md:w-2/3 xl:w-2/5 lg:w-2/5 xl:pl-20 lg:pl-20 w-full">
              <h1 class="font-bold text-5xl sm:px-2 break-all mr-0 mr-48-t md:mr-48 lg:mr-0">
                {user.name + ' ' + user.first_name}
              </h1>
              <p className="text-gray-700 sm:px-2">
                Se registró en {user.created_at !== undefined ? user.created_at.substring(0, 4) : ''} {buttonEdit()}
              </p>
              {descriptionNote(user.description)}
              {getTops()}
            </div>
            <div className="xl:w-1/5 lg:w-1/5"></div>
          </div>
        </div>
      );
    } else {
      return (
        <div className="min-h-screen">
          <div>
            <Navbar role={role} />
          </div>
          <form onSubmit={onSubmit} noValidate>
            <div className="mt-pefil mt-16 bg-white flex flex-col-reverse items-center lg:items-start lg:flex-row lg:flex-wrap lg:justify-center h-full">
              <div className="xl:w-1/5 lg:w-1/5"></div>
              <div className="text-center w-full p-6 md:p-0 lg:p-6 break-all md:w-2/3 xl:border lg:border xl:w-1/5 lg:w-1/5">
                {eOrM(user.type, 1)}
                <p className="text-left text-sm mb-2 ml-2 mt-2">Valoración media</p>
                <div className="flex flex-wrap">
                  <img className="self-center" src="https://img.icons8.com/small/25/000000/reviewer-female.png" />
                  <input
                    defaultValue={user.company_role}
                    name="company_role"
                    type="text"
                    className="shadow appearance-none border rounded py-2 px-3 mb-2 ml-2 mt-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    placeholder="Cargo en tú empresa"
                    onChange={onChange}
                  ></input>
                </div>
                <div className="border-t-2 mt-4 text-left">
                  <h1 className="font-bold text-lg pt-4 pb-2">Más información</h1>
                  <div className="flex flex-wrap">
                    <img className="self-center" src="https://img.icons8.com/officel/25/000000/travel-card.png" />
                    <input
                      defaultValue={user.company_name}
                      name="company_name"
                      type="text"
                      className="shadow appearance-none border rounded py-2 px-3 mb-2 ml-2 mt-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      placeholder="La empresa en la que trabajas"
                      onChange={onChange}
                    ></input>
                  </div>
                  <div className="flex flex-wrap">
                    <img className="self-center" src="https://img.icons8.com/ios-glyphs/25/000000/email.png" />
                    <p className="text-left text-sm mb-2 ml-2 mt-2">{user.email}</p>
                  </div>
                  <div className="flex flex-no-wrap">
                    <img className="self-center" src="https://img.icons8.com/ios-filled/25/000000/link.png" />
                    <input
                      defaultValue={user.page_url}
                      name="page_url"
                      type="text"
                      className="shadow appearance-none border rounded py-2 px-3 mb-2 ml-2 mt-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      placeholder="Web url de la empresa"
                      onChange={onChange}
                    ></input>
                  </div>
                </div>
              </div>
              <div className="px-6 md:p-0 md:w-2/3 xl:w-2/5 lg:w-2/5 xl:pl-20 lg:pl-20 w-full">
                <h1 class="font-bold text-5xl break-all mr-0 mr-48-t md:mr-48 lg:mr-0">
                  {user.name + ' ' + user.first_name}
                </h1>
                <p className="text-gray-700">
                  Se registró en {user.created_at !== undefined ? user.created_at.substring(0, 4) : ''}
                </p>
                <img
                  className="mt-4"
                  src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAAZCAYAAADE6YVjAAAABmJLR0QA/wD/AP+gvaeTAAABcklEQVRIie2VsUvDQBSHv9cUHUqhi4i4+B8IzSvUrSC4dLAuOrs5OIpjoThawf/A0UnQwamDLkKh14Bzwc3ByR7oIjTnYITSVE2qxUG/JeTHu/fl7rgc/JMCGRcGQbAahmEDWEjb0Dm3UyqVWsNZdrSo3W7Ph2F4AVjgJopLwCJwPlRaA+6BTvQ+B1REJDfaMybxPM8HcsCWql4CGGNOgJqqbr7XGWMegWtV3QbodDoVEamMm11mNBCRmWjaz+MGTEJMMg1iy/UZvV5vtt/v7xUKhaa1dioSz1p7JiJVa+0K4E1DkgeqQCt6JibtntRVdU1E9qclqavqAYDv+4dpRImWK5PJHBeLxdvhzPf9wyAIlhONT1I0Kvgqn0jyXX73MIrIkTHGpeiVTy0BlkQkSGpw7uPviUmccy8ignNuV1VPk0qiv/BVIslgMOhms9knEWkaYzaSSni7T8YSk5TL5Ydut7vunGsAfgoJwN1PXhF/lFdP03Cy/K3aIgAAAABJRU5ErkJggg=="
                />
                <h1 className="font-semibold mb-2">Acerca de</h1>
                <textarea
                  defaultValue={user.description === null ? '' : user.description.replace(/<br\s*\/?>/gm, '\n')}
                  className="resize-none shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="text"
                  rows="6"
                  type="text"
                  name="description"
                  placeholder=""
                  onChange={onChange}
                ></textarea>
                <div className="mt-2">
                  <button
                    className="bg-blue-500 text-white font-bold py-2 mr-2 px-2 rounded focus:outline-none focus:shadow-outline"
                    type="submit"
                  >
                    Guardar
                  </button>
                  <button
                    className="text-blue-500 font-bold py-2 px-2 rounded focus:outline-none focus:shadow-outline"
                    onClick={() => dispatch({ type: 'EDIT', edit: 0 })}
                  >
                    Cancelar
                  </button>
                </div>
              </div>
              <div className="xl:w-1/5 lg:w-1/5"></div>
            </div>
          </form>
        </div>
      );
    }
  }

  return <div>{something(edit)}</div>;
}
