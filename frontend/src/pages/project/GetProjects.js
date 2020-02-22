import React, { useEffect, useReducer } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { getProjects } from '../../http/projectService';
import { useAuth } from '../../context/auth-context';
import { ProjectList } from '../../components/ProjectList';
import Swal from 'sweetalert2';

function projectsReducer(state, action) {
  switch (action.type) {
    case 'GET_PROJECTS_SUCCESS':
      return { ...state, projects: action.initialProjects };
    case 'SELECT_PROJECT':
      return { ...state, selectedProject: action.index };
    case 'SEARCH_TEXT_CHANGED':
      return { ...state, searchText: action.text };
    default:
      return state;
  }
}

export function GetProjects({match}) {
  const { handleSubmit, register, errors, formState } = useForm({
    mode: 'onBlur'
  });
  const { currentUser, setCurrentUser, setIsAuthenticated } = useAuth();
  const history = useHistory();
  const [state, dispatch] = useReducer(projectsReducer, {
    projects: [],
    selectedProject: null,
    searchText: ''
  });

  useEffect(() => {
    if(match === undefined){
      getProjects().then((response) => dispatch({ type: 'GET_PROJECTS_SUCCESS', initialProjects: response.data })).catch((error) => {
        if(error.response.status === 401){
          window.localStorage.clear();
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Tú token de sesión ha expirado'
          });
          window.location.href="/";
        }
      });
    }else{
      getProjects(match.params.userId).then((response) => dispatch({ type: 'GET_PROJECTS_SUCCESS', initialProjects: response.data })).catch((error) => {
        if(error.response.status === 401){
          window.localStorage.clear();
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Tú token de sesión ha expirado'
          });
          window.location.href="/";
        }
      });
    }
    
  }, []);

  return (
    <ProjectList
      projects={state.projects}
      searchText={state.searchText}
      onSearchTextChanged={(text) => dispatch({ type: 'SEARCH_TEXT_CHANGED', text })}
    />
  );
}
