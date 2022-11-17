import { Button, Form, Modal, Select } from 'antd';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getListOrderService, getUpdateOrderStatusService } from '../../redux/Slices/OrderSlice';
import { RootState } from '../../redux/store/store';
import { openMessage } from '../../services/general.service';

export const ModelStatus: React.FC<any> = ({ open, setOpen, listItemSelect, setSelectedIds }) => {
  const { loading } = useSelector((state: RootState) => state.order);
  const [form] = Form.useForm();
  const dispatch = useDispatch();

  const handleCancel = () => {
    setOpen(false);
  };

  const handleSelectImages = async () => {
    const orderStatus = form.getFieldValue('orderStatus');
    try {
      await dispatch(getUpdateOrderStatusService({ ids: listItemSelect, orderStatus })).unwrap();
      await dispatch(getListOrderService()).unwrap();

      openMessage();
      form.resetFields();
      setOpen(false); // close modal
      setSelectedIds([]); //clear select table
    } catch (error) {
      openMessage(error);
    }
  };

  return (
    <Modal
      title="Update status orders"
      width={'20%'}
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
        <Form.Item name="orderStatus" style={{ marginBottom: 0 }}>
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
