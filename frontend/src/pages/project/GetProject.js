import React, { useReducer, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { getProject, deleteProject } from '../../http/projectService';
import { Project } from '../../components/Project';

export function GetProject({ match }) {
  function projectReducer(state, action) {
    switch (action.type) {
      case 'GET_PROJECT_SUCCESS':
        return { ...state, project: action.forum };
      default:
        return state;
    }
  }

  const history = useHistory();

  const [state, dispatch] = useReducer(projectReducer, {
    project: []
  });

  useEffect(() => {
    getProject().then((response) => dispatch({ type: 'GET_PROJECT_SUCCESS', project: response.data }));
  }, []);
  const handleDeleteProject = (project) => {
    deleteProject(project).then(() => {
      history.push('/');
    });
  };

  return (
    <Project
      project={state.project}
      projectId={match.params.projectId}
      onDeleteProject={(project) => handleDeleteProject(project)}
    />
  );
}
