import { useQuery } from '@tanstack/react-query';
import {
  PiggyBankIcon,
  TrendingDownIcon,
  TrendingUpIcon,
  WalletIcon,
} from 'lucide-react';
import { useSearchParams } from 'react-router';

import { useAuthContext } from '@/contexts/auth';
import { UserService } from '@/services/user';

import BalanceItem from './balance-items';

const Balance = () => {
  const [searchParams] = useSearchParams();
  const { user } = useAuthContext();

  const { data } = useQuery({
    queryKey: ['balance', user.id],
    queryFn: () =>
      UserService.getBalance({
        from: searchParams.get('from'),
        to: searchParams.get('to'),
      }),
  });

  if (!data) return null;

  return (
    <div className="grid grid-cols-2 grid-rows-2 gap-6">
      <BalanceItem
        amount={data.balance}
        label={'Saldo'}
        icon={<WalletIcon size={16} />}
      />
      <BalanceItem
        amount={data.earnings}
        label={'Ganhos'}
        icon={<TrendingUpIcon className="text-primary-green" size={16} />}
      />
      <BalanceItem
        amount={data.expenses}
        label={'Gastos'}
        icon={<TrendingDownIcon className="text-primary-red" size={16} />}
      />
      <BalanceItem
        amount={data.investments}
        label={'Investimentos'}
        icon={<PiggyBankIcon className="text-primary-blue" size={16} />}
      />
    </div>
  );
};

export default Balance;
