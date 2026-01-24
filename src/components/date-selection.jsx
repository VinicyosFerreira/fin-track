import { addMonths } from 'date-fns';
import { useState } from 'react';

import { DatePickerWithRange } from './ui/date-picker-with-range';

const DataSelection = () => {
  const [date, setDate] = useState({
    from: new Date(),
    to: addMonths(new Date(), 1),
  });
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
