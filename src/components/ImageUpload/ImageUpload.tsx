import React, { useState } from "react";
import { Upload } from "antd";
import ImgCrop from "antd-img-crop";

const getSrcFromFile = (file: any) => {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.readAsDataURL(file.originFileObj);
    reader.onload = () => resolve(reader.result);
  });
};

const ImageUpload: React.FC = () => {
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

  return (
    <ImgCrop rotate>
      <Upload
        action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
        listType="picture-card"
        fileList={fileList}
        onChange={onChange}
        onPreview={onPreview}
      >
        {fileList.length < 3 && "+ Upload"}
      </Upload>
    </ImgCrop>
  );
};

export default ImageUpload;
