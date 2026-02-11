import { protectedApi } from '@/lib/axios';

const TransactionService = {
  create: async (variables) => {
    const response = await protectedApi.post('/api/transactions/me', variables);
    return response.data;
  },
};

export { TransactionService };
