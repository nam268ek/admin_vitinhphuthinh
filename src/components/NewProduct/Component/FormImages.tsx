import { Button } from 'antd';
import React, { useState } from 'react';
import { ImageUploadV2 } from '../../ImageUpload/ImageUploadV2';
import { ListImages } from './ListImages';

export const FormProductImages: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const openSelectImages = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <figure className="ps-block--form-box">
      <figcaption className="header-image">
        <span>Product Images</span>
        <Button type="primary" onClick={openSelectImages}>
          Select images
        </Button>
        <ListImages open={isModalOpen} setOpen={setIsModalOpen} />
      </figcaption>
      <div className="ps-block__content">
        <div className="form-group m-0">
          <label>Thumbnail Sản phẩm</label>
          <div className="form-group--nest">
            <ImageUploadV2 />
          </div>
        </div>
      </div>
    </figure>
  );
};
