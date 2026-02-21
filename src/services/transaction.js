import queryString from 'query-string';

import { protectedApi } from '@/lib/axios';

const TransactionService = {
  create: async (variables) => {
    const response = await protectedApi.post('/api/transactions/me', variables);
    return response.data;
  },
  getAll: async (variables) => {
    const queryParams = queryString.stringify({
      from: variables.from,
      to: variables.to,
    });

    const response = await protectedApi.get(
      `/api/transactions/me?${queryParams}`
    );
    return response.data;
  },

  update: async (variables) => {
    const response = await protectedApi.patch(
      `/api/transactions/me/${variables.id}`,
      {
        name: variables.name,
        amount: variables.amount,
        date: variables.date,
        type: variables.type,
      }
    );

    return response.data;
  },

  delete: async (variables) => {
    const response = await protectedApi.delete(
      `/api/transactions/me/${variables.id}`
    );
    return response.data;
  },
};

export { TransactionService };
