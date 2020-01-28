import React, { useContext, useState } from 'react';
import jwt_decode from 'jwt-decode';

const AuthContext = React.createContext();

const storedUser = JSON.parse(localStorage.getItem('currentUser'));

export function AuthProvider({ children }) {
  const [role, setRole] = useState(jwt_decode(storedUser.accessToken));
  const [currentUser, setCurrentUser] = useState(storedUser);
  return (
    <AuthContext.Provider
      value={{
        role,
        setRole,
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
