import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router';
import { toast } from 'sonner';
import { z } from 'zod';

import PasswordInput from '@/components/password-input';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import api from '@/lib/axios';

const formSchema = z.object({
  email: z
    .string()
    .email({ message: 'O e-mail está inválido' })
    .trim()
    .min(1, { message: 'O email é obrigatório' }),
  password: z
    .string()
    .trim()
    .min(6, { message: 'A senha deve possuir no minímo 6 caracteres' }),
});

const LoginPage = () => {
  const [user, setUser] = useState(null);
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
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  useEffect(() => {
    const init = async () => {
      try {
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
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        console.log(error);
      }
    };
    init();
  }, []);

  const handleSubmit = (data) => {
    loginMutation.mutate(data, {
      onSuccess: (loggedUser) => {
        const accessToken = loggedUser.tokens.accessToken;
        const refreshToken = loggedUser.tokens.refreshToken;
        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('refreshToken', refreshToken);
        setUser(loggedUser);
        toast.success('Login realizado com sucesso');
      },
      onError: () => {
        toast.error(
          'Não foi possível realizar o login, por favor tente novamente'
        );
      },
    });
  };

  if (user) {
    return <h1>Seja bem vindo , {user.first_name}</h1>;
  }

  return (
    <div className="flex h-screen w-full flex-col items-center justify-center gap-3">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)}>
          <Card className="w-[500px]">
            <CardHeader>
              <CardTitle>Entre na sua conta</CardTitle>
              <CardDescription>Insira seus dados abaixo</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* EMAIL INPUT */}
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>E-mail</FormLabel>
                    <FormControl>
                      <Input placeholder="Digite seu email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              ></FormField>

              {/* PASSWORD INPUT */}
              <FormField
                controle={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Senha</FormLabel>
                    <FormControl>
                      <PasswordInput {...field} ref={field.ref} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              ></FormField>
            </CardContent>
            <CardFooter>
              <Button className="w-full">Fazer Login</Button>
            </CardFooter>
          </Card>
        </form>
      </Form>
      <div className="flex items-center text-sm">
        <p className="text-center opacity-50">Ainda não possui uma conta</p>
        <Button variant="link" asChild>
          <Link to="/signup" className="text-white">
            Crie agora
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default LoginPage;
