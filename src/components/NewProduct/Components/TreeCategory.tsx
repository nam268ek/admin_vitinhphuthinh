/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable curly */
/* eslint-disable prefer-const */
import { Form, Select } from 'antd';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { NAME_DROPDOWNS } from '../../../constants/const';
import { IDropdown } from '../../../types/types';
import { RootState } from '../../redux/store/store';

type TreeCategoryProps = {
  className?: string;
  isFeedback?: boolean;
  style?: React.CSSProperties;
  handleChange: any;
};

export const TreeCategory: React.FC<TreeCategoryProps> = ({
  handleChange,
  className,
  isFeedback = true,
  style,
}) => {
  const { dropdowns } = useSelector((state: RootState) => state.primary);
  const [options, setOptions] = useState<any>([]);

  useEffect(() => {
    handleListData();
  }, [dropdowns]);

  const handleListData = () => {
    const list = dropdowns?.filter(
      (item: IDropdown) => item.name === NAME_DROPDOWNS.CATEGORY_PRODUCT,
    );
    const items = list[0]?.dropdowns?.map((o) => {
      return {
        label: o.label,
        value: o.value,
      };
    });
    if (list.length > 0) {
      setOptions(items);
    }
  };

  return (
    <Form.Item
      name="category"
      hasFeedback={isFeedback}
      style={style}
      className={className}
      rules={[{ required: true, message: 'Vui lòng chọn danh mục' }]}
    >
      <Select
        options={options}
        onChange={(e) => handleChange(e, 'category')}
        placeholder="Chọn danh mục"
      />
    </Form.Item>
  );
};
