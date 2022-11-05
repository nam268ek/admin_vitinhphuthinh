import { PlusOutlined } from '@ant-design/icons';
import { Button, Form, Input, InputRef, Space } from 'antd';
import React, { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCreateBrandService } from '../../redux/Slices/BrandSlice';
import { RootState } from '../../redux/store/store';
import { openMessage } from '../../services/general.service';

export const FormAddBrand: React.FC = () => {
  const { loading } = useSelector((state: RootState) => state.tag);
  const dispatch = useDispatch();
  const inputRef = useRef<InputRef>(null);

  const handleCreateBrand = async (data: any) => {
    try {
      await dispatch(getCreateBrandService({ name: data.brandName })).unwrap();
    } catch (error) {
      openMessage(error);
    }
  };

  return (
    <Form onFinish={handleCreateBrand}>
      <Space style={{ padding: '0 8px 4px' }}>
        <Form.Item
          name="brandName"
          rules={[
            {
              required: true,
              message: 'Please input brand name!',
            },
          ]}
        >
          <Space>
            <Input placeholder="brand name" ref={inputRef} />
            <Button
              type="text"
              className="d-flex align-items-center"
              htmlType="submit"
              icon={<PlusOutlined />}
              loading={loading}
              disabled={loading}
            >
              Add brand
            </Button>
          </Space>
        </Form.Item>
      </Space>
    </Form>
  );
};
