import React, { useEffect, useReducer } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { getProjectsFilter } from '../../http/projectService';
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

export function GetProjectsFilter({ match }) {
  const [state, dispatch] = useReducer(projectsReducer, {
    projects: [],
    selectedProject: null
  });

  useEffect(() => {
    getProjectsFilter(match.params.category).then((response) =>
      dispatch({ type: 'GET_PROJECTS_SUCCESS', initialProjects: response.data })
    );
  }, []);

  return <ProjectList projects={state.projects} />;
}
