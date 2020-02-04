import React from 'react';
import Navbar from '../components/Navbar';
import { useForm } from 'react-hook-form';
import { Link, useHistory } from 'react-router-dom';

export function CreateForum() {
  const { handleSubmit, register, errors, watch, formState, setError, setValue, reset } = useForm({
    mode: 'onBlur'
  });
  const history = useHistory();
  return (
    <div>
      <div>
        <Navbar /> 
      </div>
      <div className="ml-200p flex flex-wrap justify-center items-center h-screen">
          <form className="w-5/6 bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 mx-4" onSubmit={handleSubmit()} noValidate>
            <h1></h1>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" for="title">
                Título de la consulta
              </label>
              <input 
                ref={register({
                  required: '*El título es necesario',
                  maxLength: {
                    message: "*El título no debe exceder los 60 caracteres",
                    value: 60
                  },
                })}
                className="relative shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                id="title" 
                type="text" 
                name="title"
                placeholder="" />
                {errors.title && <span className="error-validate">{errors.title.message}</span>}
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" for="content">
                Contenido de la consulta
              </label>
              <textarea 
                ref={register({
                  required: '*El contenido es necesario',
                })}
                className="relative resize-none shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                id="content" 
                rows="6"
                type="text" 
                name="content"
                placeholder=""></textarea>
                {errors.content && <span className="error-validate">{errors.content.message}</span>}
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" for="category">
                Categoría
              </label>
              <select 
                ref={register({
                  required: '*La categoría es necesaria',
                })}
                className="relative shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                id="category" 
                type="text" 
                name="category"
                placeholder="">
                  <option value="E">Emprendedor</option>
                  <option value="M">Mentor</option>
                </select>
                {errors.category && <span className="error-validate">{errors.category.message}</span>}
            </div>
          </form>
      </div>
    </div>
  )
}