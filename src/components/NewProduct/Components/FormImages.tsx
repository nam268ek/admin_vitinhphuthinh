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
    <figure>
      <figcaption className="rounded-t-md font-semibold text-base bg-blue-200 px-6 py-3 flex items-center justify-between">
        <span>Product Images</span>
        <Button type="primary" size="small" onClick={openSelectImages}>
          Images
        </Button>
        <ListImages open={isModalOpen} setOpen={setIsModalOpen} />
      </figcaption>
      <div className="rounded-b-md px-6 py-4 border border-solid border-gray-200 border-t-0">
        <label className="mb-3 text-sm font-normal">Thumbnail Sản phẩm</label>
        <div className="pt-2">
          <ImageUploadV2 />
        </div>
      </div>
    </figure>
  );
};
