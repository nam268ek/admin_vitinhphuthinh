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
  selectItem?: any;
} & typeof defaultProps;

const defaultProps = {
  flowName: '',
  listItems: [],
  className: 'search-category',
  placeholder: 'Tìm kiếm sản phẩm...',
};

export const Search = (props: SearchProps) => {
  const { listItems, flowName, className, placeholder, selectItem } = props;
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
    selectItem(data);
    // dispatch(setUpdateListProductAction(data));
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
    <AutoComplete
      value={selectedValues}
      className={className}
      style={{ width: '100%' }}
      options={options}
      filterOption={filterList}
      onSelect={handleSelectItem}
      onSearch={onSearch}
      onChange={(value: any) => setSelectedValues(value)}
    >
      <Input.Search allowClear size="large" placeholder={placeholder} enterButton />
    </AutoComplete>
  );
};

Search.defaultProps = defaultProps;
