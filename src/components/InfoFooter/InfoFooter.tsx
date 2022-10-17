import React from "react";
import { Button, Form, Input, Space } from "antd";
import { originalContentFooter } from "../services/general.service";
import { cloneDeep } from "lodash";
import { useDispatch, useSelector } from "react-redux";
import { getContentFooter, updateContentFooter } from "../redux/Slices/FooterSlice";

const InfoFooter: React.FC<any> = () => {
  const { dataUpdate } = useSelector((state: any) => state.footer);

  const [loading, setLoading] = React.useState<boolean>(false);
  const [form] = Form.useForm();
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(getContentFooter({ role: "user" }));
  }, []);

  const onFinish = async (data: any) => {
    console.log("data", data);
    const bodyContentFooter = cloneDeep(originalContentFooter);
    bodyContentFooter.action = "update";
    bodyContentFooter.data = {
      addrshop: data.addrshop || "",
      email: data.email || "",
      fblink: data.fblink || "",
      hotline: data.hotline || "",
      zalolink: data.zalolink || "",
    };
    setLoading(true);
    await dispatch(updateContentFooter(bodyContentFooter));
    setLoading(false);
  };

  return (
    <div className="ps-block__layout w-100">
      <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
        <div className="form-group--left">
          <div className="background-content border-0">
            <Form className="ps-form ps-form--new-product" form={form} onFinish={onFinish}>
              <div className="form-group--nest">
                <div className="form-group">
                  <Form.Item
                    name="addrshop"
                    initialValue={dataUpdate[0] ? dataUpdate[0].addrshop : ""}
                  >
                    <Input addonBefore="Địa chỉ" maxLength={500} showCount />
                  </Form.Item>
                </div>
                <div className="form-group">
                  <Form.Item
                    name="hotline"
                    initialValue={dataUpdate[0] ? dataUpdate[0].hotline : ""}
                  >
                    <Input addonBefore="Hotline" maxLength={500} showCount />
                  </Form.Item>
                </div>
                <div className="form-group">
                  <Form.Item name="email" initialValue={dataUpdate[0] ? dataUpdate[0].email : ""}>
                    <Input addonBefore="Email" maxLength={500} showCount />
                  </Form.Item>
                </div>
                <div className="form-group">
                  <Form.Item name="fblink" initialValue={dataUpdate[0] ? dataUpdate[0].fblink : ""}>
                    <Input addonBefore="Link FB" maxLength={500} showCount />
                  </Form.Item>
                </div>
                <div className="form-group">
                  <Form.Item
                    name="zalolink"
                    initialValue={dataUpdate[0] ? dataUpdate[0].zalolink : ""}
                  >
                    <Input addonBefore="Link Zalo" maxLength={500} showCount />
                  </Form.Item>
                </div>
              </div>
              <div className="ps-form__bottom">
                <Form.Item>
                  <Space style={{ width: "100%", justifyContent: "flex-end" }}>
                    <Button type="primary" htmlType="submit" loading={loading}>
                      Submit
                    </Button>
                  </Space>
                </Form.Item>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InfoFooter;
