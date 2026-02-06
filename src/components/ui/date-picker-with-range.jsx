import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale/pt-BR';
import { CalendarIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

export const DatePickerWithRange = ({
  value,
  onChange,
  placeholder = 'Selecione uma data',
}) => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className="w-full justify-start text-left"
          id="date-picker-range"
        >
          <CalendarIcon data-icon="inline-start" />
          {value?.from ? (
            value.to ? (
              <>
                {format(value.from, 'LLL dd, y', {
                  locale: ptBR,
                })}{' '}
                -{' '}
                {format(value.to, 'LLL dd, y', {
                  locale: ptBR,
                })}
              </>
            ) : (
              format(value.from, 'LLL dd, y', {
                locale: ptBR,
              })
            )
          ) : (
            <span>{placeholder}</span>
          )}
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="range"
          defaultMonth={value?.from}
          selected={value}
          onSelect={onChange}
          numberOfMonths={2}
          locale={ptBR}
        />
      </PopoverContent>
    </Popover>
  );
};
