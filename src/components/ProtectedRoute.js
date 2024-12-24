import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ element, ...rest }) => {
  const isAuthenticated = localStorage.getItem('token') !== null; // Check for authentication

  return isAuthenticated ? element : <Navigate to="/" replace />;
};

export default ProtectedRoute;
