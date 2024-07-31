import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Login from './pages/Login';
import { RootState } from './store';
import { authActions } from './store/auth';
import { getUsernameFromToken, isTokenValid } from './utils/auth';

type ProtectedRouteProps = {
  element: JSX.Element;
};

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ element }) => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token && isTokenValid(token)) {
      const username = getUsernameFromToken(token);
      if (username) {
        dispatch(authActions.login({ user: username }));
      }
    }
  }, [dispatch, isAuthenticated]);

  return isAuthenticated ? element : <Login />;
};

export default ProtectedRoute;