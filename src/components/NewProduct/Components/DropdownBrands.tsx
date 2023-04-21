import { Divider, Form, Select, SelectProps } from 'antd';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store/store';
import { convertListDropdown } from '../../services/general.service';
import { FormAddBrand } from './FormAddBrand';

export const DropDownBrands: React.FC<any> = ({ handleChange }) => {
  const { brands } = useSelector((state: RootState) => state.brand);
  const [listBrands, setListBrands] = useState<SelectProps['options']>([]);

  useEffect(() => {
    const list = convertListDropdown(brands);
    setListBrands([...list]);
  }, [brands]);

  return (
    <Form.Item name="brand">
      <Select
        allowClear
        showArrow
        style={{ width: '100%' }}
        placeholder="Brand name"
        options={listBrands}
        optionFilterProp="label"
        onChange={(e) => handleChange(e, 'brand')}
        dropdownRender={(menu) => (
          <>
            {menu}
            <Divider style={{ margin: '8px 0' }} />
            <FormAddBrand />
          </>
        )}
      />
    </Form.Item>
  );
};
