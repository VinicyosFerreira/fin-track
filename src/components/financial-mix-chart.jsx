import { useSearchParams } from 'react-router';

import { useGetBalance } from '@/api/hooks/user';

import { ChartPieDonutText } from './ui/chart-model';

const FinancialMixChart = () => {
  const [searchParams] = useSearchParams();
  const from = searchParams.get('from');
  const to = searchParams.get('to');

  const { data } = useGetBalance({
    from,
    to,
  });

  if (!data) return null;

  return (
    <div>
      <ChartPieDonutText data={data} />
    </div>
  );
};

export default FinancialMixChart;
