import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from './store';
import Login from './pages/Login';

type ProtectedRouteProps = {
  element: JSX.Element;
};

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ element }) => {
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
  return isAuthenticated ? element : <Login />;
};

export default ProtectedRoute;