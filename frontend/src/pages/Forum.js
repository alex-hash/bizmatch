import Navbar from '../components/Navbar';
import React, { useEffect, useReducer } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { getForums, getForum, addForum, deleteForum, updateForum } from '../http/forumService';
import { useAuth } from '../context/auth-context';
import { ForumList } from '../components/ForumList';
import { Forum } from '../components/Forum';

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
    <React.Fragment>
      <main>
        <div>
          <div>
            <Navbar />
          </div>
          <div className="ml-200p mt-nav bg-white md:bg-green-400 md:h-full">
            <div className="flex flex-wrap justify-center">
              <div className="md:w-2/3 flex flex-wrap justify-end">
                <Link to="/create-forum">
                  <button className="relative bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded my-2 justify-end">
                    Crear nuevo tema
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
        <ForumList
          forums={state.forums}
          selectedIndex={state.selectedForum}
          onSelectForum={(index) => {
            dispatch({ type: 'SELECT_FORUM', index });
          }}
        />

        {state.selectedForum === null && <h3 className="">Select a forum to start previewing and edxiting</h3>}

        {state.selectedForum !== null && <Forum defaultForum={state.forums[state.selectedForum]} />}

        {state.selectedForum !== null && (
          <button
            onClick={() => {
              dispatch({ type: 'SELECT_FORUM', index: null });
            }}
          >
            Back
          </button>
        )}
      </main>
    </React.Fragment>
  );
}
