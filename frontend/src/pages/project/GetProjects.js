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
      getProjects(match.params.userId)
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
  }, []);

  return <ProjectList projects={state.projects} />;
}
