import { PlusIcon } from 'lucide-react';
import { Navigate } from 'react-router';

import DataSelection from '@/components/date-selection';
import Header from '@/components/header';
import { Button } from '@/components/ui/button';
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
      <div className="p-8">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold">Dashboard</h2>
          <div className="flex items-center gap-2">
            <DataSelection />
            <Button>
              <span className="text-sm font-bold">Nova transação</span>
              <PlusIcon className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePage;
