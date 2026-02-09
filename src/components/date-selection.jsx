import { useQueryClient } from '@tanstack/react-query';
import { addMonths } from 'date-fns';
import { format } from 'date-fns';
import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router';

import { useAuthContext } from '@/contexts/auth';

import { DatePickerWithRange } from './ui/date-picker-with-range';

const DataSelection = () => {
  const queryClient = useQueryClient();
  const [searchParams] = useSearchParams();
  const [date, setDate] = useState({
    from: searchParams.get('from')
      ? new Date(searchParams.get('from') + 'T00:00:00')
      : new Date(),
    to: searchParams.get('to')
      ? new Date(searchParams.get('to') + 'T00:00:00')
      : addMonths(new Date(), 1),
  });

  const { user } = useAuthContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (!date?.from || !date?.to) return;

    const queryParams = new URLSearchParams();
    queryParams.set('from', format(date.from, 'yyyy-MM-dd'));
    queryParams.set('to', format(date.to, 'yyyy-MM-dd'));

    navigate({
      search: queryParams.toString(),
    });

    queryClient.invalidateQueries({
      queryKey: ['balance', user.id],
    });
  }, [date, navigate, queryClient, user.id]);

  return (
    <div>
      <DatePickerWithRange
        value={date}
        onChange={setDate}
        placeholder="Selecione a data"
      />
    </div>
  );
};

export default DataSelection;
