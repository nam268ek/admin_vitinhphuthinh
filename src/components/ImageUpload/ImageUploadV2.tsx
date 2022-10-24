import { PlusOutlined } from '@ant-design/icons';
import { Form, message, Upload } from 'antd';
import type { RcFile, UploadProps } from 'antd/es/upload';
import type { UploadFile } from 'antd/es/upload/interface';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { KEY_UPLOAD_IMAGE } from '../../constants/const';
import { IImage } from '../../types/types';
import { getUploadImageService } from '../redux/Slices/ImageSlice';
import { removeFileLayout, uploadFileLayoutSingle } from '../redux/Slices/LayoutSlice';
import { RootState } from '../redux/store/store';
import { convertTypeUploadImageList, openMessage } from '../services/general.service';

const getBase64 = (file: RcFile): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });

export const ImageUploadV2: React.FC<any> = ({
  maxFiles,
  keyUpload = KEY_UPLOAD_IMAGE.IMAGE_PRODUCT,
}) => {
  const { imageUploaded } = useSelector((state: RootState) => state.image);

  const dispatch = useDispatch();
  const listImageUpload = convertTypeUploadImageList(imageUploaded);

  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as RcFile);
    }
  };

  //   const handleChange: UploadProps['onChange'] = ({ fileList: newFileList }) =>
  //     setFileList(newFileList);

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  const handleUploadImage = async (options: any) => {
    const { onSuccess, onError, file } = options;

    const formData = new FormData();
    formData.append('file', file);
    formData.append('keyName', keyUpload);

    try {
      await dispatch(getUploadImageService(formData)).unwrap();
      onSuccess();
    } catch (error) {
      openMessage(error);
      onError();
    }
  };

  const onRemove = async (file: UploadFile) => {
    if (keyUpload) {
      // dispatch(SetCurrentLayoutState(feature));
      const res = await dispatch(removeFileLayout(file));
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

  return (
    <Form.Item name="images">
      <Upload
        customRequest={handleUploadImage}
        listType="picture-card"
        fileList={listImageUpload}
        onPreview={handlePreview}
        // onChange={handleChange}
        onRemove={onRemove}
        beforeUpload={beforeUpload}
      >
        {imageUploaded.length >= (maxFiles || 1) ? null : uploadButton}
      </Upload>
    </Form.Item>
  );
};
