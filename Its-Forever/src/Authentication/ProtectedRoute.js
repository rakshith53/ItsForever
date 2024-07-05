import React, { useContext } from 'react';
import { Navigate, Outlet, useParams } from 'react-router-dom';
import { AuthContext } from './AuthContext';

const ProtectedRoute = () => {
  const { isAuthenticated } = useContext(AuthContext);
  const userType = sessionStorage.getItem('userType');
  const {id} = useParams();

  if (userType === null) {
    return <Navigate to={`/${id}/login`} replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
