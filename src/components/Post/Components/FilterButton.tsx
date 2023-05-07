/* eslint-disable import/no-unresolved */
import { DatePicker, DatePickerProps, Input, Space } from 'antd';
import { Search } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { CalendarDateRangePicker } from 'src/components/ui/CalendarDateRangePicker';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from 'src/components/ui/Select';

export const FilterButton = () => {
  const { t } = useTranslation();
  const onChange: DatePickerProps['onChange'] = (date, dateString) => {
    console.log(date, dateString);
  };

  return (
    <Space>
      <Input size="large" className="w-[22rem]" placeholder={t('searchName') || ''} prefix={<Search size={18} />} />
      {/* <DatePicker className="date-picker py-2" placeholder={t('date') || ''} onChange={onChange} /> */}
      <CalendarDateRangePicker className="border border-solid border-zinc-200 rounded-md" />
      <Select>
        <SelectTrigger className="w-32">
          <SelectValue placeholder={t('status') || ''} />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="Y">ON</SelectItem>
          <SelectItem value="N">OFF</SelectItem>
        </SelectContent>
      </Select>
    </Space>
  );
};
