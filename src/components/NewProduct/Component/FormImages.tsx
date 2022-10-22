import React from 'react';

export const FormProductImages: React.FC = () => {
  return (
    <figure className="ps-block--form-box">
      <figcaption>Product Images</figcaption>
      <div className="ps-block__content">
        <div className="form-group m-0">
          <label>Thumbnail Sản phẩm</label>
          <div className="form-group--nest">
            {/* <ImageUploadCloud maxNumberOfFiles={3} listImages={listImages} status={action} /> */}

            {/* <ImageUpload maxNumberOfFiles={3} listFileUpdate={dataUpdate[0] ? dataUpdate[0].img : []} status={action} /> */}
          </div>
        </div>
      </div>
    </figure>
  );
};
