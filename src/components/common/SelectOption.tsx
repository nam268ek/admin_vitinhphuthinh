import React from "react";
import { Select } from "antd";
import { ISelectService } from "../../types/types";

const SelectOption: React.FC<ISelectService> = ({
  className,
  placeholder,
  defaultValue,
}) => {
  const { Option } = Select;

  const handleChange = (value: any) => {
    console.log(`selected ${value}`);
  };
  return (
    <Select
      placeholder={placeholder}
      defaultValue={defaultValue}
      className={className}
      onChange={handleChange}
    >
      <Option value="jack">Jack</Option>
      <Option value="lucy">Lucy</Option>
      <Option value="disabled" disabled>
        Disabled
      </Option>
      <Option value="Yiminghe">yiminghe</Option>
    </Select>
  );
};

export default SelectOption;
