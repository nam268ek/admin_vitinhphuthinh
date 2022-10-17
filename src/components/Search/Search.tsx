import React from "react";
import { AutoComplete, Input } from "antd";
import { ISearchService } from "../../types/types";
import { useDispatch } from "react-redux";
import { filterListProducts } from "../redux/Slices/productSlice";

const Search: React.FC<ISearchService> = ({ placeholder, className, listItem, isDefault }) => {
  const [options, setOptions] = React.useState<any>([]);
  const [selectedValues, setSelectedValues] = React.useState<any>([]);
  const dispatch = useDispatch();

  const filterList = (inputValue: any, option: any) => {
    return option!.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1;
  };

  const handleSelectItem = (value: any, option: any) => {
    const data: any = listItem?.filter((item: any) => item.id === option.key);
    dispatch(filterListProducts(data));
  };

  const onSearch = (value: any) => {
    const options = listItem?.map((item: any) => ({ key: item.id, value: item.name }));
    setOptions(options);
    if (value === "") {
      setOptions([]);
    }
  };

  React.useEffect(() => {
    setSelectedValues(null);
  }, [isDefault]);

  return (
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
  );
};

export default Search;
