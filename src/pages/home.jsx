import { Navigate } from 'react-router';

import { useAuthContext } from '@/contexts/auth';

const HomePage = () => {
  const { user, isInitializating } = useAuthContext();

  if (isInitializating) {
    return null;
  }

  if (!user) {
    return <Navigate to="/login" />;
  }

  return <div>Olá {user.first_name}</div>;
};

export default HomePage;
