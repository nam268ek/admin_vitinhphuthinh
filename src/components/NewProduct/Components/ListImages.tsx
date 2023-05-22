/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable curly */
import { Button, Checkbox, Divider, Form, Image, message, Modal, Pagination, PaginationProps, Space, Spin } from 'antd';
import { CheckboxChangeEvent } from 'antd/es/checkbox/Checkbox';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { PER_PAGE } from '../../../constants/const';
import { getListImageService, getRemoveImageUploadService, setImageAction } from '../../redux/Slices/ImageSlice';
import { RootState } from '../../redux/store/store';
import { openMessage } from '../../services/general.service';

interface ImageModalProps {
  open: boolean;
  setOpen: any;
  nameField: string;
  onChange: (data: any, key: string, action: string) => void;
  maxSelect?: number;
}

export const ListImages: React.FC<ImageModalProps> = ({ open, setOpen, nameField, onChange, maxSelect }) => {
  const { images, loading, totalPages } = useSelector((state: RootState) => state.image);
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

  const onChangeCheckbox = (e: CheckboxChangeEvent, idSelected: string) => {
    if (e.target.checked && e.target.id) {
      const listNewIds = [];
      listNewIds.push(e.target.id);
      setSelectedIds([...selectedIds, ...listNewIds]);
    }
    if (!e.target.checked && e.target.id) {
      const listNewIds = selectedIds?.filter((id) => id !== e.target.id);
      setSelectedIds(listNewIds);
    }
    onChange(idSelected, nameField, e.target.checked ? 'add' : 'remove');
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

  const onChangePage: PaginationProps['onChange'] = async (page: number) => {
    try {
      await dispatch(getListImageService({ pageNumber: page, nPerPage: PER_PAGE })).unwrap();
    } catch (error) {
      openMessage(error);
    }
    console.log(page);
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
          <div className="rounded-md font-medium bg-blue-600 px-5 h-8 flex items-center justify-center">
            <p className="text-sm text-zinc-100 m-0 ">
              <span className="text-base text-white font-medium">
                {selectedIds.length}/{maxSelect} ảnh đã chọn
              </span>
            </p>
          </div>
          <Button key="back" type="default" onClick={handleCancel}>
            Cancel
          </Button>
          <Button
            key="submit"
            type="primary"
            disabled={maxSelect && selectedIds.length > maxSelect ? true : false}
            onClick={handleSelectImages}
          >
            Submit
          </Button>
        </Space>,
      ]}
    >
      <div id="list-image-model">
        <Pagination className="flex justify-center" onChange={onChangePage} pageSize={PER_PAGE} total={totalPages} />
        <Divider />
        <div>
          <Spin size="large" spinning={loading}>
            <Form form={form} className="flex gap-4 flex-wrap">
              {images?.map((img) => (
                <div key={img.keyId} className="p-3 border rounded-md border-solid border-gray-200">
                  <div className="flex flex-col items-center gap-1">
                    <Image width={100} height={100} src={img?.url} />
                    <Form.Item name={img?.keyId} noStyle valuePropName="checked">
                      <Checkbox key={img?.id} onChange={(e) => onChangeCheckbox(e, img?.id)} />
                    </Form.Item>
                  </div>
                </div>
              ))}
            </Form>
          </Spin>
        </div>
        <Divider />
      </div>
    </Modal>
  );
};
