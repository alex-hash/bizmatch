import React, { useReducer, useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { getProject, getCommentsProject, deleteProject, updateProject, getAssesmentUser, getAssesmentAvg } from '../../http/projectService';
import { Project } from '../../components/Project';
import { useAuth } from '../../context/auth-context';
import Swal from 'sweetalert2';

export function GetProject({ match }) {
  function projectReducer(state, action) {
    switch (action.type) {
      case 'GET_PROJECT_SUCCESS':
        return { ...state, edit: action.edit };

      default:
        return state;
    }
  }

  const { role } = useAuth();
  const [project, setProject] = useState(null);
  const [comments, setComments] = useState(null);
  const [assesment, setAssesment] = useState(null);
  const [assesmentAvg, setAssesmentAvg] = useState(null);

  const history = useHistory();

  const [state, dispatch] = useReducer(projectReducer, {
    edit: 0
  });

  let promiseProject = getProject(match.params.projectId);
  let promiseComments = getCommentsProject(match.params.projectId);
  let promiseAssement = getAssesmentUser(match.params.projectId);
  let promiseAssementAvg = getAssesmentAvg(match.params.projectId);

  useEffect(() => {
    if(role){
      Promise.all([promiseProject, promiseComments, promiseAssement, promiseAssementAvg]).then((response) => {
        setProject(response[0].data.data);
        setComments(response[1].data.data);
        if(response[2].data.data !== undefined){
          setAssesment(response[2].data.data.type);
        }
        if(response[3].data.data.avg !== null){
          setAssesmentAvg(response[3].data.data);
        }
      }).catch((error) => {
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
      Promise.all([promiseProject, promiseComments, promiseAssementAvg]).then((response) => {
        setProject(response[0].data.data);
        setComments(response[1].data.data);
        if(response[2].data.data.avg !== null){
          setAssesmentAvg(response[2].data.data);
        }
      }).catch((error) => {
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

  const handleDeleteProject = (project) => {
    deleteProject(project).then(() => {
      dispatch({ type: 'DELETE_', project });
      history.push('/projects');
    });
  };
  if (project === null || comments === null) {
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
        assesment={assesment}
        assesmentAvg={assesmentAvg}
        onDeleteProject={(project) => handleDeleteProject(project)}
      />
    );
  }
}
