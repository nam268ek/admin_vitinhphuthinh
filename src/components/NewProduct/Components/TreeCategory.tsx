/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable curly */
/* eslint-disable prefer-const */
import { Form, Select } from 'antd';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
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
  const { categories } = useSelector((state: RootState) => state.category);
  const [options, setOptions] = useState<any>([]);

  useEffect(() => {
    handleListData();
  }, [categories]);

  const handleListData = () => {
    const dataList = categories.map((o) => {
      return { label: o.name, value: o.id };
    });
    setOptions(dataList);
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
