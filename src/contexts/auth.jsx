import { useMutation } from '@tanstack/react-query';
import { createContext, useContext, useEffect, useState } from 'react';
import { toast } from 'sonner';

import api from '@/lib/axios';

// cria o contexto
export const AuthContext = createContext({
  user: null,
  isInitializating: true,
  login: () => {},
  signup: () => {},
  signout: () => {},
});

// exporta uma função que consome o contexto
export const useAuthContext = () => useContext(AuthContext);

const ACCESS_TOKEN_KEY = 'accessToken';
const REFRESH_TOKEN_KEY = 'refreshToken';

const setTokens = (tokens) => {
  localStorage.setItem(ACCESS_TOKEN_KEY, tokens.accessToken);
  localStorage.setItem(REFRESH_TOKEN_KEY, tokens.refreshToken);
};

const removeTokens = () => {
  localStorage.removeItem('accessToken');
  localStorage.removeItem('refreshToken');
};

// depois a gente prove o contexto
export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isInitializating, setIsInitializating] = useState(true);

  const signUpMutation = useMutation({
    mutationKey: ['signup'],
    mutationFn: async (variables) => {
      const response = await api.post('/api/users', {
        first_name: variables.firstName,
        last_name: variables.lastName,
        email: variables.email,
        password: variables.password,
      });

      return response.data;
    },
  });

  const loginMutation = useMutation({
    mutationKey: ['login'],
    mutationFn: async (variables) => {
      const response = await api.post('api/users/login', {
        email: variables.email,
        password: variables.password,
      });

      return response.data;
    },
  });

  useEffect(() => {
    const init = async () => {
      try {
        setIsInitializating(true);
        const accessToken = localStorage.getItem('accessToken');
        const refreshToken = localStorage.getItem('refreshToken');
        if (!accessToken && !refreshToken) return;

        const response = await api.get('api/users/me', {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        setUser(response.data);
      } catch (error) {
        removeTokens();
        console.log(error);
      } finally {
        setIsInitializating(false);
      }
    };

    init();
  }, []);

  const signup = (data) => {
    signUpMutation.mutate(data, {
      onSuccess: (createdUser) => {
        setUser(createdUser);
        setTokens(createdUser.tokens);
        toast.success('Conta criada com sucesso');
      },
      onError: (error) => {
        console.log('Erro ao criar conta', error);
        toast.error(
          'Erro ao criar conta, por favor tente novamente mais tarde'
        );
      },
    });
  };

  const login = (data) => {
    loginMutation.mutate(data, {
      onSuccess: (loggedUser) => {
        setUser(loggedUser);
        setTokens(loggedUser.tokens);
        toast.success('Login realizado com sucesso');
      },
      onError: () => {
        toast.error(
          'Não foi possível realizar o login, por favor tente novamente'
        );
      },
    });
  };

  const signout = () => {
    setUser(null);
    removeTokens();
  };

  return (
    <AuthContext.Provider
      value={{
        user: user,
        isInitializating: isInitializating,
        login: login,
        signup: signup,
        signout: signout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
