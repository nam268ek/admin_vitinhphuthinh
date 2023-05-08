/* eslint-disable curly */
/* eslint-disable react/display-name */
/* eslint-disable import/no-unresolved */
'use client';

import { addDays, format } from 'date-fns';
import { vi } from 'date-fns/locale';
import { Calendar as CalendarIcon } from 'lucide-react';
import * as React from 'react';
import { DateRange } from 'react-day-picker';

import { useEffect } from 'react';
import { cn } from 'src/utils';
import { Button } from './Button';
import { Calendar } from './Calendar';
import { Popover, PopoverContent, PopoverTrigger } from './Popover';
import { useTranslation } from 'react-i18next';

interface CalendarDateRangePickerProps {
  onChange: (range: DateRange | undefined, type: 'date') => void;
  className?: string;
  resetValue?: boolean;
}

export const CalendarDateRangePicker: React.FC<CalendarDateRangePickerProps> = ({ className, onChange, resetValue }) => {
  const { t } = useTranslation();
  const [date, setDate] = React.useState<DateRange | undefined>(undefined);

  const handleSetDate = React.useCallback(
    (range: DateRange | undefined) => {
      setDate(range);
      onChange(range, 'date');
    },
    [date],
  );

  useEffect(() => {
    if (resetValue) setDate(undefined);
  }, [resetValue]);

  return (
    <div className={cn('grid gap-2', className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={'outline'}
            size="sm"
            className={cn('w-[260px] font-normal justify-start text-left', !date && 'text-muted-foreground')}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, 'LLL dd, y', { locale: vi })} - {format(date.to, 'LLL dd, y', { locale: vi })}
                </>
              ) : (
                format(date.from, 'LLL dd, y', { locale: vi })
              )
            ) : (
              <span>{t('pickADate')}</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="end">
          <Calendar
            initialFocus
            locale={vi}
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            onSelect={handleSetDate}
            numberOfMonths={2}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
};
