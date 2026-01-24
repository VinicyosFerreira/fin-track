import { Navigate } from 'react-router';

import Header from '@/components/header';
import { useAuthContext } from '@/contexts/auth';

const HomePage = () => {
  const { user, isInitializating } = useAuthContext();

  if (isInitializating) {
    return null;
  }

  if (!user) {
    return <Navigate to="/login" />;
  }

  return (
    <>
      <Header />
    </>
  );
};

export default HomePage;
