// aqui vão ficar os hooks relacionados ao usuário

import { useQuery } from '@tanstack/react-query';
import { useMutation } from '@tanstack/react-query';

import { useAuthContext } from '@/contexts/auth';
import { UserService } from '@/services/user';

export const getBalanceQueryKey = ({ user, from, to }) => {
  if (!from || !to) {
    return ['balance', user];
  }

  return ['balance', user, from, to];
};

export const useGetBalance = ({ from, to }) => {
  const { user } = useAuthContext();

  return useQuery({
    queryKey: getBalanceQueryKey({ user: user.id, from, to }),
    queryFn: () =>
      UserService.getBalance({
        from,
        to,
      }),
    enabled: Boolean(to) && Boolean(from),
  });
};

export const useLogin = () => {
  return useMutation({
    mutationKey: ['login'],
    mutationFn: async (variables) => {
      const response = await UserService.login(variables);
      return response;
    },
  });
};

export const useSignup = () => {
  return useMutation({
    mutationKey: ['signup'],
    mutationFn: async (variables) => {
      const response = await UserService.signup(variables);
      return response;
    },
  });
};
