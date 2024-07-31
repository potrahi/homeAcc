import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Login from './pages/Login';
import { RootState } from './store';
import { authActions } from './store/auth';
import { getUserIdFromToken, getUsernameFromToken, isTokenValid } from './utils/auth';

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
      const user_id = getUserIdFromToken(token);
      if (username) {
        dispatch(authActions.login({ user: username }));
      }
      if (user_id) {
        dispatch(authActions.setUserId({ user_id }));
      }
    }
  }, [dispatch, isAuthenticated]);

  return isAuthenticated ? element : <Login />;
};

export default ProtectedRoute;