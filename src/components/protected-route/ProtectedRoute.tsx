import { Navigate, Outlet } from 'react-router-dom';
import useAuth from '../../hooks/api/use-auth/useAuth';

const ProtectedRoute = () => {
  // TODO: Use authentication token
  // TODO: Implement actual login logic brotha
  let isLoggedIn = false;
  const auth = useAuth();
  if (auth.user) {
    isLoggedIn = true;
  } else {
    isLoggedIn = false;
  }
  return isLoggedIn ? <Outlet /> : <Navigate to='/login' replace />;
};

export default ProtectedRoute;
