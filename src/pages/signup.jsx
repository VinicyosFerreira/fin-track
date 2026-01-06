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
import { Checkbox } from '@/components/ui/checkbox';
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

const formSchema = z
  .object({
    firstName: z.string().trim().min(1, { message: 'O nome é obrigatório' }),
    lastName: z
      .string()
      .trim()
      .min(1, { message: 'O sobrenome é obrigatório' }),
    email: z
      .string()
      .email({ message: 'O email é inválido' })
      .trim()
      .min(1, { message: 'O email é obrigatório' }),
    password: z
      .string()
      .trim()
      .min(6, { message: 'A senha deve ter no minímo 6 caracteres' }),
    confirmPassword: z
      .string()
      .trim()
      .min(6, { message: 'A confirmação de senha é obrigatória' }),
    terms: z.boolean().refine((value) => value === true, {
      message: 'Voce precisa aceitar os termos de uso e privacidade',
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'As senhas não se coincidem',
    path: ['confirmPassword'],
  });

const SignUpPage = () => {
  const [user, setUser] = useState(null);
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

  const methods = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
      terms: false,
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
    signUpMutation.mutate(data, {
      onSuccess: (createdUser) => {
        const accessToken = createdUser.tokens.accessToken;
        const refreshToken = createdUser.tokens.refreshToken;
        setUser(createdUser);
        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('refreshToken', refreshToken);
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

  if (user) {
    return <h1>Olá, {user.first_name}</h1>;
  }

  return (
    <div className="mt-5 flex min-h-screen w-full flex-col items-center justify-center gap-3">
      <Form {...methods}>
        <form onSubmit={methods.handleSubmit(handleSubmit)}>
          <Card className="w-[500px]">
            <CardHeader>
              <CardTitle>Crie sua conta</CardTitle>
              <CardDescription>Insira seus dados abaixo</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* FIRST NAME INPUT*/}
              <FormField
                control={methods.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nome</FormLabel>
                    <FormControl>
                      <Input placeholder="Digite seu nome" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              ></FormField>

              {/* LAST NAME INPUT*/}
              <FormField
                control={methods.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Sobrenome</FormLabel>
                    <FormControl>
                      <Input placeholder="Digite seu sobrenome" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              ></FormField>

              {/* EMAIL INPUT*/}
              <FormField
                control={methods.control}
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

              {/* PASSWORD INPUT*/}
              <FormField
                control={methods.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Senha</FormLabel>
                    <FormControl>
                      <PasswordInput ref={field.ref} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              ></FormField>

              {/* PASSWORD CONFIRMED INPUT*/}
              <FormField
                control={methods.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirme sua senha</FormLabel>
                    <FormControl>
                      <PasswordInput
                        {...field}
                        placeholder="Confirme sua senha"
                        ref={field.ref}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              ></FormField>

              {/* CHECKBOX INPUT*/}
              <FormField
                control={methods.control}
                name="terms"
                render={({ field }) => (
                  <FormItem className="items-top flex gap-3 space-x-2 space-y-0">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <label
                      htmlFor="terms"
                      className={`text-sm text-muted-foreground opacity-75 ${methods.formState.errors.terms && 'text-red-500'}`}
                    >
                      Ao clicar em &quot;Criar conta&quot; você aceita
                      <a
                        href="#"
                        className={`ml-0.5 text-white underline ${methods.formState.errors.terms && 'text-red-500'}`}
                      >
                        {' '}
                        nosso termo de uso e politica de privacidade{' '}
                      </a>
                    </label>
                  </FormItem>
                )}
              ></FormField>
            </CardContent>
            <CardFooter>
              <Button className="w-full">Criar Conta</Button>
            </CardFooter>
          </Card>
        </form>
      </Form>
      <div className="flex items-center text-sm">
        <p className="text-center opacity-50">Ja possui uma conta?</p>
        <Button variant="link" asChild>
          <Link to="/login" className="text-white">
            Faça Login
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default SignUpPage;
