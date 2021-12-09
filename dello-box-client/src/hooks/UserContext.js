import React, { useState, useEffect, createContext } from 'react';
import authenticationService from '../services/authenticationService';

export const UserContext = createContext({
  user: null,
  setUser: (user) => {},
  isAuthenticated: false,
  setIsAuthenticated: (isAuthenticated) => {},
  logout: () => {}
});

export const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  const logoutHandler = async () => {
    const data = await authenticationService.logout();
    setIsAuthenticated(data.isAuthenticated);
    setUser(data.user);
  };

  useEffect(() => {
    authenticationService.isAuthenticated().then((data) => {
      setUser(data.user);
      setIsAuthenticated(data.isAuthenticated);
      setIsLoaded(true);
    });
  }, [setIsAuthenticated]);

  const contextValue = {
    user: user,
    setUser: setUser,
    isAuthenticated: isAuthenticated,
    setIsAuthenticated: setIsAuthenticated,
    logout: logoutHandler
  };

  return <div>{!isLoaded ? null : <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>}</div>;
};
