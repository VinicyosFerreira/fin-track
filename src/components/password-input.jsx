import { Eye, EyeOffIcon } from 'lucide-react';
import { forwardRef, useState } from 'react';

import { Button } from './ui/button';
import { Input } from './ui/input';

const PasswordInput = forwardRef(
  ({ placeholder = 'Digite sua senha', ref, ...props }) => {
    const [passwordIsVisible, setPasswordIsVisible] = useState(false);
    return (
      <div className="relative">
        <Input
          type={passwordIsVisible ? 'text' : 'password'}
          placeholder={placeholder}
          ref={ref}
          {...props}
        />
        <Button
          variant="ghost"
          onClick={() => setPasswordIsVisible((prev) => !prev)}
          className="absolute bottom-0 right-0 top-0 my-auto h-8 w-8 text-muted-foreground"
        >
          {passwordIsVisible ? <Eye /> : <EyeOffIcon />}
        </Button>
      </div>
    );
  }
);

PasswordInput.displayName = 'PasswordInput';

export default PasswordInput;
