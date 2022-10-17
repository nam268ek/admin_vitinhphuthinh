import { Button, Form, Input, InputNumber, Space } from "antd";
import { cloneDeep } from "lodash";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { MAX_LENGTH_TEXT } from "../../../constants/const";
import SelectOptionV2 from "../../common/SelectOptionV2";
import { getCreateCategoryService, getListCategoryService } from "../../redux/Slices/CategorySlice";
import { ICreateCategoryProps } from "../interfaces/categories.interface";

export const CreateCategory: React.FC<ICreateCategoryProps> = ({ itemEdit }) => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();

  useEffect(() => {
    if (itemEdit && itemEdit.length > 0) {
      const { name, index, category, parent } = itemEdit[0];
      form.setFieldsValue({ name, index, category, parent });
    }
  }, [itemEdit, form]);

  const onFinish = async (data: any) => {
    const body = cloneDeep(data);
    if (!body.parent || body.parent.length === 0) delete body.parent;
    const response = await dispatch(getCreateCategoryService(body)).unwrap();

    if (response) {
      form.resetFields();
      await dispatch(getListCategoryService());
    }
    console.log(body);
  };

  return (
    <div className="ps-form__content">
      <Form onFinish={onFinish} form={form}>
        <figure className={itemEdit.length > 0 ? "ps-block--form-box ps-box-edit" : "ps-block--form-box"}>
          <figcaption>Thêm Danh mục</figcaption>
          <div className="ps-block__content">
            <div className="row">
              <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12">
                <div className="form-group">
                  <label>
                    Tên danh mục<sup>*</sup>
                  </label>
                  <Form.Item
                    name="name"
                    rules={[
                      {
                        required: true,
                        message: "Vui lòng nhập tên danh mục",
                      },
                    ]}
                    validateTrigger={["onChange", "onBlur"]}
                  >
                    <Input maxLength={MAX_LENGTH_TEXT} showCount placeholder="Dell" />
                  </Form.Item>
                </div>

                <div className="form-group">
                  <label>Parent</label>
                  <SelectOptionV2 name="parent" options={[{ label: "dell", value: "123" }]} />
                </div>
              </div>
              <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12">
                <div className="form-group">
                  <label>
                    Index<sup>*</sup>
                  </label>
                  <Form.Item
                    name="index"
                    rules={[
                      {
                        required: true,
                        message: "Vui lòng nhập vị trí",
                      },
                      {
                        pattern: /^[0-9]*$/,
                        message: "Chỉ được nhập số",
                      },
                    ]}
                    validateTrigger={["onChange", "onBlur"]}
                  >
                    <InputNumber maxLength={2} width={100} placeholder="Vị trí hiện thị" />
                  </Form.Item>
                </div>
                <div className="form-group">
                  <label>
                    Link<sup>*</sup>
                  </label>
                  <Form.Item
                    name="category"
                    rules={[
                      {
                        required: true,
                        message: "Vui lòng nhập",
                      },
                      {
                        pattern: /^[a-z\/]*$/,
                        message: "Không đúng định dạng",
                      },
                    ]}
                    validateTrigger={["onChange", "onBlur"]}
                  >
                    <Input maxLength={MAX_LENGTH_TEXT} showCount placeholder="/dell/vostro" />
                  </Form.Item>
                </div>
                <Form.Item>
                  <Space
                    style={{
                      width: "100%",
                      justifyContent: "flex-end",
                    }}
                  >
                    <Button type="link" className="ps-btn-secondary" htmlType="reset">
                      <span>Reset</span>
                    </Button>
                    <Button type="ghost" danger className="ps-btn-secondary" htmlType="button">
                      <span>Cancel</span>
                    </Button>
                    <Button type="primary" className="ps-btn-secondary" htmlType="submit">
                      <span>Submit</span>
                    </Button>
                  </Space>
                </Form.Item>
              </div>
            </div>
          </div>
        </figure>
      </Form>
    </div>
  );
};
