/* eslint-disable curly */
/* eslint-disable import/no-unresolved */
import { Input, Space } from 'antd';
import { cloneDeep } from 'lodash';
import { RefreshCw, Search } from 'lucide-react';
import { useState } from 'react';
import { DateRange } from 'react-day-picker';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { getListPostFilterService, getListPostsService } from 'src/components/redux/Slices/PostSlice';
import { openMessage } from 'src/components/services/general.service';
import { Button } from 'src/components/ui/Button';
import { CalendarDateRangePicker } from 'src/components/ui/CalendarDateRangePicker';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from 'src/components/ui/Select';

export const FilterButton = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [reset, setReset] = useState<boolean>(false);
  const [bodyFilter, setBodyFilter] = useState<any>({});

  const handleFilter = async (value: string | DateRange | undefined, key: string) => {
    if (key === 'date' && typeof value === 'object') {
      const dateCLone = cloneDeep(value);
      let dateTo;
      if (!dateCLone?.to || dateCLone?.to?.getTime() === dateCLone?.from?.getTime()) {
        dateTo = cloneDeep(dateCLone.from) as Date;
        dateTo.setHours(dateTo.getHours() + 24);
      }
      if (dateCLone?.to) {
        dateTo = cloneDeep(dateCLone.to) as Date;
        dateTo.setHours(dateTo.getHours() + 24);
      }

      bodyFilter['date'] = {
        from: dateCLone?.from,
        to: dateTo,
      };
    } else bodyFilter[key] = value;

    setBodyFilter(bodyFilter);

    try {
      await dispatch(getListPostFilterService(bodyFilter)).unwrap();
      setReset(false);
    } catch (error) {
      openMessage(error);
    }
  };

  const handleRefresh = async () => {
    try {
      await dispatch(getListPostsService()).unwrap();
      setBodyFilter({});
      setReset(true);
    } catch (error) {
      openMessage(error);
    }
  };

  return (
    <Space>
      <Input
        size="large"
        className="w-[22rem] h-9"
        value={bodyFilter?.namePost || ''}
        placeholder={t('searchName') || ''}
        onChange={(e) => handleFilter(e.target.value, 'namePost')}
        prefix={<Search size={18} className="text-zinc-400" />}
      />
      <CalendarDateRangePicker resetValue={reset} onChange={handleFilter} />
      <Select value={bodyFilter?.status || null} onValueChange={(e) => handleFilter(e, 'status')}>
        <SelectTrigger className="w-32 h-9">
          <SelectValue placeholder={t('status') || ''} />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="Y">ON</SelectItem>
          <SelectItem value="N">OFF</SelectItem>
        </SelectContent>
      </Select>
      <Button className="h-9 w-12 hover:cursor-pointer" variant={'outline'} onClick={handleRefresh}>
        <RefreshCw size={18} className="text-zinc-400" />
      </Button>
    </Space>
  );
};
