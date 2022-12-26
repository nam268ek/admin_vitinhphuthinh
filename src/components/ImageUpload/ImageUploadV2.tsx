/* eslint-disable no-constant-condition */
import { PlusOutlined } from '@ant-design/icons';
import { message, Modal, Upload } from 'antd';
import type { RcFile } from 'antd/es/upload';
import type { UploadFile } from 'antd/es/upload/interface';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { UPLOAD_KEY } from '../../constants/const';
import { ImageUploadModalProps } from '../../types/types';
import {
  getRemoveImageUploadService,
  getUploadImageService,
  updateImageUploadedAction,
} from '../redux/Slices/ImageSlice';
import { RootState } from '../redux/store/store';
import { convertTypeUploadImageList, openMessage } from '../services/general.service';

const getBase64 = (file: RcFile): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });

export const ImageUploadV2: React.FC<ImageUploadModalProps> = ({
  maxFiles = 3,
  onChange,
  name,
  keyUpload = UPLOAD_KEY.IMAGE_PRODUCT,
}) => {
  const { imageUploaded, loading } = useSelector((state: RootState) => state.image);

  const [previewOpen, setPreviewOpen] = useState<boolean>(false);
  const [itemPreview, setItemPreview] = useState<any>();

  const dispatch = useDispatch();
  const listImageUpload = convertTypeUploadImageList(imageUploaded);

  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as RcFile);
    }
    if (file.url) {
      setItemPreview(file);
      setPreviewOpen(true);
    }
  };

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  const handleUploadImage = async (options: any) => {
    const { onSuccess, onError, file } = options;
    const key = 'upload';

    const formData = new FormData();
    formData.append('file', file);
    formData.append('keyName', keyUpload);

    try {
      message.loading({ content: 'Uploading...', key });
      const response = await dispatch(getUploadImageService(formData)).unwrap();

      onSuccess('Ok');
      message.destroy(key);
      onChange(response, name, 'upload');
    } catch (error) {
      openMessage(error, key);
      const err = new Error('Error upload');
      onError({ err });
    }
  };

  const onRemove = async (file: UploadFile) => {
    const key = 'remove';
    try {
      message.loading({ content: 'Removing...', key });
      await dispatch(getRemoveImageUploadService({ ids: [file.uid] })).unwrap();
      dispatch(updateImageUploadedAction({ keyId: file.uid }));
      openMessage(undefined, key);
      onChange({ keyId: file.uid }, name, 'remove');
    } catch (error) {
      openMessage(error, key);
    }
  };

  const beforeUpload = (file: RcFile) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isJpgOrPng) {
      message.error('Bạn chỉ có thể upload file JPG/PNG.');
    } else if (!isLt2M) {
      message.error('Kích thước ảnh không quá 2MB.');
    }
    return isJpgOrPng && isLt2M;
  };

  const handleCancel = () => setPreviewOpen(false);

  return (
    <>
      <Upload
        customRequest={handleUploadImage}
        listType="picture-card"
        fileList={listImageUpload}
        onPreview={handlePreview}
        onRemove={onRemove}
        beforeUpload={beforeUpload}
        disabled={loading}
      >
        {imageUploaded.length >= (maxFiles || 1) ? null : uploadButton}
      </Upload>
      <Modal open={previewOpen} title={itemPreview?.name} footer={null} onCancel={handleCancel}>
        <img alt="example" style={{ width: '100%' }} src={itemPreview?.thumbUrl} />
      </Modal>
    </>
  );
};
