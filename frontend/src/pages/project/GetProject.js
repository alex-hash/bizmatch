import React, { useReducer, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { getProject, getCommentsProject, deleteProject } from '../../http/projectService';
import { Project } from '../../components/Project';

export function GetProject({ match }) {
  function projectReducer(state, action) {
    switch (action.type) {
      case 'GET_PROJECT_SUCCESS':
        return { ...state, project: action.project, comments: action.comments };
      default:
        return state;
    }
  }

  const history = useHistory();

  const [state, dispatch] = useReducer(projectReducer, {
    project: [],
    comments: []
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
      history.push('/projects');
    });
  };

  return (
    <Project
      project={state.project}
      comments={state.comments}
      projectId={match.params.projectId}
      onDeleteProject={(project) => handleDeleteProject(project)}
    />
  );
}
