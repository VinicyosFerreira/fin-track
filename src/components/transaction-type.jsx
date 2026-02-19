import { CircleIcon } from 'lucide-react';

import { Badge } from './ui/badge';

const TransactionType = ({ transactionType }) => {
  const getText = () => {
    switch (transactionType) {
      case 'earning':
        return 'Receita';
      case 'expense':
        return 'Gasto';
      case 'investment':
        return 'Investimento';
      default:
        return '';
    }
  };

  return (
    <Badge variant={transactionType}>
      <CircleIcon className="mr-2 h-4 w-4 fill-inherit" />
      <span>{getText(transactionType)}</span>
    </Badge>
  );
};

export default TransactionType;
