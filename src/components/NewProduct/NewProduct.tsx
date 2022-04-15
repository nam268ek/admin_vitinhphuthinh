import React from "react";
import ImageUpload from "../ImageUpload/ImageUpload";
import { Input, Select } from "antd";
import StatusProduct from "../StatusProduct/StatusProduct";
import SelectOption from "../common/SelectOption";
import EditorText from "../common/EditorText";
import { useForm } from "react-hook-form";
import ConfigInfo from "../ConfigInfo/ConfigInfo";
import { Button, Space } from "antd";

const NewProduct: React.FC = () => {
  const maxLength: number = 100;
  const maxLengthTextArea: number = 500;
  const { TextArea } = Input;
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();
  const { Option } = Select;

  const handleChange = (value: any) => {
    console.log(`selected ${value}`);
  };

  const onSubmit = handleSubmit((data) => console.log(data));

  const enterLoading = (index: any) => {};
  const onChange = (index: any) => {};
  return (
    <div className="ps-main__wrapper">
      <div className="header--dashboard">
        <div className="header__left">
          <h3>Thêm Sản phẩm</h3>
          <p>
            (<span style={{ color: "red" }}>*</span>) Các trường buộc phải nhập
          </p>
        </div>
      </div>
      <section className="ps-new-item">
        <form
          className="ps-form ps-form--new-product"
          action=""
          method="get"
          onSubmit={onSubmit}
        >
          <div className="ps-form__content">
            <div className="row">
              <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12">
                <figure className="ps-block--form-box">
                  <figcaption>General</figcaption>
                  <div className="ps-block__content">
                    <div className="form-group">
                      <label>
                        Tên sản phẩm<sup>*</sup>
                      </label>

                      <Input
                        placeholder="Enter product name..."
                        showCount
                        maxLength={maxLength}
                        onChange={onChange}
                      />
                    </div>
                    <div className="form-group">
                      <label>
                        Danh mục<sup>*</sup>
                      </label>
                      <Select
                        defaultValue="Select Category..."
                        style={{ width: "100%" }}
                        onChange={handleChange}
                      >
                        <Option value="jack">Jack</Option>
                        <Option value="lucy">Lucy</Option>
                        <Option value="disabled" disabled>
                          Disabled
                        </Option>
                        <Option value="Yiminghe">yiminghe</Option>
                      </Select>
                    </div>
                    <div className="form-group">
                      <label>
                        Tóm tắt sản phẩm<sup>*</sup>
                      </label>
                      <TextArea
                        showCount
                        maxLength={maxLengthTextArea}
                        onChange={onChange}
                        style={{ height: "195px" }}
                      />
                    </div>
                    <div className="form-group">
                      <label>
                        Giá gốc<sup>*</sup>
                      </label>
                      <Input
                        type={"number"}
                        showCount
                        maxLength={maxLength}
                        onChange={onChange}
                      />
                    </div>
                    <div className="form-group">
                      <label>
                        Giá khuyến mãi<sup>*</sup>
                      </label>
                      <Input
                        type={"number"}
                        showCount
                        maxLength={maxLength}
                        onChange={onChange}
                      />
                    </div>
                    <div className="form-group">
                      <label>
                        Số lượng<sup>*</sup>
                      </label>
                      <Input
                        type={"number"}
                        showCount
                        maxLength={maxLength}
                        onChange={onChange}
                      />
                    </div>
                  </div>
                </figure>
              </div>
              <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12">
                <figure className="ps-block--form-box">
                  <figcaption>Product Images</figcaption>
                  <div className="ps-block__content">
                    <div className="form-group m-0">
                      <label>Thumbnail Sản phẩm</label>
                      <div className="form-group--nest">
                        <ImageUpload />
                      </div>
                    </div>
                  </div>
                </figure>
                <figure className="ps-block--form-box">
                  <figcaption>Inventory</figcaption>
                  <div className="ps-block__content">
                    <div className="form-group">
                      <label>
                        SKU<sup>*</sup>
                      </label>
                      <Input
                        showCount
                        maxLength={maxLength}
                        onChange={onChange}
                      />
                    </div>
                    <div className="form-group form-group--select">
                      <label>Trạng thái</label>
                      <div className="form-group__content">
                        <StatusProduct />
                      </div>
                    </div>
                  </div>
                </figure>
                <figure className="ps-block--form-box">
                  <figcaption>Meta</figcaption>
                  <div className="ps-block__content">
                    <div className="form-group form-group--select">
                      <label>
                        Thương hiệu<sup>*</sup>
                      </label>
                      <div className="form-group__content">
                        <SelectOption />
                      </div>
                    </div>
                    <div className="form-group">
                      <label>Tags</label>
                      <Input
                        showCount
                        maxLength={maxLength}
                        onChange={onChange}
                      />
                    </div>
                  </div>
                </figure>
              </div>
            </div>
          </div>
          <figure className="ps-block--form-box">
            <figcaption>Mô tả sản phẩm</figcaption>
            <EditorText />
          </figure>
          <figure className="ps-block--form-box">
            <figcaption>Thông tin cấu hình</figcaption>
            <div className="ps-block__content">
              <ConfigInfo />
            </div>
          </figure>
          <div className="ps-form__bottom">
            <Space style={{ width: "100%", justifyContent: "flex-end" }}>
              <Button
                type="primary"
                loading={false}
                onClick={() => enterLoading(0)}
                className="ant-btn-primary"
              >
                Back
              </Button>
              <Button
                type="primary"
                loading={false}
                onClick={() => enterLoading(0)}
                className="ant-btn-primary"
              >
                Submit
              </Button>
            </Space>
          </div>
        </form>
      </section>
    </div>
  );
};
export default NewProduct;
