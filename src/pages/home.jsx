import { Navigate } from 'react-router';

import AddTransactionDialog from '@/components/add-transaction-dialog';
import Balance from '@/components/balance';
import DataSelection from '@/components/date-selection';
import Header from '@/components/header';
import TransactionTable from '@/components/transaction-table';
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
      <div className="space-y-6 p-8">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold">Dashboard</h2>
          <div className="flex items-center gap-2">
            <DataSelection />
            <AddTransactionDialog />
          </div>
        </div>

        <div className="grid grid-cols-[1.7fr,1fr]">
          <Balance />
        </div>
        <div>
          <TransactionTable />
        </div>
      </div>
    </>
  );
};

export default HomePage;
