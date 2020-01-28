import React, { useContext, useState } from 'react';
import {jwt_decode} from 'jsonwebtoken';

const AuthContext = React.createContext();
const storedUser = JSON.parse(localStorage.getItem('currentUser'));

export function AuthProvider({ children }) {
  // const [role, setRole] = useState(jwt_decode(storedUser.token));
  if(storedUser!=null){
    
  }
  const [isAuthenticated, setIsAuthenticated] = useState(storedUser !== null);
  const [currentUser, setCurrentUser] = useState(storedUser);

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        setIsAuthenticated,
        currentUser,
        setCurrentUser
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  return context;
}
