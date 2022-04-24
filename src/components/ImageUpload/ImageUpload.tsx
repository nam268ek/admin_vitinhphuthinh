import React, { useEffect, useState } from "react";
import { Upload } from "antd";
import ImgCrop from "antd-img-crop";
import { IImageUpload } from "../../types/types";
import { Controller, useForm } from "react-hook-form";
import APIClientService from "../../api";
import { updateListImages } from "../redux/Slices/productSlice";
import { useDispatch } from "react-redux";

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
}) => {
  const { control } = useForm<any>();
  const [fileList, setFileList] = useState<any>([]);
  const [listPath, setListPath] = useState<any>([]);
  const { Dragger }: { Dragger: any } = Upload;
  const dispatch = useDispatch();

  const onChange = ({ fileList }: { fileList: any }) => {
    setFileList(fileList);
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

  const onRemove = ( file: any ) => {
    for(let item of listPath) {
      if(item.name === file.name) {
        const newListPath = listPath.filter((item: any) => item.name !== file.name);
        setListPath(newListPath);
      }
    }
    for(let item of fileList) {
      if(item.name === file.name) {
        const newFileList = fileList.filter((item: any) => item.name !== file.name);
        setFileList(newFileList);
      }
    }
  }

  const uploadImage = async (options: any) => {
    const { onSuccess, onError, file } = options;
    const fmData = new FormData();

    fmData.append("img", file);
    try {
      console.log(file);
      const result: any = await APIClientService.uploadFile(fmData);
      setListPath([...listPath, result]);
      onSuccess("Ok");
      console.log("server res: ", result);
    } catch (err) {
      console.log("Eroor: ", err);
      const error = new Error("Some error");
      onError({ err });
    }
  };

  useEffect(() => {
    dispatch(updateListImages(listPath));
  }, [listPath, dispatch]);

  return (
    // <ImgCrop rotate>
    <Controller
      name="sku"
      defaultValue=""
      control={control}
      render={({ field }) => (
        <Upload
          {...field}
          accept="image/*"
          customRequest={uploadImage}
          // action={action.url}
          // action={process.env.REACT_APP_DEV_API_URL + "image-upload"}
          listType="picture-card"
          className={styleClassName}
          fileList={fileList}
          onChange={onChange}
          onPreview={onPreview}
          onRemove={onRemove}
        >
          {fileList.length < (maxNumberOfFiles || 1) && "+ Upload"}
        </Upload>
      )}
    />

    // </ImgCrop>
    // <Dragger
    //   accept="image/*"
    //   customRequest={uploadImage}
    //   multiple={true}
    //   // action={action.url}
    //   // action={process.env.REACT_APP_DEV_API_URL + "image-upload"}
    //   listType="picture-card"
    //   className={styleClassName}
    //   fileList={fileList}
    //   onChange={onChange}
    //   onPreview={onPreview}
    // ></Dragger>
  );
};

ImageUpload.defaultProps = {
  maxNumberOfFiles: 1,
};

export default ImageUpload;
