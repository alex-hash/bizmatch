import React from 'react';
import Navbar from '../components/Navbar';
import { Link, useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useAuth } from '../context/auth-context';

export function Project({ project, projectId, onDeleteProject, onEditeProject }) {
  const { handleSubmit, register, errors, watch, formState, setError, setValue, reset } = useForm({
    mode: 'onBlur'
  });

  const { role } = useAuth();

  const history = useHistory();

  return (
    <div>
      <div>
        <Navbar />
      </div>
      <div className="ml-200p mt-nav bg-white md:bg-green-400 md:h-screen">
        <div className="md:bg-green-400 flex flex-wrap justify-center md:items-center">
          {project.map((project, index) => (
            <div key={project.id} className="md:w-2/3 break-all w-full rounded bg-white md:mx-8 md:mt-20">
              <div className="px-6 py-4">
                <div className="font-bold text-xl tracking-wide">{project.title}</div>
                <div className="text-gray-500 text-sm mb-3">{project.category}</div>
                <p className="text-gray-700 text-base">{project.text}</p>
              </div>
              <div className="text-xs flex flex-wrap justify-end p-3">
                <Link
                  to={{
                    pathname: '/edite-forum',
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
      </div>
    </div>
  );
}
