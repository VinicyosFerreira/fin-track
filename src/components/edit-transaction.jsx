import { ExternalLinkIcon } from 'lucide-react';
import { Loader2Icon } from 'lucide-react';
import { PiggyBankIcon, TrendingDownIcon, TrendingUpIcon } from 'lucide-react';
import { useState } from 'react';
import { NumericFormat } from 'react-number-format';
import { toast } from 'sonner';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { useEditTransactionForm } from '@/form/hooks/transaction';

import DeleteTransaction from './delete-transaction';
import { Button } from './ui/button';
import { DatePicker } from './ui/date-picker';
import { Input } from './ui/input';

const EditTransaction = ({ transaction }) => {
  const [openSheet, setOpenSheet] = useState(false);
  const { form, onSubmit } = useEditTransactionForm({
    transaction,
    onSuccess: () => {
      setOpenSheet(false);
      toast.success('Transação editada com sucesso');
    },
    onError: () => {
      toast.error(
        'Ocorreu um erro ao editar a transação, por favor tente novamente'
      );
    },
  });
  return (
    <Sheet open={openSheet} onOpenChange={setOpenSheet}>
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
                            field.value === 'INVESTMENT'
                              ? 'secondary'
                              : 'outline'
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

              <DeleteTransaction transaction={transaction} />

              <SheetFooter>
                <SheetClose asChild>
                  <Button
                    className="w-full"
                    type="reset"
                    variant="outline"
                    disabled={form.formState.isSubmitting}
                  >
                    Cancelar
                  </Button>
                </SheetClose>
                <Button
                  className="w-full"
                  type="submit"
                  disabled={form.formState.isSubmitting}
                >
                  {form.formState.isSubmitting && (
                    <Loader2Icon className="mr-2 animate-spin" />
                  )}
                  Salvar
                </Button>
              </SheetFooter>
            </form>
          </Form>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
};

export default EditTransaction;
