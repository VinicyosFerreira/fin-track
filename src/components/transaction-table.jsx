import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { useSearchParams } from 'react-router';

import { useGetTransaction } from '@/api/hooks/transaction';
import { formatCurrency } from '@/helpers/currency';

import EditTransaction from './edit-transaction';
import TransactionType from './transaction-type';
import { DataTable } from './ui/data-table';
import { ScrollArea } from './ui/scroll-area';

const columns = [
  {
    accessorKey: 'name',
    header: 'Título',
  },
  {
    accessorKey: 'type',
    header: 'Tipo',
    cell: ({ row: { original: transaction } }) => {
      return (
        <TransactionType transactionType={transaction.type.toLowerCase()} />
      );
    },
  },
  {
    accessorKey: 'date',
    header: 'Data',
    cell: ({ row: { original: transaction } }) => {
      const date = new Date(transaction.date);
      return format(date, "dd 'de' MMMM 'de' yyyy", {
        locale: ptBR,
      });
    },
  },
  {
    accessorKey: 'amount',
    header: 'Valor',
    cell: ({ row: { original: transaction } }) => {
      return formatCurrency(transaction.amount);
    },
  },
  {
    accessorKey: 'actions',
    header: 'Ações',
    cell: ({ row: { original: transaction } }) => {
      return <EditTransaction transaction={transaction} />;
    },
  },
];

const TransactionTable = () => {
  const [searchParams] = useSearchParams();
  const from = searchParams.get('from');
  const to = searchParams.get('to');

  const { data: transactions } = useGetTransaction({ from, to });

  if (!transactions) return null;

  return (
    <>
      <h2 className="text-lg font-bold">Transações</h2>
      <ScrollArea className="h-[400px] max-h-[400px]">
        <DataTable columns={columns} data={transactions} />
      </ScrollArea>
    </>
  );
};

export default TransactionTable;
