import React, { useState } from "react";
import { Upload } from "antd";
import ImgCrop from "antd-img-crop";
import { IImageUpload } from "../../types/types";
import { Controller, useForm } from "react-hook-form";
import APIClientService from "../../api";

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
  const uploadImage = async (options: any) => {
    const { onSuccess, onError, file, onProgress } = options;
    const fmData = new FormData();

    fmData.append("img", file);
    try {
      console.log(fmData);
      console.log(file);
      const result: any = await APIClientService.uploadFile(fmData);
      onSuccess("Ok");
      console.log("server res: ", result);
    } catch (err) {
      console.log("Eroor: ", err);
      const error = new Error("Some error");
      onError({ err });
    }
  };
  return (
    <ImgCrop rotate>
      <Upload
        accept="image/*"
        customRequest={uploadImage}
        listType="picture-card"
        className={styleClassName}
        fileList={fileList}
        onChange={onChange}
        onPreview={onPreview}
        multiple={multiple}
      >
        {fileList.length < (maxNumberOfFiles || 1) && "+ Upload"}
      </Upload>
    </ImgCrop>
  );
};

ImageUpload.defaultProps = {
  maxNumberOfFiles: 1,
};

export default ImageUpload;
