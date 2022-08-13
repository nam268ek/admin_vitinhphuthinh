import { Button, Form, Space } from "antd";
import { cloneDeep } from "lodash";
import React from "react";
import { useDispatch } from "react-redux";
import EditorText from "../common/EditorText";
import { updateContentFooterEditor } from "../redux/Slices/FooterSlice";
import { originalContentFooter } from "../Services/general.service";

const Policy: React.FC<any> = ({ name, title }) => {
  const childRef = React.useRef<any>(null);
  const [form] = Form.useForm();
  const dispatch = useDispatch();

  const onFinish = async (data: any) => {
    console.log("data", data);
    const bodyContentFooter = cloneDeep(originalContentFooter);
    bodyContentFooter.action = "update";
    bodyContentFooter.data = {
      [`${name}`]: childRef.current.contentEditor() || "",
    };
    const res = await dispatch(updateContentFooterEditor(bodyContentFooter));
    if (res.payload.code === 200) {
    }
  };

  return (
    <div className="container-block-rl">
    <Form className="container-block-rl__ab" form={form} onFinish={onFinish}>
      <label className="form-label__item-title">{title || ""}</label>
      <EditorText ref={childRef} defaultValue={"<p></p>"} />
      <Form.Item>
        <Space className="mt-4" style={{ width: "100%", justifyContent: "flex-end" }}>
          <Button type="primary" htmlType="submit" loading={false}>
            Submit
          </Button>
        </Space>
      </Form.Item>
    </Form>
    </div>
  );
};
export default Policy;
