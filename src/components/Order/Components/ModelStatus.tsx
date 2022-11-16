import { Button, Form, Modal, Select } from 'antd';
import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store/store';

export const ModelStatus: React.FC<any> = ({ open, setOpen, listItemSelect }) => {
  const { loading } = useSelector((state: RootState) => state.order);
  const [form] = Form.useForm();

  const handleCancel = () => {
    setOpen(false);
  };

  const handleSelectImages = () => {
    //
    console.log(listItemSelect);
    console.log(form.getFieldValue('orderStatus'));
  };

  return (
    <Modal
      title="Update status orders"
      open={open}
      onCancel={handleCancel}
      confirmLoading={loading}
      footer={[
        <Button key="back" type="primary" danger onClick={handleCancel}>
          Cancel
        </Button>,
        <Button key="submit" type="primary" onClick={handleSelectImages}>
          Submit
        </Button>,
      ]}
    >
      <Form form={form}>
        <Form.Item name="orderStatus">
          <Select
            placeholder="Select order status"
            options={[
              {
                value: 'done',
                label: 'done',
              },
              {
                value: 'pending',
                label: 'pending',
              },
              {
                value: 'cancel',
                label: 'cancel',
              },
            ]}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};
