import React from 'react';
import Navbar from '../components/Navbar';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/auth-context';
import { useForm } from 'react-hook-form';
import { getFilterProjects } from '../http/projectService';
import Swal from 'sweetalert2';

export function ProjectList({ projects, searchText, onSearchTextChanged, dispatch}) {
  const { role } = useAuth();
  const { handleSubmit, register, errors, formState } = useForm({
    mode: 'onBlur'
  });

  const onSubmit = (filterData) => {
    console.log(filterData)
    getFilterProjects(filterData)
    .then((response) => dispatch({ type: 'GET_PROJECTS_SUCCESS', initialProjects: response.data }))
    .catch((error) => {
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

  function projectsClean(){
    if(projects.length === 0){
      return(
        <div>
          <h1 className="font-semibold italic">Todavía no hay proyectos. Tú puedes ser el primero en crear uno</h1>
        </div>
      )
    }
  }

  return (
    <div className="min-h-screen">
      <div>
        <Navbar role={role} />
      </div>
      <form className="mt-16 flex flex-col items-center md:flex-wrap md:flex-row md:justify-center" onSubmit={handleSubmit(onSubmit)} noValidate>
        <h1 className="font-bold self-center px-4">Filtrar proyectos por</h1>
        <div className="px-4 mt-2 md:mt-0">
          <select ref={register} className="form-select p-4" id="category" type="text" name="category">
            <option selected value="Nada">Categoría</option>
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
        </div>
        <div className="px-4 mt-2 md:mt-0">
          <select ref={register} className="form-select p-4" name="location" id="location">
            <option selected value="Nada">Localización</option>
            <option value='Álava'>Álava</option>
            <option value='Albacete'>Albacete</option>
            <option value='Alicante'>Alicante</option>
            <option value='Almería'>Almería</option>
            <option value='Asturias'>Asturias</option>
            <option value='Ávila'>Ávila</option>
            <option value='Badajoz'>Badajoz</option>
            <option value='Barcelona'>Barcelona</option>
            <option value='Burgos'>Burgos</option>
            <option value='Cáceres'>Cáceres</option>
            <option value='Cádiz'>Cádiz</option>
            <option value='Cantabria'>Cantabria</option>
            <option value='Castellón'>Castellón</option>
            <option value='Ceuta'>Ceuta</option>
            <option value='Ciudad Real'>Ciudad Real</option>
            <option value='Córdoba'>Córdoba</option>
            <option value='Cuenca'>Cuenca</option>
            <option value='Girona'>Girona</option>
            <option value='Las Palmas'>Las Palmas</option>
            <option value='Granada'>Granada</option>
            <option value='Guadalajara'>Guadalajara</option>
            <option value='Guipúzcoa'>Guipúzcoa</option>
            <option value='Huelva'>Huelva</option>
            <option value='Huesca'>Huesca</option>
            <option value='Illes Balears'>Illes Balears</option>
            <option value='Jaén'>Jaén</option>
            <option value='A Coruña'>A Coruña</option>
            <option value='La Rioja'>La Rioja</option>
            <option value='León'>León</option>
            <option value='Lleida'>Lleida</option>
            <option value='Lugo'>Lugo</option>
            <option value='Madrid'>Madrid</option>
            <option value='Málaga'>Málaga</option>
            <option value='Melilla'>Melilla</option>
            <option value='Murcia'>Murcia</option>
            <option value='Navarra'>Navarra</option>
            <option value='Ourense'>Ourense</option>
            <option value='Palencia'>Palencia</option>
            <option value='Pontevedra'>Pontevedra</option>
            <option value='Salamanca'>Salamanca</option>
            <option value='Segovia'>Segovia</option>
            <option value='Sevilla'>Sevilla</option>
            <option value='Soria'>Soria</option>
            <option value='Tarragona'>Tarragona</option>
            <option value='Santa Cruz de Tenerife'>Santa Cruz de Tenerife</option>
            <option value='Teruel'>Teruel</option>
            <option value='Toledo'>Toledo</option>
            <option value='Valencia'>Valencia</option>
            <option value='Valladolid'>Valladolid</option>
            <option value='Vizcaya'>Vizcaya</option>
            <option value='Zamora'>Zamora</option>
            <option value='Zaragoza'>Zaragoza</option>
          </select>
        </div>
        <div className="self-center px-4 mt-4 md:mt-0">
          <button
            type="submit"
            className="bg-button text-white font-bold p-4 rounded focus:outline-none focus:shadow-outline"
            disabled={formState.isSubmitting}
          >
            Filtrar
          </button>
        </div>
      </form>
      <div className="mt-16">
        <div className="px-4 sm:mx-10">
          <div className="block flex flex-wrap justify-center">
            {projectsClean()}
            {projects.map((project) => (
              <div className="w-full md:w-1/2 md:px-2 lg:w-1/3 mb-4" key={project.id}>
                <div className="bg-white rounded-lg overflow-hidden shadow">
                  <a href={'/project/' + project.id}>
                    <img
                      className="h-48 w-full object-cover object-center"
                      src={project.image_url}
                      alt="Foto de Proyecto"
                    />
                  </a>
                  <div className="p-4 h-auto md:h-48 mt-2">
                    <a href={'/project/' + project.id} className="text-gray-800 font-bold text-xl mb-2">
                      {project.title}
                    </a>
                    <div className="text-gray-600 text-sm leading-relaxed block md:text-xs lg:text-sm">
                      {project.subtitle}
                    </div>
                    <p class="text-gray-600 text-sm leading-relaxed block md:text-xs lg:text-sm">{project.category}</p>
                    <p class="text-sm leading-relaxed font-semibold block md:text-xs lg:text-sm">Valoración media: {project.avg === null ? "Sin valoración todavía" : Math.round(project.avg * 100) / 100 + " / " + project.counter + " opiniones"}</p>
                    <div className="flex items-center">
                      <Link
                        to={'/user/' + project.user}
                        className="mt-6 block h-12 w-12 rounded-full overflow-hidden border-2 border-gray-600 focus:outline-none focus:border-white"
                      >
                        <img className="h-full w-full object-cover" src={project.avatar_url} alt="Your avatar" />
                      </Link>
                      <div className="text-sm ml-4 pt-6">
                        <p className="text-gray-900 leading-none">{project.name + ' ' + project.first_name}</p>
                        <p className="text-gray-600">
                          {project.updated_at === null
                            ? project.created_at.replace('T', ' ').substring(0, 16)
                            : project.updated_at.replace('T', ' ').substring(0, 16)}
                        </p>
                      </div>
                      <div className="mt-2 lg:absolute bottom-0 mb-4 md:hidden lg:block"></div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
