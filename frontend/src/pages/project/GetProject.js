import React, { useReducer, useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { getProject, getCommentsProject, deleteProject, updateProject } from '../../http/projectService';
import { Project } from '../../components/Project';

export function GetProject({ match }) {
  function projectReducer(state, action) {
    switch (action.type) {
      case 'GET_PROJECT_SUCCESS':
        return { ...state, edit: action.edit };
      case 'DELETE_PROJECT':
        return { ...state, project: action.project };
      case 'UPDATE_PROJECT':
        return { ...state, edit: action.edit };

      default:
        return state;
    }
  }
  const [project, setProject] = useState(null);
  const [comments, setComments] = useState(null);

  const history = useHistory();

  const [state, dispatch] = useReducer(projectReducer, {
    edit: 0
  });

  let promiseProject = getProject(match.params.projectId);
  let promiseComments = getCommentsProject(match.params.projectId);

  useEffect(() => {
    promiseProject.then((response) => setProject(response.data.data));

    promiseComments.then((response) => setComments(response.data.data));
  }, []);

  const handleDeleteProject = (project) => {
    deleteProject(project).then(() => {
      dispatch({ type: 'DELETE_', project });
      history.push('/projects');
    });
  };
  if (project === null) {
    return (
      <div class="w-full h-full fixed block top-0 left-0 bg-white opacity-75 z-50">
        <span class="text-green-500 opacity-75 top-1/2 my-0 mx-auto block relative w-0 h-0 top-50">
          <i class="fas fa-circle-notch fa-spin fa-5x"></i>
        </span>
      </div>
    );
  } else {
    return (
      <Project
        project={project}
        comments={comments}
        projectId={match.params.projectId}
        onUpdateProject={state.edit}
        dispatch={dispatch}
        onDeleteProject={(project) => handleDeleteProject(project)}
      />
    );
  }
}
