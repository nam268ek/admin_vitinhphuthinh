import React from "react";
import { Select } from "antd";

const SelectOption: React.FC = () => {
  const { Option } = Select;

  const handleChange = (value: any) => {
    console.log(`selected ${value}`);
  };
  return (
    <Select defaultValue="lucy" style={{ width: "100%" }} onChange={handleChange}>
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
