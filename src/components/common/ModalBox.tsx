import React, { useState, useEffect } from "react";
import { Modal, Button, Space } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import { IModalBox } from "./../../types/types";

const ModalBox: React.FC<IModalBox> = ({ statusResponse }) => {
  const [visible, setVisible] = useState(true);
  console.log(statusResponse);
  const confirm = () => {
    Modal.confirm({
      title: 'Confirm',
      icon: <ExclamationCircleOutlined />,
      content: 'Bla bla ...',
      okText: '确认',
      cancelText: '取消',
    });
  }
  return (
    <>
    <div onLoadCapture={confirm}></div>
      {/* <Modal
        visible={visible}
        onOk={(e) => setVisible(false)}
        okText="OK"
      >
        <p>{statusResponse[0].message}</p>
      </Modal> */}
    </>
  );
};

export default ModalBox;
