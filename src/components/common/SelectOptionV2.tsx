import { Form, Select } from 'antd';
import React from 'react';
import { ISelectOption } from '../../types/types';

export const SelectOptionV2: React.FC<ISelectOption> = ({
  options,
  name,
  disabled,
  className,
  placeholder,
  rules,
  validateTrigger,
  onChange,
}) => {
  const [form] = Form.useForm();
  const [selectedValues, setSelectedValues] = React.useState<string | undefined>(undefined);

  const onSelect = (value: string, option: any) => {
    setSelectedValues(value);
    form.getFieldValue(option);
  };

  return (
    <Form.Item name={name} className={className} rules={rules} validateTrigger={validateTrigger}>
      <Select
        allowClear
        placeholder={placeholder}
        onSelect={onSelect}
        options={options}
        value={selectedValues}
        disabled={disabled}
        onChange={(e) => onChange(e, name)}
      />
    </Form.Item>
  );
};
