import React, { useState } from "react";
import { Select, Divider, Input, Typography, Space, Form } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { ISelectProps } from "../../types/types";

const { Option } = Select;

let index = 0;

const SelectAddItem: React.FC<ISelectProps> = ({ defaultValue }) => {
  const [items, setItems] = useState(["jack", "lucy"]);
  const [name, setName] = useState("");

  const onNameChange = (event: any) => {
    setName(event.target.value);
  };

  const addItem = (e: any) => {
    e.preventDefault();
    setItems([...items, name || `New item ${index++}`]);
    setName("");
  };

  return (
    <Form.Item
      name="brand"
      initialValue={defaultValue}
      style={{ width: "100%" }}
      rules={[{ required: true, message: "Vui lòng nhập tên thương hiệu" }]}
    >
      <Select
        placeholder="Thương hiệu"
        dropdownRender={(menu) => (
          <div className="menu-add">
            {menu}
            <Divider style={{ margin: "8px 0" }} />
            <Space align="center" style={{ padding: "0 8px 4px" }}>
              <Input placeholder="Thêm thương hiệu" value={name} onChange={onNameChange} />
              <Typography.Link onClick={addItem} style={{ whiteSpace: "nowrap", display: "flex", alignItems: "center" }}>
                <PlusOutlined /> Add
              </Typography.Link>
            </Space>
          </div>
        )}
      >
        {items.map((item) => (
          <Option key={item}>{item}</Option>
        ))}
      </Select>
    </Form.Item>
  );
};

export default SelectAddItem;
