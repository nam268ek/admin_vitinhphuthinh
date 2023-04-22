import { Button } from 'antd';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ImageUploadV2 } from '../../ImageUpload/ImageUploadV2';
import { getListImageService } from '../../redux/Slices/ImageSlice';
import { RootState } from '../../redux/store/store';
import { openMessage } from '../../services/general.service';
import { ListImages } from './ListImages';

interface FormProductImagesProps {
  onChange: (data: any, key: string, action: string) => void;
}

export const FormProductImages: React.FC<FormProductImagesProps> = ({ onChange }) => {
  const { loading } = useSelector((state: RootState) => state.image);
  const { errors } = useSelector((state: RootState) => state.product);

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const dispatch = useDispatch();

  const openSelectImages = async () => {
    try {
      await dispatch(getListImageService()).unwrap();
      setIsModalOpen(!isModalOpen);
    } catch (error) {
      openMessage(error);
    }
  };

  return (
    <figure>
      <figcaption className="rounded-t-md font-semibold text-base bg-blue-200 px-6 py-3 flex items-center justify-between">
        <span>Product Images</span>
        <Button type="primary" size="small" onClick={openSelectImages} loading={loading}>
          Images
        </Button>
        <ListImages maxSelect={3} open={isModalOpen} setOpen={setIsModalOpen} onChange={onChange} />
      </figcaption>
      <div className="rounded-b-md px-6 py-4 border border-solid border-gray-200 border-t-0">
        <label className="mb-3 text-sm font-normal">Thumbnail Sản phẩm</label>
        <div className="pt-2">
          <ImageUploadV2 name="images" onChange={onChange} />
          {errors['images'] && <span className="text-red-500">{errors['images']}</span>}
        </div>
      </div>
    </figure>
  );
};
