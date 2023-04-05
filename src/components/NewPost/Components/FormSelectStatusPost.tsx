import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { NAME_DROPDOWNS } from '../../../constants/const';
import { IDropdown } from '../../../types/types';
import { SelectOptionV2 } from '../../common/SelectOptionV2';
import { RootState } from '../../redux/store/store';

export const FormSelectStatusPost: React.FC<any> = ({
  onChange,
  disabled,
  className = 'w-full',
}) => {
  const { dropdowns } = useSelector((state: RootState) => state.primary);
  const [options, setOptions] = useState<any[]>([]);

  useEffect(() => {
    handleListDropdown();
  }, [dropdowns]);

  const handleListDropdown = () => {
    const list = dropdowns?.filter(
      (item: IDropdown) => item.name === NAME_DROPDOWNS.POST_STATUS_OPTIONS,
    );
    if (list.length > 0) {
      setOptions(list[0].dropdowns);
    }
  };

  return (
    <SelectOptionV2
      name="status"
      className={className}
      placeholder="Trạng thái"
      handleOnChange={onChange}
      options={options}
      disabled={disabled}
      rules={[
        {
          required: true,
          message: 'Field not empty',
        },
      ]}
    />
  );
};
