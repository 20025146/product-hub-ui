import { useAuth } from '@/context/AuthContext';
import { ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';

interface ProtectedRouteProps {
  children: ReactNode;
}

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { isAuthenticated } = useAuth();
  const location = useLocation();
  if (!isAuthenticated) {
    // Redirect to login page but save the intended destination
    return <Navigate to='/sign-in' state={{ from: location }} replace />;
  }

  return <>{children}</>;
};
