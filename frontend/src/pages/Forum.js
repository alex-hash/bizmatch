import React, { useEffect, useReducer } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { getForums } from '../http/forumService';
import { useAuth } from '../context/auth-context';
import { ForumList } from '../components/ForumList';
import { GetForum } from '../pages/GetForum';

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

export function ForumDashboard() {
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
    getForums().then((response) => dispatch({ type: 'GET_FORUMS_SUCCESS', initialForums: response.data }));
  }, []);

  return (
    <ForumList
      forums={state.forums}
      selectedIndex={state.selectedForum}
      onSelectForum={(index) => {
        dispatch({ type: 'SELECT_FORUM', index });
      }}
    />
  );
}
/* quiero pasarle esto a la función GetForum de la página get forum, en plan al seleccionar algo pasarle los datos
si nó se hace así descarta la rama y pregunto y vuelvo a empezar de cero.
{
state.selectedForum !== null && (
  GetForum()
    defaultForum={state.forums[state.selectedForum]}
    
)
}*/
