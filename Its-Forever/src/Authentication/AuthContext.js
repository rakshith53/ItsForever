import React, { createContext, useState, useEffect } from 'react';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const userType = sessionStorage.getItem('userType');

  useEffect(() => {
    const checkAuth = () => {
      console.log(userType)
      setIsAuthenticated((prev) => !prev);
      console.log(isAuthenticated)
    };

    checkAuth(); 

    window.addEventListener('storage', checkAuth);

    return () => {
      window.removeEventListener('storage', checkAuth);
    };
  }, [userType]);

  return (
    <AuthContext.Provider value={{ isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
