import React, { useReducer, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { getForum, getCommentsForum, deleteForum } from '../http/forumService';
import { Forum } from '../components/Forum';

export function GetForum({ match }) {
  function forumReducer(state, action) {
    switch (action.type) {
      case 'GET_FORUM_SUCCESS':
        return { ...state, forum: action.forum, comments: action.comments };
      default:
        return state;
    }
  }

  const history = useHistory();

  const [state, dispatch] = useReducer(forumReducer, {
    forum: [],
    comments: []
  });

  let promiseforum = getForum(match.params.forumId);
  let promisecomments = getCommentsForum(match.params.forumId);

  useEffect(() => {
    Promise.all([promiseforum, promisecomments]).then((response) =>
      dispatch({ type: 'GET_FORUM_SUCCESS', forum: response[0].data.data, comments: response[1].data.data })
    );
  }, []);
  const handleDeleteForum = (forum) => {
    deleteForum(forum).then(() => { history.push("/");
    });
  };
  
  return (
    <Forum forum={state.forum} comments={state.comments} forumId={match.params.forumId} onDeleteForum={(forum) => handleDeleteForum(forum)}/>
  );
}
