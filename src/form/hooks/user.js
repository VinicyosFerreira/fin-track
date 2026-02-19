import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { useAuthContext } from '@/contexts/auth';

import { loginFormSchema } from '../schemas/login';
import { signupFormSchema } from '../schemas/signup';

export const useLoginForm = () => {
  const { login } = useAuthContext();
  const form = useForm({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });
  const handleSubmit = (data) => {
    login(data);
  };

  return {
    form,
    handleSubmit,
  };
};

export const useSignupForm = () => {
  const { signup } = useAuthContext();
  const methods = useForm({
    resolver: zodResolver(signupFormSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
      terms: false,
    },
  });

  const handleSubmit = (data) => {
    signup(data);
  };

  return {
    methods,
    handleSubmit,
  };
};
