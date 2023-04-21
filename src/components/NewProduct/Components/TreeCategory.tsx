/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable curly */
/* eslint-disable prefer-const */
import { Form, Select } from 'antd';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NAME_DROPDOWNS } from '../../../constants/const';
import { getListDropdownsService } from '../../redux/Slices/PrimarySlice';
import { RootState } from '../../redux/store/store';

type TreeCategoryProps = {
  handleChange: any;
  className?: string;
  isFeedback?: boolean;
  style?: React.CSSProperties;
  disabled?: boolean;
};

export const TreeCategory: React.FC<TreeCategoryProps> = ({ handleChange, className, isFeedback = true, style, disabled }) => {
  const { categories } = useSelector((state: RootState) => state.category);
  const [options, setOptions] = useState<any>([]);
  const dispatch = useDispatch();

  useEffect(() => {
    handleListData();
  }, [categories]);

  const handleListData = () => {
    if (categories.length === 0) {
      // dispatch(getListCategoryService()).unwrap();
      dispatch(getListDropdownsService({ ids: [NAME_DROPDOWNS.CATEGORY_PRODUCT] })).unwrap();
      return;
    }
    const items = categories?.map((o) => {
      return {
        label: o.name,
        value: o.id,
      };
    });
    if (items.length > 0) {
      setOptions(items);
    }
  };

  return (
    <Form.Item name="category" hasFeedback={isFeedback} style={style} className={className}>
      <Select
        disabled={disabled || false}
        options={options}
        onChange={(e) => handleChange(e, 'category')}
        placeholder="Chọn danh mục"
      />
    </Form.Item>
  );
};
