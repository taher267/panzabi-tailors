import { Navigate, Outlet } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

export default function ProtectedRoutes({ children, ...rest }) {
  const { user } = useAuth();
  // console.log('user', user, '==user===');
  return user?.id ? <Outlet /> : <Navigate to="/" />;
}
