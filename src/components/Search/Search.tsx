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
    return option!.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1;
  };

  const handleSelectItem = (value: any, option: any) => {
    const data: any = listItem?.filter((item: any) => item._id === option.key);
    dispatch(filterListProducts(data));
  };

  const onSearch = (value: any) => {
    const options = listItem?.map((item: any) => ({ key: item._id, value: item.title }));
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
      placeholder={placeholder}
      filterOption={filterList}
      onSelect={handleSelectItem}
      onSearch={onSearch}
      onChange={(value: any) => setSelectedValues(value)}
    />
  );
};

export default Search;
