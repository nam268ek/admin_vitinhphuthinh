import { PlusOutlined } from '@ant-design/icons';
import { Button, Form, Input, InputRef, Space } from 'antd';
import React, { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCreateTagService } from '../../redux/Slices/TagSlice';
import { RootState } from '../../redux/store/store';
import { openMessage } from '../../services/general.service';

export const FormAddTag: React.FC = () => {
  const { loading } = useSelector((state: RootState) => state.tag);
  const dispatch = useDispatch();
  const inputRef = useRef<InputRef>(null);

  const handleCreateTag = async (data: any) => {
    try {
      await dispatch(getCreateTagService({ name: data.tag })).unwrap();
    } catch (error) {
      openMessage(error);
    }
  };

  return (
    <Form onFinish={handleCreateTag}>
      <Space style={{ padding: '0 8px 4px' }}>
        <Form.Item
          name="tag"
          rules={[
            {
              required: true,
              message: 'Please input tags name!',
            },
          ]}
        >
          <Space>
            <Input placeholder="tag name" ref={inputRef} />
            <Button
              type="text"
              className="d-flex align-items-center"
              htmlType="submit"
              icon={<PlusOutlined />}
              loading={loading}
              disabled={loading}
            >
              Add tag
            </Button>
          </Space>
        </Form.Item>
      </Space>
    </Form>
  );
};
