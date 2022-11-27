import { UploadOutlined } from '@ant-design/icons';
import { Button, Form, message, Upload } from 'antd';
import { RcFile, UploadFile } from 'antd/es/upload';
import axios from 'axios';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { UPLOAD_KEY } from '../../../constants/const';
import {
  getRemoveImageUploadService,
  getUploadImageCustomService,
  updateImageUploadedAction,
} from '../../redux/Slices/ImageSlice';
import { RootState } from '../../redux/store/store';
import { openMessage } from '../../services/general.service';

export const FormUploadImage = () => {
  const { loading } = useSelector((state: RootState) => state.image);

  const [progress, setProgress] = useState<number>(0);

  const dispatch = useDispatch();

  const handleCustomRequest = async (options: any) => {
    const { onSuccess, onError, file, onProgress } = options;

    const fmData = new FormData();
    const config = {
      headers: { 'content-type': 'multipart/form-data' },
      onUploadProgress: (event: any) => {
        const percent = Math.floor((event.loaded / event.total) * 100);
        if (percent === 100) {
          setTimeout(() => setProgress(0), 1000);
        }
        onProgress({ percent: (event.loaded / event.total) * 100 });
      },
    };

    fmData.append('file', file);
    fmData.append('keyName', UPLOAD_KEY.IMAGE_BLOG);

    const key = 'upload';
    try {
      message.loading({ content: 'Uploading...', key });
      await dispatch(getUploadImageCustomService({ data: fmData, config })).unwrap();
      onSuccess('Ok');
      openMessage(undefined, key);
    } catch (err) {
      openMessage(err, key);
      onError({ err });
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

  const onRemove = async (file: UploadFile) => {
    const key = 'remove';
    try {
      message.loading({ content: 'Removing...', key });
      await dispatch(getRemoveImageUploadService({ ids: [file.uid] })).unwrap();
      dispatch(updateImageUploadedAction({ keyId: file.uid }));
      openMessage(undefined, key);
    } catch (error) {
      openMessage(error, key);
    }
  };

  return (
    <Form.Item>
      <Upload
        customRequest={handleCustomRequest}
        beforeUpload={beforeUpload}
        disabled={loading}
        onRemove={onRemove}
        listType="picture-card"
        className="image-upload-grid"
      ></Upload>
    </Form.Item>
  );
};
