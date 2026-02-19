import { Link, Navigate } from 'react-router';

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
import { useAuthContext } from '@/contexts/auth';
import { useLoginForm } from '@/form/hooks/user';

const LoginPage = () => {
  const { user, isInitializating } = useAuthContext();

  const { form, handleSubmit } = useLoginForm();

  if (isInitializating) return null;

  if (user) return <Navigate to="/" />;

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
