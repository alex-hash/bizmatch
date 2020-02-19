import React, { useReducer, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { getProject, getCommentsProject, deleteProject, updateProject } from '../../http/projectService';
import { Project } from '../../components/Project';

export function GetProject({ match }) {
  function projectReducer(state, action) {
    switch (action.type) {
      case 'GET_PROJECT_SUCCESS':
        return { ...state, project: action.project, comments: action.comments };
      case 'DELETE_PROJECT':
        return { ...state, project: action.project };
      case 'UPDATE_PROJECT':
        return { ...state, project: action.project };

      default:
        return state;
    }
  }

  const history = useHistory();

  const [state, dispatch] = useReducer(projectReducer, {
    project: [],
    comments: [],
    edit: 0
  });

  let promiseProject = getProject(match.params.projectId);
  let promiseComments = getCommentsProject(match.params.projectId);

  useEffect(() => {
    Promise.all([promiseProject, promiseComments]).then((response) => {
      dispatch({ type: 'GET_PROJECT_SUCCESS', project: response[0].data.data, comments: response[1].data.data });
    });
  }, []);

  const handleDeleteProject = (project) => {
    deleteProject(project).then(() => {
      dispatch({ type: 'DELETE_', project });
      history.push('/projects');
    });
  };

  return (
    <Project
      project={state.project}
      comments={state.comments}
      projectId={match.params.projectId}
      onUpdateProject={state.edit}
      dispatch={dispatch}
      onDeleteProject={(project) => handleDeleteProject(project)}
    />
  );
}
