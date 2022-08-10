import { Modal } from "antd";
import React from "react";
import { useSelector } from "react-redux";
import ImageUploadSingle from "../ImageUpload/ImageUploadSingle";

const LogoLayout: React.FC<any> = ({ titleModel, modalVisible, onOk, onCancel }) => {
  const { layout } = useSelector((state: any) => state.layout);

  return (
    <Modal title={titleModel} visible={modalVisible} onOk={onOk} onCancel={onCancel}>
      <div className="ps-block__layout">
        <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12">
          <div className="form-group--left">
            <div className="background-content">
              <label>
                Logo top | <span className="highlight">530</span>px x <span className="highlight">285</span>px
              </label>
              <div className="form-group--nest">
                <ImageUploadSingle styleClassName="upload-image-home" feature="b6" listImages={layout.b9} />
              </div>
            </div>
          </div>
        </div>
        <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12">
          <div className="form-group--left">
            <div className="background-content">
              <label>
                Logo footer | <span className="highlight">530</span>px x <span className="highlight">285</span>px
              </label>
              <div className="form-group--nest">
                <ImageUploadSingle styleClassName="upload-image-home" feature="b7" listImages={layout.b10} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};
export default LogoLayout;
