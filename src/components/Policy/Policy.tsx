/* eslint-disable*/
import { ExclamationCircleOutlined } from "@ant-design/icons";
import { Button, Empty, Form, Modal, Space } from "antd";
import { cloneDeep } from "lodash";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import EditorText from "../common/EditorText";
import { usePrompt } from "../common/hook/useFrompt";
import useQuery from "../common/hook/useQuery";
import { getContentFooterEditor, updateContentFooterEditor } from "../redux/Slices/FooterSlice";
import { clearImages } from "../redux/Slices/PrimarySlice";
import { originalContentFooter } from "../Services/general.service";

const Policy: React.FC<any> = () => {
  const listDropdownPolicy = [
    { id: "0", key: "polship", desc: "Chính sách vận chuyển" },
    { id: "1", key: "polreturn", desc: "Chính sách đổi trả" },
    { id: "2", key: "polwan", desc: "Chính sách bảo hành" },
    { id: "3", key: "polquality", desc: "Cam kết chất lượng" },
    { id: "4", key: "poluse", desc: "Điều khoản sử dụng" },
    { id: "5", key: "polbuy", desc: "Chính sách mua hàng" },
    { id: "6", key: "polprot", desc: "Chính sách bảo mật" },
    { id: "7", key: "polinsta", desc: "Chính sách trả góp" },
  ];

  const childRef = React.useRef<any>(null);
  const [loading, setLoading] = React.useState<boolean>(false);
  const [title, setTitle] = React.useState<string>("");
  const [contentEditor, setContentEditor] = React.useState<string>("<p></p>");
  const { images } = useSelector((state: any) => state.primary);
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const location = useLocation();
  const name = useQuery("name");
  const { dataUpdatePolicy } = useSelector((state: any) => state.footer);
  const [showDialog, setShowDialog] = React.useState<boolean>(false);
  const [showPrompt, confirmNavigation, cancelNavigation, isConfirm] = usePrompt(showDialog);

  React.useEffect(() => {
    if (name && name.length > 0) {
      listDropdownPolicy.forEach((item: any) => {
        if (item.key === name) setTitle(item.desc);
      });
    }
  }, [name, listDropdownPolicy]);

  React.useEffect(() => {
    dispatch(getContentFooterEditor({ role: "user" }));
  }, []);

  const onFinish = async (data: any) => {
    console.log("data", data);
    const bodyContentFooter = cloneDeep(originalContentFooter);
    bodyContentFooter.action = "update";
    bodyContentFooter.data = {
      images: images.map((item: any) => {
        return { uid: item.uid };
      }),
      [`${name}`]: childRef.current.contentEditor() || "",
    };
    openDialogConfirm(dispatch, updateContentFooterEditor, bodyContentFooter, "update");
  };

  React.useEffect(() => {
    if (name && dataUpdatePolicy) {
      console.log(dataUpdatePolicy);
      setContentEditor(dataUpdatePolicy[0][name]);
    } else setContentEditor("<p></p>");
  }, [dataUpdatePolicy, name]);

  React.useEffect(() => {
    if (isConfirm) {
      dispatch(clearImages());
    }
  }, [isConfirm, dispatch]);

  const openDialogConfirm = async (dispatch: any, action: any, item: any, status?: any) => {
    Modal.confirm({
      title: "Thông báo",
      icon: <ExclamationCircleOutlined />,
      content: <>{status === "update" ? "Xác nhận cập nhật thông tin ?" : "Xác nhận ?"}</>,
      onOk: async () => {
        setLoading(true);
        const data = await dispatch(action(item));
        if (data.payload.code === 200) {
          Modal.success({
            title: "Thông báo",
            content: "Đã update thông tin !",
          });
          setLoading(false);
          setShowDialog(false);
        }
      },
      onCancel() {},
      
    });
  };

  const statusChangeEditor = () => setShowDialog(true);

  return (
    <>
       <Modal
        title="Warring !"
        visible={showPrompt}
        onOk={confirmNavigation}
        onCancel={cancelNavigation}
      >
        <p>Dữ liệu chưa được save, bạn có chắc muốn rời đi?</p>
      </Modal>
      
      {!name || name.length === 0 ? (
        <Empty />
      ) : (
        <div className="container-block-rl">
          <Form className="container-block-rl__ab" form={form} onFinish={onFinish}>
            <label className="form-label__item-title">{title || ""}</label>
            <div className="editor-content">
              <EditorText ref={childRef} defaultValue={contentEditor} statusChangeEditor={statusChangeEditor}/>
            </div>
            <Form.Item>
              <Space className="mt-4" style={{ width: "100%", justifyContent: "flex-end" }}>
                <Button className="loadSubmit" type="primary" htmlType="submit" loading={loading}>
                  Submit
                </Button>
              </Space>
            </Form.Item>
          </Form>
        </div>
      )}
    </>
  );
};
export default Policy;
