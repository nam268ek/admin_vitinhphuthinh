import React, { useState } from "react";
import { Modal, Button } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import "antd/dist/antd.css";

const ModalBox: React.FC<any> = ({ dispatch, action, type }) => {
  const [visible, setVisible] = useState(true);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [modalText, setModalText] = useState("");
  const { confirm } = Modal;

  const showModal = () => {
    setVisible(true);
  };

  React.useEffect(() => {
    if (type === "confirm") {
      setModalText("Xác nhận hoàn tất đơn hàng?");
    }
    if (type === "cancel") {
      setModalText("Xác nhận hủy đơn hàng?");
    }
  }, [type]);

  const handleOk = async () => {
    setConfirmLoading(true);
    const res: any = await dispatch(action);
    if (res.payload.data.code === 200) {
      setModalText(res.payload.data.message);
    }
    setConfirmLoading(false);
    // setTimeout(() => {
    //   setVisible(false);
    // }, 2000);
  };

  const handleCancel = () => {
    setVisible(false);
  };
  // return res.status(200).send({
  //   status: "success",
  //   code: 200,
  //   message: "Create order successfully.",
  // });
  const showPromiseConfirm = () => {
    confirm({
      title: "Do you want to delete these items?",
      icon: <ExclamationCircleOutlined />,
      content: "When clicked the OK button, this dialog will be closed after 1 second",

      onOk() {
        return new Promise((resolve, reject) => {
          setTimeout(Math.random() > 0.5 ? resolve : reject, 1000);
        }).catch(() => console.log("Oops errors!"));
      },

      onCancel() {},
    });
  };

  return <>{showPromiseConfirm()}</>;
};

export default ModalBox;
