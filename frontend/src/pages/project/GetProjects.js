import React, { useEffect, useReducer } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { getProjects } from '../../http/projectService';
import { useAuth } from '../../context/auth-context';
import { ProjectList } from '../../components/ProjectList';

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

export function GetProjects() {
  const { handleSubmit, register, errors, formState } = useForm({
    mode: 'onBlur'
  });
  const { currentUser, setCurrentUser, setIsAuthenticated } = useAuth();
  const history = useHistory();
  const [state, dispatch] = useReducer(projectsReducer, {
    projects: [],
    selectedProject: null
  });

  useEffect(() => {
    getProjects().then((response) => dispatch({ type: 'GET_PROJECTS_SUCCESS', initialProjects: response.data }));
  }, []);
  return <ProjectList projects={state.projects} />;
}
