import React from "react";
import { Cascader, Form, Select } from "antd";

interface IProps {
  list: any;
  defaultValue?: any;
}

const StatusProduct: React.FC<IProps> = ({ list: listAllCategory, defaultValue }) => {
  const handleListCascader = () => {
    return listAllCategory.map((item: any) => {
      if (item.submenu.length > 0) {
        return {
          value: item.title,
          label: item.title,
          children: item.submenu?.map((item: any) => {
            return { value: item.title, label: item.title };
          }),
        };
      }
      return {
        value: item.title,
        label: item.title,
      };
    });
  };

  return (
    <div className="form-group__content">
      <Form.Item
        name="category"
        initialValue={defaultValue}
        style={{ width: "100%" }}
        rules={[{ required: true, message: "Vui lòng chọn danh mục" }]}
      >
        <Cascader placeholder="Chọn danh mục" options={handleListCascader()} />
      </Form.Item>
    </div>
  );
};

export default StatusProduct;
