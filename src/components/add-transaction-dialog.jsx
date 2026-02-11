import { zodResolver } from '@hookform/resolvers/zod';
import { DialogClose } from '@radix-ui/react-dialog';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Loader2Icon, PlusIcon } from 'lucide-react';
import { PiggyBankIcon, TrendingDownIcon, TrendingUpIcon } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { NumericFormat } from 'react-number-format';
import { toast } from 'sonner';
import { z } from 'zod';

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
import { useAuthContext } from '@/contexts/auth';
import { TransactionService } from '@/services/transaction';

import { DatePicker } from './ui/date-picker';
import { Input } from './ui/input';

const formSchema = z.object({
  name: z
    .string({
      message: 'O titulo da transação é obrigatório',
    })
    .trim()
    .min(1, { message: 'O titulo da transação é obrigatório' }),
  amount: z
    .number({
      message: 'O valor da transação é obrigatório',
    })
    .min(1, { message: 'O valor da transação é obrigatório' }),
  date: z.date({ message: 'A data da transação é obrigatória' }),
  type: z.enum(['EARNING', 'EXPENSE', 'INVESTMENT'], {
    required_error: 'O tipo da transação é obrigatório',
  }),
});

const AddTransactionDialog = () => {
  const queryClient = useQueryClient();
  const { user } = useAuthContext();
  const [openDialog, setOpenDialog] = useState(false);
  const { mutateAsync } = useMutation({
    mutationKey: ['create-transaction'],
    mutationFn: async (variables) => {
      const response = await TransactionService.create(variables);
      return response;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['balance', user.id],
      });
    },
  });
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      amount: 50,
      date: new Date(),
      type: 'EARNING',
    },
    shouldUnregister: true,
  });

  const onSubmit = async (data) => {
    try {
      await mutateAsync(data);
      toast.success('Transação criada com sucesso');
      setOpenDialog(false);
      console.log(data);
    } catch (error) {
      toast.success('Erro ao criar transação');
      console.log(error);
    }
  };

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
