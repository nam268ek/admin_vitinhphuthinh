import { Form, Modal } from "antd";
import React from "react";
import { useSelector } from "react-redux";
import ImageUploadSingle from "../ImageUpload/ImageUploadSingle";
import InfoFooter from "../InfoFooter/InfoFooter";
import LogoLayout from "../LogoLayout/LogoLayout";
import Policy from "../Policy/Policy";

const Settings: React.FC = () => {
  const [modalVisible, setModalVisible] = React.useState<boolean>(false);
  const [numberFunc, setNumberFunc] = React.useState<number>(0);
  const childRef = React.useRef<any>(null);

  const handleOpenModel = (stt: number) => {
    setNumberFunc(stt);
    setModalVisible(true);
  };

  const handleOk = () => {
    setModalVisible(false);
  };

  const handleCancel = () => {
    setModalVisible(false);
  };

  const showContentFunction = () => {
    if (numberFunc === 1) {
      return <LogoLayout titleModel="Logo" modalVisible={modalVisible} onOk={handleOk} onCancel={handleCancel} />;
    }
    if (numberFunc === 2) {
      return <InfoFooter titleModel="Footer" modalVisible={modalVisible} onOk={handleOk} onCancel={handleCancel} />;
    }
    if (numberFunc === 3) {
      return <Policy titleModel="Footer" childRef={childRef} modalVisible={modalVisible} onOk={handleOk} onCancel={handleCancel} />;
    }
    // if (numberFunc === 4) {
    //     return <ListFiles titleModel="Footer" childRef={childRef} modalVisible={modalVisible} onOk={handleOk} onCancel={handleCancel} />;
    //   }
  };

  return (
    <div className="ps-main__wrapper">
      <div className="header--dashboard">
        <div className="header__left">
          <h3>Setting</h3>
          <p>Danh sách thiết lập</p>
        </div>
      </div>
      <section className="ps-items-listing">
        <div className="container-block">
          <div className="container-block__title bru5" onClick={() => handleOpenModel(1)}>
            <h2>Logo</h2>
          </div>
        </div>
        <div className="line-break"></div>
        <div className="container-block">
          <div className="container-block__title bru5" onClick={() => handleOpenModel(2)}>
            <h2>Footer</h2>
          </div>
        </div>
        <div className="line-break"></div>
        <div className="container-block">
          <div className="container-block__title bru5" onClick={() => handleOpenModel(3)}>
            <h2>Chính sách</h2>
          </div>
        </div>
        <div className="line-break"></div>
        <div className="container-block">
          <div className="container-block__title bru5" onClick={() => handleOpenModel(4)}>
            <h2>Files</h2>
          </div>
        </div>
      </section>
      <Form>{showContentFunction()}</Form>
    </div>
  );
};
export default Settings;
