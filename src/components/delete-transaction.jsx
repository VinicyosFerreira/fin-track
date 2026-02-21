import { Trash2Icon } from 'lucide-react';
import { XCircleIcon } from 'lucide-react';
import { toast } from 'sonner';

import { useDeleteTransaction } from '@/api/hooks/transaction';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

import { Button } from './ui/button';

const DeleteTransaction = ({ transaction }) => {
  const { mutateAsync } = useDeleteTransaction();

  const handleDeleteTransaction = async () => {
    try {
      await mutateAsync(transaction);
      toast.success('Transação deletada com sucesso');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          className="ml-auto flex justify-center gap-2 text-destructive hover:bg-destructive hover:text-destructive-foreground"
          variant="ghost"
        >
          <span className="text-sm">Deletar transação</span>
          <Trash2Icon />
        </Button>
      </DialogTrigger>
      <DialogContent className="border-none">
        <DialogHeader className="space-y-4">
          <DialogTitle className="flex items-center gap-2">
            <XCircleIcon className="h-4 w-4 text-destructive" />
            <span>Deseja deletar essa transação?</span>
          </DialogTitle>
          <DialogDescription>
            Uma vez deletada, não poderá recupera-lá
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancelar</Button>
          </DialogClose>
          <DialogClose>
            <Button
              variant="destructive"
              onClick={() => handleDeleteTransaction()}
            >
              Deletar
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteTransaction;
