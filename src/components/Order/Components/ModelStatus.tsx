import { Button, Form, Modal, Select } from 'antd';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NAME_DROPDOWNS } from '../../../constants/const';
import { IDropdown } from '../../../types/types';
import { getListOrderService, getUpdateOrderStatusService } from '../../redux/Slices/OrderSlice';
import { RootState } from '../../redux/store/store';
import { openMessage } from '../../services/general.service';

export const ModelStatus: React.FC<any> = ({ open, setOpen, listItemSelect, setSelectedIds }) => {
  const { loading } = useSelector((state: RootState) => state.order);
  const { dropdowns } = useSelector((state: RootState) => state.primary);

  const [options, setOptions] = React.useState<any[]>([]);

  const [form] = Form.useForm();
  const dispatch = useDispatch();

  useEffect(() => {
    handleListDropdown();
  }, [dropdowns]);

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

  const handleListDropdown = () => {
    const list = dropdowns?.filter(
      (item: IDropdown) => item.name === NAME_DROPDOWNS.ORDER_STATUS_S,
    );
    if (list.length > 0) {
      setOptions(list[0].dropdowns);
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
          <Select placeholder="Select order status" options={options} />
        </Form.Item>
      </Form>
    </Modal>
  );
};
