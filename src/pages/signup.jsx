import { Link } from 'react-router';

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
import { Input } from '@/components/ui/input';

const SignUpPage = () => {
  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center gap-3">
      <Card className="w-[500px]">
        <CardHeader>
          <CardTitle>Crie sua conta</CardTitle>
          <CardDescription>Insira seus dados abaixo</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Input placeholder="Digite seu nome" />
          <Input placeholder="Digite seu sobrenome" />
          <Input placeholder="Digite seu email" />
          <PasswordInput />
          <PasswordInput placeholder="Confirme sua senha" />
          <div className="items-top flex gap-3">
            <Checkbox id="terms" />
            <label
              htmlFor="terms"
              className="text-sm text-muted-foreground opacity-75"
            >
              Ao clicar em &quot;Criar conta&quot; você aceita
              <a href="#" className="ml-0.5 text-white underline">
                {' '}
                nosso termo de uso e politica de privacidade{' '}
              </a>
            </label>
          </div>
        </CardContent>
        <CardFooter>
          <Button className="w-full">Criar Conta</Button>
        </CardFooter>
      </Card>
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
