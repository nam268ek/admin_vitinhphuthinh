import { Input, InputNumber, Select } from 'antd';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { NAME_DROPDOWNS } from '../../../constants/const';
import { IDropdown } from '../../../types/types';
import { RootState } from '../../redux/store/store';

export const FormSelectNumberMarketings: React.FC<any> = ({ onChange, productId }) => {
  const { dropdowns } = useSelector((state: RootState) => state.primary);
  const [options, setOptions] = React.useState<any[]>([]);
  const [selectItem, setSelectItem] = React.useState<any>();

  useEffect(() => {
    handleListDropdown();
  }, [dropdowns]);

  const handleListDropdown = () => {
    const list = dropdowns?.filter((item: IDropdown) => item.name === NAME_DROPDOWNS.NUMBER_PRODUCT_MARKETINGS);
    if (list.length > 0) {
      setOptions(list[0].dropdowns);
      setSelectItem(list[0].dropdowns[0].value);
    }
  };

  const onSelect = (name: string) => {
    onChange(name, 'numberProductMarketing', productId);
    setSelectItem(name);
  };

  return (
    <Input.Group compact>
      <Select value={selectItem} className={selectItem === 'limit' ? 'w-50' : 'w-100'} options={options} onSelect={onSelect} />
      {selectItem === 'limit' && <InputNumber min={1} className="w-50" />}
    </Input.Group>
  );
};
