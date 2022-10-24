import React from 'react';
import { ImageUploadV2 } from '../../ImageUpload/ImageUploadV2';

export const FormProductImages: React.FC = () => {
  return (
    <figure className="ps-block--form-box">
      <figcaption>Product Images</figcaption>
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
