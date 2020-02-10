import React, { useEffect, useReducer } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { getForumsFilter } from '../http/forumService';
import { useAuth } from '../context/auth-context';
import { ForumList } from '../components/ForumList';

function forumsReducer(state, action) {
  switch (action.type) {
    case 'GET_FORUMS_SUCCESS':
      return { ...state, forums: action.initialForums };
    case 'SELECT_FORUM':
      return { ...state, selectedForum: action.index };
    default:
      return state;
  }
}

export function GetForumsFilter({match}) {
  const { handleSubmit, register, errors, formState } = useForm({
    mode: 'onBlur'
  });
  const { currentUser, setCurrentUser, setIsAuthenticated } = useAuth();
  const history = useHistory();
  const [state, dispatch] = useReducer(forumsReducer, {
    forums: [],
    selectedForum: null
  });

  useEffect(() => {
    getForumsFilter(match.params.category).then((response) => dispatch({ type: 'GET_FORUMS_SUCCESS', initialForums: response.data }));
  }, []);

  return (
    <ForumList
      forums={state.forums}
    />
  );
}
