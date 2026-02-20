import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { useAuthContext } from '@/contexts/auth';
import { TransactionService } from '@/services/transaction';

import { getBalanceQueryKey } from './user';

export const useAddTransaction = () => {
  const queryClient = useQueryClient();
  const { user } = useAuthContext();
  return useMutation({
    mutationKey: ['create-transaction'],
    mutationFn: async (variables) => {
      const response = await TransactionService.create(variables);
      return response;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: getBalanceQueryKey({ user: user.id }),
      });
      queryClient.invalidateQueries({
        queryKey: getTransactionQueryKey({ user: user.id }),
      });
    },
  });
};

export const getTransactionQueryKey = ({ user, from, to }) => {
  if (!from || !to) {
    return ['get-transaction', user];
  }

  return ['get-transaction', user, from, to];
};

export const useGetTransaction = ({ from, to }) => {
  const { user } = useAuthContext();
  return useQuery({
    queryKey: getTransactionQueryKey({ user: user.id, from, to }),
    queryFn: () => TransactionService.getAll({ from, to }),
    enabled: Boolean(to) && Boolean(from),
  });
};

export const useUpdateTransaction = () => {
  const queryClient = useQueryClient();
  const { user } = useAuthContext();
  return useMutation({
    mutationKey: ['update-transaction'],
    mutationFn: async (variables) => {
      const response = await TransactionService.update(variables);
      return response;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: getBalanceQueryKey({ user: user.id }),
      });
      queryClient.invalidateQueries({
        queryKey: getTransactionQueryKey({ user: user.id }),
      });
    },
  });
};
