import React, { useEffect, useState } from "react";
import { Form, Upload } from "antd";
import ImgCrop from "antd-img-crop";
import { IImageUpload } from "../../types/types";
import { Controller, useForm } from "react-hook-form";
import APIClientService from "../../api";
import { updateListImageRemove, updateListImages } from "../redux/Slices/productSlice";
import { useDispatch, useSelector } from "react-redux";

const getSrcFromFile = (file: any) => {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.readAsDataURL(file.originFileObj);
    reader.onload = () => resolve(reader.result);
  });
};

const ImageUpload: React.FC<IImageUpload> = ({ styleClassName, maxNumberOfFiles, multiple, listFileUpdate, status }) => {
  const { control } = useForm<any>();
  const [fileList, setFileList] = useState<any>([]);
  const [listPath, setListPath] = useState<any>([]);
  const { listImages } = useSelector((state: any) => state.product);
  const { Dragger }: { Dragger: any } = Upload;
  const dispatch = useDispatch();

  useEffect(() => {
    if (status === "update") {
      if (listFileUpdate.length > 0) {
        const data = listFileUpdate.map((item: any) => {
          return {
            uid: item.public_id,
            name: item.name,
            status: "done",
            url: item.secure_url,
          };
        });
        setFileList(data);
      } else setFileList([]);
    }
  }, [listFileUpdate, status]);

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

  const onRemove = (file: any) => {
    for (let item of listPath) {
      if (item.name === file.name) {
        const newListPath = listPath.filter((item: any) => item.name !== file.name);
        setListPath(newListPath);
      }
    }
    for (let item of fileList) {
      if (item.name === file.name) {
        const newFileList = fileList.filter((item: any) => item.name !== file.name);
        setFileList(newFileList);
      }
    }
    if (listFileUpdate?.length > 0) {
      dispatch(updateListImageRemove(file));
    }
  };

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
  console.log("listPath: ", listPath);
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
          listType="picture-card"
          className={styleClassName}
          fileList={fileList}
          onChange={onChange}
          onPreview={onPreview}
          onRemove={onRemove}
        >
          {(fileList.length < (maxNumberOfFiles || 1) || listImages.length < (maxNumberOfFiles || 1)) && "+ Upload"}
        </Upload>
      )}
    />
  );
};

ImageUpload.defaultProps = {
  maxNumberOfFiles: 1,
};

export default ImageUpload;
