import React, { useState, useEffect } from "react";
import { Modal, Button, Space } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";

const ModalBox: React.FC = () => {
  const [visible, setVisible] = useState(false);
  return (
    <>
      <Button type="primary" onClick={(e) => setVisible(true)}>
        Modal
      </Button>
      <Modal
        title="Modal"
        visible={visible}
        onOk={(e) => setVisible(false)}
        onCancel={(e) => setVisible(false)}
        okText="OK"
        cancelText="Cancel"
      >
        <p>Bla bla ...</p>
        <p>Bla bla ...</p>
        <p>Bla bla ...</p>
      </Modal>
    </>
  );
};

export default ModalBox;

// }

// function confirm() {
//   Modal.confirm({
//     title: 'Confirm',
//     icon: <ExclamationCircleOutlined />,
//     content: 'Bla bla ...',
//     okText: '确认',
//     cancelText: '取消',
//   });
// }

// export default () => (
//   <Space>
//     <LocalizedModal />
//     <Button onClick={confirm}>Confirm</Button>
//   </Space>
// );
