import { DialogClose } from '@radix-ui/react-dialog';
import { Loader2Icon, PlusIcon } from 'lucide-react';
import { PiggyBankIcon, TrendingDownIcon, TrendingUpIcon } from 'lucide-react';
import { useState } from 'react';
import { NumericFormat } from 'react-number-format';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { useAddTransactionForm } from '@/form/hooks/transaction';

import { DatePicker } from './ui/date-picker';
import { Input } from './ui/input';

const AddTransactionDialog = () => {
  const [openDialog, setOpenDialog] = useState(false);

  const { form, onSubmit } = useAddTransactionForm({
    onSuccess: () => {
      setOpenDialog(false);
      toast.success('Transação adicionada com sucesso');
    },
    onError: () => {
      toast.error(
        'Ocorreu um erro ao adicionar a transação, por favor tente novamente'
      );
    },
  });

  return (
    <Dialog open={openDialog} onOpenChange={setOpenDialog}>
      <DialogTrigger asChild>
        <Button>
          <span className="text-sm font-bold">Nova transação</span>
          <PlusIcon className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader className="flex items-center">
          <DialogTitle className="text-xl font-bold">
            Adicionar Transação
          </DialogTitle>
          <DialogDescription className="text-sm text-muted-foreground">
            Insira as informações abaixo
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Titulo</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Digite o titulo da transação"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="amount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Valor</FormLabel>
                  <FormControl>
                    <NumericFormat
                      customInput={Input}
                      allowNegative={false}
                      thousandSeparator="."
                      decimalSeparator=","
                      placeholder="Digite o valor da transação"
                      prefix="R$ "
                      {...field}
                      onChange={() => {}}
                      onValueChange={(values) => {
                        field.onChange(values.floatValue);
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="date"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Data</FormLabel>
                  <FormControl>
                    <DatePicker
                      {...field}
                      placeholder="Selecione uma data de transação"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tipo</FormLabel>
                  <FormControl>
                    <div className="grid grid-cols-3 gap-2">
                      <Button
                        variant={
                          field.value === 'EARNING' ? 'secondary' : 'outline'
                        }
                        type="button"
                        onClick={() => field.onChange('EARNING')}
                      >
                        <TrendingUpIcon className="text-primary-green" />
                        Ganho
                      </Button>
                      <Button
                        variant={
                          field.value === 'EXPENSE' ? 'secondary' : 'outline'
                        }
                        onClick={() => field.onChange('EXPENSE')}
                        type="button"
                      >
                        <TrendingDownIcon className="text-primary-red" />
                        Gasto
                      </Button>
                      <Button
                        variant={
                          field.value === 'INVESTMENT' ? 'secondary' : 'outline'
                        }
                        type="button"
                        onClick={() => field.onChange('INVESTMENT')}
                      >
                        <PiggyBankIcon className="text-primary-blue" />
                        Investimento
                      </Button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter>
              <DialogClose asChild>
                <Button
                  className="w-full"
                  type="reset"
                  variant="outline"
                  disabled={form.formState.isSubmitting}
                >
                  Cancelar
                </Button>
              </DialogClose>
              <Button
                className="w-full"
                type="submit"
                disabled={form.formState.isSubmitting}
              >
                {form.formState.isSubmitting && (
                  <Loader2Icon className="mr-2 animate-spin" />
                )}
                Enviar
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default AddTransactionDialog;
