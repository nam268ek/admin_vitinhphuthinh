import React from 'react';
import { Cascader, Form, Select } from 'antd';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store/store';
import { ICategories } from '../Categories/interfaces/categories.interface';
import { cloneDeep } from 'lodash';

export const TreeCategory: React.FC = () => {
  const { categories } = useSelector((state: RootState) => state.category);

  const handleListCascader = () => {
    const cascader: any[] = [];
    checkParent(cascader, categories);
    return cascader;
  };
  const checkParent = (cas: any[], list: any[]) => {
    for (const category of list) {
      if (category.parent && category.parent.length > 0) {
        const temp = {
          label: category.name,
          value: category.id,
          children: [],
        };
        cas.push(temp);
        checkParent(temp.children, category.parent);
      } else {
        cas.push({
          label: category.name,
          value: category.id,
        });
      }
    }
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
