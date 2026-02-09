import { ChevronDownIcon, LogOutIcon } from 'lucide-react';

import logo from '@/assets/images/logo.svg';
import { useAuthContext } from '@/contexts/auth';

import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';

const Header = () => {
  const { user, signout } = useAuthContext();
  return (
    <Card>
      <CardContent className="items-centerpx-8 flex justify-between py-4">
        <img src={logo} alt="FinTrack logo" />
        <DropdownMenu>
          <DropdownMenuTrigger className="flex items-center space-x-1" asChild>
            <Button variant="outline">
              <Avatar className="h-8 w-8">
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>
                  {user.firstName[0].toUpperCase()}{' '}
                  {user.lastName[0].toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <p className="text-sm">
                {user.firstName} {user.lastName}
              </p>
              <ChevronDownIcon className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent>
            <DropdownMenuLabel>Meu Perfil</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <Button
                  variant="ghost"
                  size="small"
                  className="w-full justify-start"
                  onClick={signout}
                >
                  <LogOutIcon />
                  <span>Sair</span>
                </Button>
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </CardContent>
    </Card>
  );
};

export default Header;
