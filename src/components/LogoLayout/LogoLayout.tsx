import { Form } from 'antd';
import React from 'react';
import { useSelector } from 'react-redux';
import ImageUploadSingle from '../ImageUpload/ImageUploadSingle';

const LogoLayout: React.FC<any> = () => {
  const { layout } = useSelector((state: any) => state.layout);

  return (
    <div className="ps-block__layout w-100">
      <Form className="d-flex w-100">
        <div className="w-50">
          <div className="form-group--left">
            <div className="background-content">
              <label>
                Logo top | <span className="highlight">530</span>px x <span className="highlight">285</span>px
              </label>
              <div className="form-group--nest">
                <ImageUploadSingle styleClassName="upload-image-home" feature="b9" listImages={layout.b9} />
              </div>
            </div>
          </div>
        </div>
        <div className="w-50">
          <div className="form-group--left">
            <div className="background-content">
              <label>
                Logo footer | <span className="highlight">530</span>px x <span className="highlight">285</span>px
              </label>
              <div className="form-group--nest">
                <ImageUploadSingle styleClassName="upload-image-home" feature="b10" listImages={layout.b10} />
              </div>
            </div>
          </div>
        </div>
      </Form>
    </div>
  );
};
export default LogoLayout;
