import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { PrivateRoute } from './components/PrivateRoute';
import { AuthProvider } from './context/auth-context';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { User } from './pages/User';
import { ResetPassword } from './pages/ResetPassword';
import { CreateProject } from './pages/project/CreateProject';
import { GetProjects } from './pages/project/GetProjects';
import { GetProject } from './pages/project/GetProject';
import { GetProjectsFilter } from './pages/project/GetProjectsFilter';
import { EditeProject } from './pages/project/EditeProject';
import { GetProjectsInit } from './pages/project/GetProjectsInit';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Switch>
          <Route exact path="/">
            <GetProjectsInit />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/register">
            <Register />
          </Route>
          <Route path="/password">
            <ResetPassword />
          </Route>
          <PrivateRoute exact path="/user" allowedRoles={['admin', 'E', 'M']}>
            <User />
          </PrivateRoute>
          <PrivateRoute exact path="/create-project" allowedRoles={['admin', 'E']}>
            <CreateProject />
          </PrivateRoute>
          <PrivateRoute exact path="/projects" allowedRoles={['admin', 'E', 'M']}>
            <GetProjects />
          </PrivateRoute>
          <Route path="/project/:projectId" component={GetProject}></Route>
          <Route path="/projects/:category" component={GetProjectsFilter}></Route>
          <Route exact path="/edite-project">
            <EditeProject />
          </Route>
          <Route path="/user/:userId" component={User}></Route>
        </Switch>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
