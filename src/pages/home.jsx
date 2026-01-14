import { Navigate } from 'react-router';

import { Button } from '@/components/ui/button';
import { useAuthContext } from '@/contexts/auth';

const HomePage = () => {
  const { user, isInitializating, signout } = useAuthContext();

  if (isInitializating) {
    return null;
  }

  if (!user) {
    return <Navigate to="/login" />;
  }

  return (
    <div>
      <p>Olá {user.first_name}</p>
      <Button onClick={signout}>Sair</Button>
    </div>
  );
};

export default HomePage;
