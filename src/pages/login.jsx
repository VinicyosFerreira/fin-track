import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router';
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
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const handleSubmit = (data) => {
    console.log(data);
  };

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
