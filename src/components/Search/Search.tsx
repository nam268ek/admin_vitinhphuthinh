import { AutoComplete, Form, Input } from 'antd';
import React from 'react';
import { useDispatch } from 'react-redux';
import { setUpdateListOrdersAction } from '../redux/Slices/OrderSlice';
import { setUpdateListProductAction } from '../redux/Slices/ProductSlice';

type SearchProps = {
  flowName: string;
  listItems: any;
  className: string;
  placeholder: string;
} & typeof defaultProps;

const defaultProps = {
  flowName: '',
  listItems: [],
  className: 'search-category',
  placeholder: 'Tìm kiếm sản phẩm...',
};

export const Search = (props: SearchProps) => {
  const { listItems, flowName, className, placeholder } = props;
  const [options, setOptions] = React.useState<any>([]);
  const [selectedValues, setSelectedValues] = React.useState<any>([]);
  const dispatch = useDispatch();
  const [form] = Form.useForm();

  const filterList = (inputValue: any, option: any) => {
    return option!.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1;
  };

  const handleSelectItem = (value: any, option: any) => {
    const data: any = listItems?.filter((item: any) => item.id === option.key);

    if (flowName === 'orders') {
      dispatch(setUpdateListOrdersAction(data));
      return;
    }
    dispatch(setUpdateListProductAction(data));
  };

  const handleListOnSearch = () => {
    if (flowName === 'orders') {
      return listItems?.map((item: any) => ({ key: item.id, value: item.customer.email }));
    }
    return listItems?.map((item: any) => ({ key: item.id, value: item.name }));
  };

  const onSearch = (value: any) => {
    const list = handleListOnSearch();
    setOptions(list);
    if (value === '') {
      setOptions([]);
    }
  };

  return (
    <Form form={form} style={{ width: '100%' }}>
      <Form.Item name="search" noStyle>
        <AutoComplete
          value={selectedValues}
          className={className}
          options={options}
          filterOption={filterList}
          onSelect={handleSelectItem}
          onSearch={onSearch}
          onChange={(value: any) => setSelectedValues(value)}
        >
          <Input.Search size="large" placeholder={placeholder} enterButton />
        </AutoComplete>
      </Form.Item>
    </Form>
  );
};

Search.defaultProps = defaultProps;
