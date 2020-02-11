import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { PrivateRoute } from './components/PrivateRoute';
import { AuthProvider } from './context/auth-context';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { User } from './pages/User';
import { CreateForum } from './pages/forum/CreateForum';
import { GetForums } from './pages/forum/GetForums';
import { GetForum } from './pages/forum/GetForum';
import { GetForumsFilter } from './pages/forum/GetForumsFilter';
import { EditeForum } from './pages/forum/EditeForum';
import { CreateProject } from './pages/project/CreateProject';
import { GetProjects } from './pages/project/GetProjects';
import { GetProject } from './pages/project/GetProject';
import { GetProjectsFilter } from './pages/project/GetProjectsFilter';
import { EditeProject } from './pages/project/EditeProject';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Switch>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/register">
            <Register />
          </Route>
          <Route path="/user">
            <User />
          </Route>
          <PrivateRoute exact path="/account" allowedRoles={['admin', 'E', 'M']}>
            <User />
          </PrivateRoute>
          <Route path="/create-forum">
            <CreateForum />
          </Route>
          <Route exact path="/">
            <GetForums />
          </Route>
          <Route path="/forum/:forumId" component={GetForum}></Route>
          <Route path="/forums/:category" component={GetForumsFilter}></Route>
          <Route exact path="/edite-forum">
            <EditeForum />
          </Route>
          <Route path="/create-project">
            <CreateProject />
          </Route>
          <Route exact path="/projects">
            <GetProjects />
          </Route>
          <Route path="/project/:projectId" component={GetProject}></Route>
          <Route path="/projects/:category" component={GetProjectsFilter}></Route>
          <Route exact path="/edite-project">
            <EditeProject />
          </Route>
        </Switch>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
