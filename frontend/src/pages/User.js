import React, { useState, useEffect, useReducer } from 'react';
import { useAuth } from '../context/auth-context';
import { getProfile, getProfileOther, getProjects, getComments, getAvg } from '../http/userService';
import { UserRender } from '../components/User';

export function User({ match }) {
  const { role, setRole, setCurrentUser } = useAuth();
  const [user, setUser] = useState(null);
  const [projects, setProjects] = useState(null);
  const [comments, setComments] = useState(null);
  const [avg, setAvg] = useState(null);

  function userReducer(state, action) {
    switch (action.type) {
      case 'EDIT':
        return { ...state, edit: action.edit };
      default:
        return state;
    }
  }
  const [state, dispatch] = useReducer(userReducer, {
    edit: 0
  });

  useEffect(() => {
    if (match === undefined) {
      Promise.all([
        getProfile().then((response) => setUser(response.data)),
        getProjects().then((response) => setProjects(response.data)),
        getComments().then((response) => setComments(response.data.data)),
        getAvg().then((response) => setAvg(response.data.data))
      ]).catch((error) => {
        if (error.response.status === 401) {
          setRole(null);
          setUser(null);
          setCurrentUser(null);
          window.localStorage.clear();
        }
      });
    } else {
      Promise.all([
        getProfileOther(match.params.userId).then((response) => setUser(response.data)),
        getProjects(match.params.userId).then((response) => setProjects(response.data)),
        getComments(match.params.userId).then((response) => setComments(response.data.data)),
        getAvg(match.params.userId).then((response) => setAvg(response.data.data))
      ]).catch((error) => {
        if (error.response.status === 401) {
          setRole(null);
          setUser(null);
          setCurrentUser(null);
          window.localStorage.clear();
        }
      });
    }
  }, []);

  if (user === null || projects === null || comments === null || avg === null) {
    return (
      <div className="w-full h-full fixed block top-0 left-0 bg-white opacity-75 z-50">
        <span className="text-green-500 opacity-75 top-1/2 my-0 mx-auto block relative w-0 h-0 top-50">
          <i className="fas fa-circle-notch fa-spin fa-5x"></i>
        </span>
      </div>
    );
  } else {
    return (
      <UserRender
        user={user}
        projects={projects}
        comments={comments}
        edit={state.edit}
        dispatch={dispatch}
        role={role}
        avg={avg}
      />
    );
  }
}
