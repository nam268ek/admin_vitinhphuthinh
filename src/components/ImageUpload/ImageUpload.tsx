/* eslint-disable @typescript-eslint/no-shadow */
import React, { useEffect, useState } from 'react';
import { Form, message, Upload } from 'antd';
import ImgCrop from 'antd-img-crop';
import { IImageUpload } from '../../types/types';
import { Controller, useForm } from 'react-hook-form';
import { requestService } from '../../api';
// import { updateListImages } from '../redux/Slices/ProductSlice';
import { useDispatch, useSelector } from 'react-redux';
import { updateListImageRemoveLayout, updateListImagesLayout } from '../redux/Slices/LayoutSlice';

const getSrcFromFile = (file: any) => {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.readAsDataURL(file.originFileObj);
    reader.onload = () => resolve(reader.result);
  });
};

const ImageUpload: React.FC<IImageUpload> = ({
  styleClassName,
  maxNumberOfFiles,
  multiple,
  listFileUpdate,
  status,
  feature,
}) => {
  const { control } = useForm<any>();
  const [fileList, setFileList] = useState<any>(() => {
    if (status === 'update') {
      if (listFileUpdate.length > 0) {
        const data = listFileUpdate.map((item: any) => {
          return {
            uid: item.public_id,
            name: item.name,
            status: 'done',
            url: item.secure_url,
          };
        });
        return data;
      } else {
        return [];
      }
    } else {
      return [];
    }
  });
  const [listPath, setListPath] = useState<any>([]);
  const [isValid, setIsValid] = useState<boolean>(false);
  const { listImages } = useSelector((state: any) => state.product);
  const { Dragger }: { Dragger: any } = Upload;
  const dispatch = useDispatch();

  // useEffect(() => {
  //   if (status === "update") {
  //     if (listFileUpdate.length > 0) {
  //       const data = listFileUpdate.map((item: any) => {
  //         return {
  //           uid: item.public_id,
  //           name: item.name,
  //           status: "done",
  //           url: item.secure_url,
  //         };
  //       });
  //       setFileList(data);
  //     } else setFileList([]);
  //   }
  // }, [listFileUpdate, status]);

  const onChange = ({ fileList }: { fileList: any }) => {
    isValid && setFileList(fileList);
    console.log(fileList);
  };

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
    if (file.hasOwnProperty('uidFile')) {
      for (const item of listPath) {
        if (item.uid === file.uid) {
          const newListPath = listPath.filter((item: any) => item.uidFile !== file.uidFile);
          setListPath(newListPath);
        }
      }
      for (const item of fileList) {
        if (item.uid === file.uid) {
          const newFileList = fileList.filter((item: any) => item.uidFile !== file.uidFile);
          setFileList(newFileList);
        }
      }
    }
    if (file.hasOwnProperty('uid')) {
      for (const item of listPath) {
        if (item.uid === file.uid) {
          const newListPath = listPath.filter((item: any) => item.uid !== file.uid);
          setListPath(newListPath);
        }
      }
      for (const item of fileList) {
        if (item.uid === file.uid) {
          const newFileList = fileList.filter((item: any) => item.uid !== file.uid);
          setFileList(newFileList);
        }
      }
    }
    if (listFileUpdate?.length > 0) {
      if (feature) {
        dispatch(updateListImageRemoveLayout({ file, feature }));
      }
    }
  };

  const uploadImage = async (options: any) => {
    const { onSuccess, onError, file } = options;
    try {
      const fmData = new FormData();
      fmData.append('img', file);
      console.log(file);
      const result: any = await requestService.uploadFile(fmData);
      if (result.code === 200) {
        const resImg = {
          uidFile: file.uid,
          name: result.data.name,
          status: result.data.status,
          url: result.data.url,
          thumbUrl: result.data.thumbUrl,
          path: result.data.path,
        };
        setListPath([...listPath, resImg]);
        onSuccess('Ok');
      }
      console.log('server res: ', result);
    } catch (err) {
      message.error('Upload failed');
      const error = new Error('Some error');
      onError({ err });
    }
  };

  useEffect(() => {
    // dispatch(updateListImages(listPath));
    if (feature) {
      dispatch(updateListImagesLayout({ listPath, feature }));
    }
  }, [listPath, dispatch, feature]);

  console.log('listPath: ', listPath);

  const beforeUpload = (file: any) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isJpgOrPng) {
      setIsValid(false);
      message.error('Bạn chỉ có thể upload JPG/PNG file!');
    } else if (!isLt2M) {
      setIsValid(false);
      message.error('Kích thước ảnh không quá 2MB!');
    } else {
      setIsValid(true);
    }
    return isJpgOrPng && isLt2M;
  };

  const onUploadFail = (err: any) => {
    console.log('err: ', err);
  };
  const test = fileList.length < (maxNumberOfFiles || 1) ? true : false;
  console.log(test);
  return (
    <Form.Item name="img">
      <ImgCrop modalWidth={850} beforeCrop={beforeUpload} onUploadFail={onUploadFail}>
        <Upload
          accept="image/*"
          customRequest={uploadImage}
          listType="picture-card"
          className={styleClassName}
          fileList={fileList}
          onChange={onChange}
          onPreview={onPreview}
          onRemove={onRemove}
        >
          {fileList.length < (maxNumberOfFiles || 1) && '+ Upload'}
        </Upload>
      </ImgCrop>
    </Form.Item>
  );
};

ImageUpload.defaultProps = {
  maxNumberOfFiles: 1,
};

export default ImageUpload;
