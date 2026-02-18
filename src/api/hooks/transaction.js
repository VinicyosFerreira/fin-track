import { useMutation, useQueryClient } from '@tanstack/react-query';

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
    },
  });
};
