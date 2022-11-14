import { AutoComplete, Form, Input } from 'antd';
import { format } from 'node:path/win32';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setUpdateListProductAction } from '../redux/Slices/ProductSlice';
import { RootState } from '../redux/store/store';

const Search: React.FC = () => {
  const { products } = useSelector((state: RootState) => state.product);
  const [options, setOptions] = React.useState<any>([]);
  const [selectedValues, setSelectedValues] = React.useState<any>([]);
  const dispatch = useDispatch();
  const [form] = Form.useForm();

  const filterList = (inputValue: any, option: any) => {
    return option!.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1;
  };

  const handleSelectItem = (value: any, option: any) => {
    const data: any = products?.filter((item: any) => item.id === option.key);
    dispatch(setUpdateListProductAction(data));
  };

  const onSearch = (value: any) => {
    const list = products?.map((item: any) => ({ key: item.id, value: item.name }));
    setOptions(list);
    if (value === '') {
      setOptions([]);
    }
  };

  return (
    <Form form={form}>
      <Form.Item name="search" noStyle>
        <AutoComplete
          value={selectedValues}
          className="search-category"
          options={options}
          filterOption={filterList}
          onSelect={handleSelectItem}
          onSearch={onSearch}
          onChange={(value: any) => setSelectedValues(value)}
        >
          <Input.Search size="large" placeholder="Tìm kiếm sản phẩm..." enterButton />
        </AutoComplete>
      </Form.Item>
    </Form>
  );
};

export default Search;
