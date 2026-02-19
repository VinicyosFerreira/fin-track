import { Link } from 'react-router';
import { Navigate } from 'react-router';

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
import { useAuthContext } from '@/contexts/auth';
import { useSignupForm } from '@/form/hooks/user';

const SignUpPage = () => {
  const { user, isInitializating } = useAuthContext();
  const { methods, handleSubmit } = useSignupForm();

  if (isInitializating) return null;

  if (user) return <Navigate to="/" />;

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
