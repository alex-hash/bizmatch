import React from 'react';
import { BrowserRouter, Switch, Route} from 'react-router-dom';
import { Login } from './pages/Login';
import { User } from './pages/User';
import { CreateForum } from './pages/CreateForum'
import { EditeForum } from './pages/EditeForum'
import { Register } from './pages/Register';
import { GetForum } from './pages/GetForum';
import { ForumDashboard } from './pages/Forum';
import { AuthProvider } from './context/auth-context';
import { PrivateRoute } from './components/PrivateRoute';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Switch>
          <Route exact path="/">
            <ForumDashboard />
          </Route>
          <Route exact path="/edite-forum">
            <EditeForum />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/register">
            <Register />
          </Route>
          <Route path="/create-forum">
            <CreateForum />
          </Route>
          <Route path="/forum">
            <GetForum />
          </Route>
        </Switch>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
