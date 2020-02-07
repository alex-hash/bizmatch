import React, { useReducer, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { getForum, getCommentsForum } from '../http/forumService';
import { Forum } from '../components/Forum';


export function GetForum({ match }) {
  

  function forumReducer(state, action) {
    switch (action.type) {
      case 'GET_FORUM_SUCCESS':
        return { ...state, forum: action.forum };
      default:
        return state;
    }
  }

  const [state, dispatch] = useReducer(forumReducer, {
    forum: [],
  });

  useEffect(() => {
    getForum(match.params.forumId).then( (response) => {dispatch({ type: 'GET_FORUM_SUCCESS', forum: response.data.data })});
  }, []);


  return (
    <Forum forum={state.forum} />
  );
}
