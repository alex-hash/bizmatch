import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import { PrivateRoute } from './components/PrivateRoute';
import { AuthProvider } from './context/auth-context';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { User } from './pages/User';
import { ResetPassword } from './pages/ResetPassword';
import { CreateProject } from './pages/project/CreateProject';
import { GetProjects } from './pages/project/GetProjects';
import { GetProject } from './pages/project/GetProject';
import { GetProjectsInit } from './pages/project/GetProjectsInit';
import { notFound } from './components/Notfound';

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
          <PrivateRoute
            path="/projects/:userId"
            component={GetProjects}
            allowedRoles={['admin', 'E', 'M']}
          ></PrivateRoute>
          <PrivateRoute path="/user/:userId" component={User} allowedRoles={['admin', 'E', 'M']}></PrivateRoute>
          <Route path="/404" component={notFound} />
          <Redirect to="/404" />
        </Switch>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
