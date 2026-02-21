import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';

import {
  useAddTransaction,
  useUpdateTransaction,
} from '@/api/hooks/transaction';

import {
  transactionAddFormSchema,
  transactionUpdateFormSchema,
} from '../schemas/transaction';

export const useAddTransactionForm = ({ onSuccess, onError }) => {
  const { mutateAsync } = useAddTransaction();
  const form = useForm({
    resolver: zodResolver(transactionAddFormSchema),
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

const getEditTransactionFormDefaultValues = (transaction) => {
  return {
    name: transaction.name,
    amount: parseFloat(transaction.amount),
    date: new Date(transaction.date),
    type: transaction.type,
  };
};

export const useEditTransactionForm = ({ transaction, onSuccess, onError }) => {
  const { mutateAsync } = useUpdateTransaction();
  const form = useForm({
    resolver: zodResolver(transactionUpdateFormSchema),
    defaultValues: getEditTransactionFormDefaultValues(transaction),
    shouldUnregister: true,
  });

  useEffect(() => {
    form.reset(getEditTransactionFormDefaultValues(transaction));
    form.setValue('id', transaction.id);
  }, [form, transaction]);

  const onSubmit = async (data) => {
    try {
      await mutateAsync(data);
      onSuccess();
    } catch (error) {
      console.log(error);
      onError(error);
    }
  };

  return {
    form,
    onSubmit,
  };
};
