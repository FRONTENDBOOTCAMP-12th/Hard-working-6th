import { useAuthStore } from '@/stores/authStore';
import { Navigate, Outlet } from 'react-router';

const ProtectedRoute = () => {
  const user = useAuthStore((state) => state.user);

  if (!user) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
