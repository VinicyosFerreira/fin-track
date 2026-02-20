import { ExternalLinkIcon } from 'lucide-react';

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';

import { Button } from './ui/button';

const EditTransactionButton = ({ transaction }) => {
  return (
    <Sheet>
      <SheetTrigger
        className="text-sm font-semibold text-muted-foreground"
        asChild
      >
        <Button variant="icon">
          <ExternalLinkIcon />
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Editar Transação</SheetTitle>
          <SheetDescription>
            Edite o valor, a data e o tipo da transação.
          </SheetDescription>
          <p>{transaction?.name}</p>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
};

export default EditTransactionButton;
