import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { PrivateRoute } from './components/PrivateRoute';
import { AuthProvider } from './context/auth-context';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { User } from './pages/User';
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
          <PrivateRoute exact path="/account" allowedRoles={['admin', 'E', 'M']}>
            <User />
          </PrivateRoute>
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
          <Route path="/user/:userId" component={User}></Route>
          <Route path="/user">
            <User />
          </Route>
        </Switch>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
