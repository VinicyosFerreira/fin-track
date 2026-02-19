import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { useAddTransaction } from '@/api/hooks/transaction';

import { transactionFormSchema } from '../schemas/transaction';

export const useAddTransactionForm = ({ onSuccess, onError }) => {
  const { mutateAsync } = useAddTransaction();
  const form = useForm({
    resolver: zodResolver(transactionFormSchema),
    defaultValues: {
      name: '',
      amount: 50,
      date: new Date(),
      type: 'EARNING',
    },
    shouldUnregister: true,
  });

  const onSubmit = async (data) => {
    try {
      await mutateAsync(data);
      onSuccess();
    } catch (error) {
      onError(error);
    }
  };

  return {
    form,
    onSubmit,
  };
};
