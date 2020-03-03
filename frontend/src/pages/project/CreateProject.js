import React from 'react';
import Navbar from '../../components/Navbar';
import { useForm } from 'react-hook-form';
import { addProject } from '../../http/projectService';
import { useAuth } from '../../context/auth-context';
import { useHistory } from 'react-router-dom';
import Swal from 'sweetalert2';

export function CreateProject() {
  const { handleSubmit, register, errors, formState } = useForm({
    mode: 'onBlur'
  });
  const history = useHistory();
  const { role } = useAuth();

  const onSubmit = (projectData, e) => {
    e.preventDefault();
    projectData.text = projectData.text.replace(/\n/g, '<br />');
    addProject({ projectData })
      .then(() => {
        Swal.fire('Genial!', 'Has creado un proyecto, si quieres añadir una foto o editarlo pincha sobre el');
        history.push('/projects');
      })
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
  };
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
                ref={register({
                  required: '*El título es necesario',
                  maxLength: {
                    message: '*El título no debe exceder los 60 caracteres',
                    value: 60
                  }
                })}
                className=" shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="title"
                type="text"
                name="title"
                placeholder=""
              />
              {errors.title && <span className="error-validate">{errors.title.message}</span>}
            </div>
            <div className="mb-4">
              <label className="block text-gray-800 text-md font-bold" for="subtitle">
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
                className=" shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
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
                className="form-select shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
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
              <label className="block text-gray-700 text-sm font-bold" for="ubication">
                Ubicación
              </label>
              <p className="text-sm text-gray-700 mb-2"></p>
              <select
                ref={register}
                className=" form-select shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="ubication"
                type="text"
                name="ubication"
                placeholder=""
              >
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
                className="md:text-lg h-64  resize-none shadow appearance-none border rounded w-full py-2 px-3 text-gray-800 leading-tight focus:outline-none focus:shadow-outline"
                id="text"
                rows="6"
                type="text"
                name="text"
                placeholder=""
              ></textarea>
              {errors.text && <span className="error-validate">{errors.text.message}</span>}
            </div>
            <div className="mt-8 flex items-center justify-center">
              <button
                className=" bg-button text-white font-bold py-2 px-8 rounded focus:outline-none focus:shadow-outline"
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
