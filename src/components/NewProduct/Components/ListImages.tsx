/* eslint-disable curly */
import { Button, Checkbox, Form, Image, message, Modal } from 'antd';
import React from 'react';
import { MdDeleteForever } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import {
  getListImageService,
  getRemoveImageUploadService,
  setImageAction,
} from '../../redux/Slices/ImageSlice';
import { RootState } from '../../redux/store/store';
import { openMessage } from '../../services/general.service';
import { Space } from 'antd';

export const ListImages: React.FC<any> = ({ open, setOpen }) => {
  const { images, loading } = useSelector((state: RootState) => state.image);
  const [selectedIds, setSelectedIds] = React.useState<string[]>([]);
  const hasSelected = selectedIds.length > 0 && images.length > 0;
  const [form] = Form.useForm();
  const dispatch = useDispatch();

  const handleSelectImages = () => {
    const listSelected = images.filter((item) => {
      return selectedIds.indexOf(item.keyId) > -1;
    });
    dispatch(setImageAction(listSelected));
    setOpen(false);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  const onChangeCheckbox = () => {
    const list = form.getFieldsValue();
    const selected = [];
    for (const i in list) {
      if (list[i]) selected.push(i);
    }
    setSelectedIds(selected);
  };

  const handleDelete = async () => {
    const key = 'remove';
    try {
      message.loading({ content: 'Removing...', key });
      await dispatch(getRemoveImageUploadService({ ids: selectedIds })).unwrap();
      await dispatch(getListImageService()).unwrap();
      openMessage(undefined, key);
    } catch (error) {
      openMessage(error, key);
    }
  };

  const handleReset = () => {
    form.resetFields();
    setSelectedIds([]);
  };

  return (
    <Modal
      title="List Images"
      width={'80%'}
      open={open}
      onCancel={handleCancel}
      className="model-image"
      footer={[
        <Space key="footer">
          <Button
            key="dropdown"
            disabled={!hasSelected}
            className={!hasSelected ? 'disabled-item' : 'show-item'}
            icon={<MdDeleteForever size={20} />}
            onClick={handleDelete}
            loading={loading}
          ></Button>

          <Button key="reset" type="dashed" onClick={handleReset}>
            Reset
          </Button>

          <Button key="back" type="default" onClick={handleCancel}>
            Cancel
          </Button>

          <Button key="submit" type="primary" onClick={handleSelectImages}>
            Submit
          </Button>
        </Space>,
      ]}
    >
      <div id="list-image-model">
        <div>
          <Form form={form} className="flex gap-4 flex-wrap">
            {images?.map((img) => (
              <div key={img.keyId} className="p-3 border rounded-md border-solid border-gray-200">
                <div className="flex flex-col items-center gap-1">
                  <Image width={100} height={100} src={img?.url} />
                  <Form.Item name={img?.keyId} noStyle valuePropName="checked">
                    <Checkbox key={img?.keyId} onChange={onChangeCheckbox} />
                  </Form.Item>
                </div>
              </div>
            ))}
          </Form>
        </div>
      </div>
    </Modal>
  );
};
