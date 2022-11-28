import { Form, message, Upload } from 'antd';
import ImgCrop from 'antd-img-crop';
import React from 'react';
import { IImageUpload } from '../../types/types';
// import APIClientService from '../../api';
// import {
//   removeFileImgToCloud,
//   setImageTempProduct,
//   updateListImages,
//   uploadFileImgToCloud,
// } from '../redux/Slices/ProductSlice';
import { PlusOutlined } from '@ant-design/icons';
import { useDispatch } from 'react-redux';
import {
  removeFileLayout,
  setImageTempLayout,
  uploadFileLayout,
} from '../redux/Slices/LayoutSlice';

const getSrcFromFile = (file: any) => {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.readAsDataURL(file.originFileObj);
    reader.onload = () => resolve(reader.result);
  });
};

const ImageUploadCloud: React.FC<IImageUpload> = ({
  styleClassName,
  maxNumberOfFiles,
  multiple,
  listImages,
  status,
  feature,
  isCropImg,
}) => {
  // const { listImages } = useSelector((state: any) => state.product);
  const dispatch = useDispatch();

  const onPreview = async (file: any) => {
    const src = file.url || (await getSrcFromFile(file));
    const imgWindow = window.open(src);

    if (imgWindow) {
      const image = new Image();
      image.src = src;
      imgWindow.document.write(image.outerHTML);
    } else {
      window.location.href = src;
    }
  };

  const onRemove = (file: any) => {
    if (feature) {
      // dispatch(SetCurrentLayoutState(feature));
      dispatch(removeFileLayout(file.uid));
    }
    // dispatch(removeFileImgToCloud(file.uid));
  };

  const uploadImage = async (options: any) => {
    const { onSuccess, onError, file } = options;
    try {
      const fmData = new FormData();
      fmData.append('image_product', file);
      if (feature) {
        // dispatch(SetCurrentLayoutState(feature));
        const resLayout = await dispatch(uploadFileLayout(fmData));
        if (resLayout.payload.code === 200) {
          dispatch(setImageTempLayout({ name: 'imgLayout', data: resLayout.payload.data }));
        }
      } else {
        // const resProduct = await dispatch(uploadFileImgToCloud(fmData));
        // if (resProduct.payload.code === 200) {
        //   // dispatch(setImageTempProduct({ name: 'imgProducts', data: resProduct.payload.data }));
        // }
      }
      onSuccess('Ok');
    } catch (err) {
      message.error('Upload failed');
      onError({ err });
    }
  };

  const beforeUpload = (file: any) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isJpgOrPng) {
      message.error('Bạn chỉ có thể upload file JPG/PNG.');
    } else if (!isLt2M) {
      message.error('Kích thước ảnh không quá 2MB.');
    }
    return isJpgOrPng && isLt2M;
  };

  const onUploadFail = (err: any) => {
    console.log('err: ', err);
  };

  return (
    <Form.Item name="images">
      {isCropImg ? (
        <ImgCrop modalWidth={850} beforeCrop={beforeUpload} onUploadFail={onUploadFail}>
          <Upload
            accept="image/*"
            customRequest={uploadImage}
            listType="picture-card"
            className={styleClassName}
            fileList={listImages}
            onPreview={onPreview}
            onRemove={onRemove}
          >
            {listImages.length < (maxNumberOfFiles || 1) && (
              <div>
                <PlusOutlined />
                <div style={{ marginTop: 8 }}>Upload</div>
              </div>
            )}
          </Upload>
        </ImgCrop>
      ) : (
        <Upload
          accept="image/*"
          customRequest={uploadImage}
          listType="picture-card"
          className={styleClassName}
          fileList={listImages}
          onPreview={onPreview}
          onRemove={onRemove}
        >
          {listImages.length < (maxNumberOfFiles || 1) && (
            <div>
              <PlusOutlined />
              <div style={{ marginTop: 8 }}>Upload</div>
            </div>
          )}
        </Upload>
      )}
    </Form.Item>
  );
};

ImageUploadCloud.defaultProps = {
  maxNumberOfFiles: 1,
};

export default ImageUploadCloud;
