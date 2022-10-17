import { Form, Select } from "antd";
import React from "react";
import { ISelectOption } from "../Products/interfaces/product.interface";

const SelectOptionV2: React.FC<ISelectOption> = ({ options, name, disabled, className, initialValue }) => {
  const [form] = Form.useForm<any>();
  const [selectedValues, setSelectedValues] = React.useState<any>([]);

  const onSelect = (value: any, option: any) => {
    setSelectedValues(value);
    form.getFieldValue(option);
  };

  return (
    <Form.Item name={name} className={className} initialValue={initialValue || ""}>
      <Select allowClear onSelect={onSelect} options={options} value={selectedValues} disabled={disabled}></Select>
    </Form.Item>
  );
};

export default SelectOptionV2;
