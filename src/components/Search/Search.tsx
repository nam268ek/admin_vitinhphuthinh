import React from 'react';
import { AutoComplete } from 'antd';
import { ISearchService } from '../../types/types';

const options = [
  { value: 'Burns Bay Road' },
  { value: 'Downing Street' },
  { value: 'Wall Street' },
];

const Search: React.FC<ISearchService> = ({ placeholder, className }) => (
  <AutoComplete
    className={className}
    options={options}
    placeholder={placeholder}
    filterOption={(inputValue, option) =>
      option!.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
    }
  />
);
export default Search;