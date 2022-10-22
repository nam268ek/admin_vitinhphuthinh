import React from 'react';
import { Cascader, Form, Select } from 'antd';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store/store';

export const TreeCategory: React.FC = () => {
  const { categories } = useSelector((state: RootState) => state.category);

  const handleListCascader = () => {
    return categories.map((item: any) => {
      if (item.submenu.length > 0) {
        return {
          value: item.title,
          label: item.title,
          children: item.submenu?.map((o: any) => {
            return { value: o.title, label: o.title };
          }),
        };
      }
      return {
        value: item.title,
        label: item.title,
      };
    });
  };

  return (
    <div className="form-group__content">
      <Form.Item
        name="category"
        style={{ width: '100%' }}
        rules={[{ required: true, message: 'Vui lòng chọn danh mục' }]}
      >
        <Cascader placeholder="Chọn danh mục" options={handleListCascader()} />
      </Form.Item>
    </div>
  );
};
