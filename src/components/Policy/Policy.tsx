import { Button, Form, Modal, Space } from "antd";
import { cloneDeep } from "lodash";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import EditorText from "../common/EditorText";
import { getContentFooterEditor, updateContentFooterEditor } from "../redux/Slices/FooterSlice";
import { originalContentFooter } from "../Services/general.service";
import { ExclamationCircleOutlined } from "@ant-design/icons";

const Policy: React.FC<any> = ({ name, title, dataUpdatePolicy }) => {
  const childRef = React.useRef<any>(null);
  const [loading, setLoading] = React.useState<boolean>(false);
  const [contentEditor, setContentEditor] = React.useState<string>("<p></p>");
  const [form] = Form.useForm();
  const dispatch = useDispatch();

  const onFinish = async (data: any) => {
    console.log("data", data);
    const bodyContentFooter = cloneDeep(originalContentFooter);
    bodyContentFooter.action = "update";
    bodyContentFooter.data = {
      [`${name}`]: childRef.current.contentEditor() || "",
    };
    openDialogConfirm(dispatch, updateContentFooterEditor, bodyContentFooter, "update");
  };

  React.useEffect(() => {
    if (name && dataUpdatePolicy[0][name]) {
      setContentEditor(dataUpdatePolicy[0][name]);
    } else setContentEditor("<p></p>");
  }, [dataUpdatePolicy, name]);

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
        }
      },
      onCancel() {},
    });
  };

  return (
    <div className="container-block-rl">
      <Form className="container-block-rl__ab" form={form} onFinish={onFinish}>
        <label className="form-label__item-title">{title || ""}</label>
        <div className="editor-content">
          <EditorText ref={childRef} defaultValue={contentEditor} />
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
  );
};
export default Policy;
