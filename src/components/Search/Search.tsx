import React from "react";
import { AutoComplete } from "antd";
import { ISearchService } from "../../types/types";
import { useDispatch } from "react-redux";
import { filterListProducts } from "../redux/Slices/productSlice";

const Search: React.FC<ISearchService> = ({ placeholder, className, listItem, isDefault }) => {
  const [options, setOptions] = React.useState<any>([]);
  const [selectedValues, setSelectedValues] = React.useState<any>([]);
  const dispatch = useDispatch();

  const filterList = (inputValue: any, option: any) => {
    const test = option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1;
    console.log(test);
    return test;
  };

  const handleSelectItem = (value: any, option: any) => {
    const data: any = listItem?.filter((item: any) => item.title === value);
    dispatch(filterListProducts(data));
  };

  const onSearch = (value: any) => {
    const options = listItem?.map((item: any) => ({ value: item.title }));
    setOptions(options);
    if (value === "") {
      setOptions([]);
    }
  };

  React.useEffect(() => {
    setSelectedValues([]);
  }, [isDefault]);

  return (
    <AutoComplete
      defaultValue={selectedValues}
      className={className}
      options={options}
      placeholder={placeholder}
      filterOption={filterList}
      onSelect={handleSelectItem}
      onSearch={onSearch}
    />
  );
};

export default Search;
