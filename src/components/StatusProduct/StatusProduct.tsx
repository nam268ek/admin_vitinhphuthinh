/* eslint-disable curly */
/* eslint-disable prefer-const */
import { Cascader, Form } from 'antd';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store/store';

export const TreeCategory: React.FC = () => {
  const { categories } = useSelector((state: RootState) => state.category);
  const [options, setOptions] = useState<any>([]);

  useEffect(() => {
    handleListData();
  }, [categories]);

  const handleListData = () => {
    const dataList = categories
      .filter((item) => item.parent === null)
      .map((o) => {
        return { label: o.name, value: o.id, isLeaf: false };
      });
    setOptions(dataList);
  };

  const loadData = (selectedOptions: any) => {
    const targetOption = selectedOptions[selectedOptions.length - 1];
    targetOption.loading = true;

    setTimeout(() => {
      targetOption.loading = false;
      targetOption.children = categories
        ?.filter((item) => item.parent === targetOption.value)
        .map((o) => {
          const childExist = categories.filter((c) => c.parent === o.id);
          if (childExist.length > 0) {
            return { label: o.name, value: o.id, isLeaf: false };
          }
          return { label: o.name, value: o.id };
        });
      setOptions([...options]);
    }, 10);
  };

  return (
    <div className="form-group__content">
      <Form.Item
        name="category"
        style={{ width: '100%' }}
        rules={[{ required: true, message: 'Vui lòng chọn danh mục' }]}
      >
        <Cascader
          placeholder="Chọn danh mục"
          options={options}
          loadData={loadData}
          changeOnSelect
        />
      </Form.Item>
    </div>
  );
};
