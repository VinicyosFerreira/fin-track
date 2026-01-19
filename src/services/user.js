import { protectedApi, publicApi } from '@/lib/axios';

const UserService = {
  signup: async (variables) => {
    const response = await publicApi.post('/api/users', {
      first_name: variables.firstName,
      last_name: variables.lastName,
      email: variables.email,
      password: variables.password,
    });
    return response.data;
  },
  login: async (variables) => {
    const response = await publicApi.post('api/users/login', {
      email: variables.email,
      password: variables.password,
    });
    return response.data;
  },

  me: async () => {
    const response = await protectedApi.get('api/users/me');
    return response.data;
  },
};

export { UserService };
