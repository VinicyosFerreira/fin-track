import { Card, CardContent } from '@/components/ui/card';

const BalanceItem = ({ amount, icon, label }) => {
  return (
    <Card className="rounded-lg">
      <CardContent className="space-y-2 p-6">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-muted">
            {icon}
          </div>
          <p className="text-sm font-bold text-muted-foreground">{label}</p>
        </div>

        <div>
          <h3 className="text-2xl">
            {new Intl.NumberFormat('pt-BR', {
              style: 'currency',
              currency: 'BRL',
            }).format(amount)}
          </h3>
        </div>
      </CardContent>
    </Card>
  );
};

export default BalanceItem;
