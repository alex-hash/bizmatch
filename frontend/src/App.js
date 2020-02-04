import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Login } from './pages/Login';
import { User } from './pages/User';
import { CreateForum } from './pages/CreateForum'
import { Register } from './pages/Register';
import { AuthProvider } from './context/auth-context';
import { PrivateRoute } from './components/PrivateRoute';


function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Switch>
          <Route exact path="/">
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/register">
            <Register />
          </Route>
          <PrivateRoute exact path="/account" allowedRoles={['admin', 'E', 'M']}>
            <User />
          </PrivateRoute>
          <Route path="/create-forum">
            <CreateForum />
          </Route>
        </Switch>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
