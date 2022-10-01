import { Navigate, Outlet } from 'react-router-dom';
import useAuth from './../hooks/useAuth';

export default function AuthRoute({ children }) {
  const { user } = useAuth();
  return user?.id ? <Navigate to="/" /> : <Outlet />;
}
