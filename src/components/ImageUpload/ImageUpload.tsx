import React, { useState } from "react";
import { Upload } from "antd";
import ImgCrop from "antd-img-crop";
import { IImageUpload } from "../../types/types";

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
