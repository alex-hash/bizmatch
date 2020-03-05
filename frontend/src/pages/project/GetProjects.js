import React, { useEffect, useReducer } from 'react';
import { getProjects } from '../../http/projectService';
import { ProjectList } from '../../components/ProjectList';
import Swal from 'sweetalert2';

function projectsReducer(state, action) {
  switch (action.type) {
    case 'GET_PROJECTS_SUCCESS':
      return { ...state, projects: action.initialProjects };
    case 'SELECT_PROJECT':
      return { ...state, selectedProject: action.index };
    default:
      return state;
  }
}

export function GetProjects({ match }) {
  const [state, dispatch] = useReducer(projectsReducer, {
    projects: [],
    selectedProject: null
  });

  useEffect(() => {
    if (match === undefined) {
      getProjects()
        .then((response) => dispatch({ type: 'GET_PROJECTS_SUCCESS', initialProjects: response.data }))
        .catch((error) => {
          if (error.response.status === 401) {
            localStorage.removeItem('currentUser');
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
      getProjects(match.params.userId)
        .then((response) => dispatch({ type: 'GET_PROJECTS_SUCCESS', initialProjects: response.data }))
        .catch((error) => {
          if (error.response.status === 401) {
            localStorage.removeItem('currentUser');
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
  }, []);


  if (state.projects === null) {
    return (
      <div className="w-full h-full fixed block top-0 left-0 bg-background-primary opacity-75 z-50">
        <span className="text-green-500 opacity-75 top-1/2 my-0 mx-auto block relative w-0 h-0 top-50">
          <i className="fas fa-circle-notch fa-spin fa-5x"></i>
        </span>
      </div>
    );
  }

  return <ProjectList projects={state.projects} dispatch={dispatch}/>;
}