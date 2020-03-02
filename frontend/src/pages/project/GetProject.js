import React, { useReducer, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { getProject, getCommentsProject, getAssesmentUser, getCommentAssesmentUser } from '../../http/projectService';
import { Project } from '../../components/Project';
import { useAuth } from '../../context/auth-context';
import Swal from 'sweetalert2';

export function GetProject({ match }) {
  function projectReducer(state, action) {
    switch (action.type) {
      case 'GET_PROJECT_SUCCESS':
        return { ...state, edit: action.edit };
      case 'UPDATE_PROJECT':
        return { ...state, edit: action.edit };

      default:
        return state;
    }
  }

  const { role } = useAuth();

  const [project, setProject] = useState(null);
  const [comments, setComments] = useState(null);
  const [assesment, setAssesment] = useState(null);
  const [assesmentC, setAssesmentC] = useState(null);

  const history = useHistory();

  const [state, dispatch] = useReducer(projectReducer, {
    edit: 0
  });

  useEffect(() => {
    if (role) {
      Promise.all([getProject(match.params.projectId), getCommentsProject(match.params.projectId), getAssesmentUser(match.params.projectId), getCommentAssesmentUser(match.params.projectId)])
        .then((response) => {
          setProject(response[0].data.data);
          setComments(response[1].data.data);
          if (response[2].data.data !== undefined) {
            setAssesment(response[2].data.data.type);
          }
          if (response[3].data.data !== undefined) {
            setAssesmentC(response[3].data.data)
          }else{
            setAssesmentC(0);
          }
        })
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
      Promise.all([getProject(match.params.projectId), getCommentsProject(match.params.projectId)])
        .then((response) => {
          setProject(response[0].data.data);
          setComments(response[1].data.data);
          setAssesmentC(0);
        })
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

  if (project === null || comments === null || assesmentC === null) {
    return (
      <div className="w-full h-full fixed block top-0 left-0 bg-white opacity-75 z-50">
        <span className="text-green-500 opacity-75 top-1/2 my-0 mx-auto block relative w-0 h-0 top-50">
          <i className="fas fa-circle-notch fa-spin fa-5x"></i>
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
        assesmentC={assesmentC}
      />
    );
  }
}
