import { useQueryClient } from '@tanstack/react-query';
import { addMonths, isValid, parse } from 'date-fns';
import { format } from 'date-fns';
import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router';

import { getBalanceQueryKey } from '@/api/hooks/user';
import { useAuthContext } from '@/contexts/auth';

import { DatePickerWithRange } from './ui/date-picker-with-range';

const getInitialDateState = (searchParams) => {
  const from = searchParams.get('from');
  const to = searchParams.get('to');

  const defaultDate = {
    from: new Date(),
    to: addMonths(new Date(), 1),
  };

  if (!from || !to) {
    return defaultDate;
  }

  const parsedFrom = parse(from, 'yyyy-MM-dd', new Date());
  const parsedTo = parse(to, 'yyyy-MM-dd', new Date());

  const dateAreValid = !isValid(parsedFrom) || !isValid(parsedTo);

  if (dateAreValid) {
    return defaultDate;
  }

  return {
    from: new Date(from + 'T00:00:00'),
    to: new Date(to + 'T00:00:00'),
  };
};

const DataSelection = () => {
  const queryClient = useQueryClient();
  const [searchParams] = useSearchParams();
  const [date, setDate] = useState(getInitialDateState(searchParams));

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
      queryKey: getBalanceQueryKey({
        user: user.id,
        from: queryParams.get('from'),
        to: queryParams.get('to'),
      }),
    });
  }, [date, navigate, queryClient, user]);

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
