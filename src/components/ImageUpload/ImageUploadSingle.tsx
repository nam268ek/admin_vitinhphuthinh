import { PlusOutlined } from "@ant-design/icons";
import { Form, message, Modal, Upload } from "antd";
import type { RcFile, UploadProps } from "antd/es/upload";
import type { UploadFile } from "antd/es/upload/interface";
import React, { useState } from "react";
import APIClientService from "../../api";
import { useDispatch } from "react-redux";
import { removeFileLayout, SetCurrentLayoutState, uploadFileLayoutSingle } from "../redux/Slices/layoutSlice";
import { removeFileImgToCloud } from "../redux/Slices/productSlice";

const getBase64 = (file: RcFile): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });

const ImageUploadSingle: React.FC<any> = ({ maxNumberOfFiles, multiple, feature, listImages }) => {
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const dispatch = useDispatch();

  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as RcFile);
    }
  };

  React.useEffect(() => {
    if (listImages) {
      setFileList(listImages);
    }
  }, [listImages]);

  const handleChange: UploadProps["onChange"] = ({ fileList: newFileList }) => setFileList(newFileList);

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  const uploadImage = async (options: any) => {
    const { onSuccess, onError, file } = options;
    try {
      const fmData = new FormData();
      fmData.append(feature, file);
      if (feature) {
        dispatch(SetCurrentLayoutState(feature));
        const resLayout = await dispatch(uploadFileLayoutSingle(fmData));
        if (resLayout.payload.code === 200) {
          onSuccess();
        } else onError();
      }
    } catch (err) {
      message.error("Upload failed");
      onError();
    }
  };

  const onRemove = (file: any) => {
    if (feature) {
      dispatch(SetCurrentLayoutState(feature));
      dispatch(removeFileLayout(file));
    }
  };

  return (
    <>
      <Form.Item name="img">
        <Upload
          //   action={`${process.env.REACT_APP_PROD_API_URL}v1/layout`}
          customRequest={uploadImage}
          listType="picture-card"
          fileList={fileList}
          onPreview={handlePreview}
          onChange={handleChange}
          onRemove={onRemove}
        >
          {fileList.length >= (maxNumberOfFiles || 1) ? null : uploadButton}
        </Upload>
      </Form.Item>
    </>
  );
};

export default ImageUploadSingle;