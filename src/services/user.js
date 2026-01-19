import { protectedApi, publicApi } from '@/lib/axios';

const UserService = {
  signup: async (variables) => {
    const response = await publicApi.post('/api/users', {
      first_name: variables.firstName,
      last_name: variables.lastName,
      email: variables.email,
      password: variables.password,
    });

    // retornar o padrão de resposta
    return {
      id: response.data.id,
      firstName: response.data.first_name,
      lastName: response.data.last_name,
      email: response.data.email,
      tokens: response.data.tokens,
    };
  },
  login: async (variables) => {
    const response = await publicApi.post('api/users/login', {
      email: variables.email,
      password: variables.password,
    });
    return {
      id: response.data.id,
      firstName: response.data.first_name,
      lastName: response.data.last_name,
      email: response.data.email,
      tokens: response.data.tokens,
    };
  },

  me: async () => {
    const response = await protectedApi.get('api/users/me');
    return {
      id: response.data.id,
      firstName: response.data.first_name,
      lastName: response.data.last_name,
      email: response.data.email,
    };
  },
};

export { UserService };
