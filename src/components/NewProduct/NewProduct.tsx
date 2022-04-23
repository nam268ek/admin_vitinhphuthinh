import React from "react";
import ImageUpload from "../ImageUpload/ImageUpload";
import { Form, Input, Select, Button, Space } from "antd";
import StatusProduct from "../StatusProduct/StatusProduct";
import SelectOption from "../common/SelectOption";
import EditorText from "../common/EditorText";
import { useForm, Controller } from "react-hook-form";
import ConfigInfo from "../ConfigInfo/ConfigInfo";
import { cloneDeep } from "lodash";
import { originalProduct } from "../Services/general.service";
import { useDispatch } from "react-redux";
import { createProduct } from "../redux/Slices/productSlice";
import { setIsLoading } from "../redux/Slices/PrimarySlice";

const NewProduct: React.FC = () => {
  const dispatch = useDispatch();
  const maxLength: number = 100;
  const maxLengthTextArea: number = 500;
  const { TextArea } = Input;
  const {
    register,
    setValue,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<any>();

  const { Option } = Select;
  const handleChange = (value: any) => {
    console.log(`selected ${value}`);
  };

  const onSubmit = handleSubmit((data) => {
    console.log(data);
    const bodyNewProduct = cloneDeep(originalProduct);
    bodyNewProduct.action = "create";
    // bodyNewProduct.data.img = data.img;
    bodyNewProduct.data.title = data.nameprod;
    bodyNewProduct.data.price = data.pricesale;
    bodyNewProduct.data.label = (data.oriprice - data.pricesale)/ data.oriprice * 100;
    bodyNewProduct.data.brand = data.brand ? data.brand : "";
    bodyNewProduct.data.category = data.category;
    bodyNewProduct.data.count = data.count;
    bodyNewProduct.data.previousPrice = data.oriprice;

    // dispatch(setIsLoading(true));
    // dispatch(createProduct(bodyNewProduct));
    // dispatch(setIsLoading(false));
  });

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
        <form className="ps-form ps-form--new-product" onSubmit={onSubmit}>
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
                      <Controller
                        name="nameprod"
                        defaultValue=""
                        control={control}
                        render={({ field }) => (
                          <Input
                            {...field}
                            maxLength={maxLength}
                            showCount
                            placeholder="Nhập tên sản phẩm..."
                            onChange={(e) => {
                              setValue(field.name, e.target.value);
                            }}
                          />
                        )}
                      />
                    </div>
                    <div className="form-group">
                      <label>
                        Danh mục<sup>*</sup>
                      </label>
                      <Controller
                        control={control}
                        name="category"
                        render={({ field }) => (
                          <>
                            <Select
                              {...field}
                              defaultValue="Select Category..."
                              style={{ width: "100%" }}
                            >
                              <Option value="jack">Jack</Option>
                              <Option value="lucy">Lucy</Option>
                              <Option value="disabled" disabled>
                                Disabled
                              </Option>
                              <Option value="Yiminghe">yiminghe</Option>
                            </Select>
                          </>
                        )}
                      />
                    </div>
                    <div className="form-group">
                      <label>
                        Tóm tắt sản phẩm<sup>*</sup>
                      </label>
                      <Controller
                        name="prodsummary"
                        defaultValue=""
                        control={control}
                        render={({ field }) => (
                          <TextArea
                            {...field}
                            style={{ height: "195px" }}
                            maxLength={maxLengthTextArea}
                            showCount
                            onChange={(e) => {
                              setValue(field.name, e.target.value);
                            }}
                          />
                        )}
                      />
                    </div>
                    <div className="form-group">
                      <label>
                        Giá gốc<sup>*</sup>
                      </label>
                      <Controller
                        name="priceoriginal"
                        defaultValue=""
                        control={control}
                        render={({ field }) => (
                          <Input
                            {...field}
                            type="number"
                            maxLength={maxLength}
                            showCount
                            placeholder="Nhập tên sản phẩm..."
                            onChange={(e) => {
                              setValue(field.name, e.target.value);
                            }}
                          />
                        )}
                      />
                    </div>
                    <div className="form-group">
                      <label>
                        Giá khuyến mãi<sup>*</sup>
                      </label>
                      <Controller
                        name="pricesale"
                        defaultValue=""
                        control={control}
                        render={({ field }) => (
                          <Input
                            {...field}
                            type="number"
                            maxLength={maxLength}
                            showCount
                            placeholder="Nhập tên sản phẩm..."
                            onChange={(e) => {
                              setValue(field.name, e.target.value);
                            }}
                          />
                        )}
                      />
                    </div>
                    <div className="form-group">
                      <label>
                        Số lượng<sup>*</sup>
                      </label>
                      <Controller
                        name="count"
                        defaultValue=""
                        control={control}
                        render={({ field }) => (
                          <Input
                            {...field}
                            type="number"
                            maxLength={maxLength}
                            showCount
                            placeholder="Nhập tên sản phẩm..."
                            onChange={(e) => {
                              setValue(field.name, e.target.value);
                            }}
                          />
                        )}
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
                        <ImageUpload maxNumberOfFiles={3}/>
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
                      <Controller
                        name="sku"
                        defaultValue=""
                        control={control}
                        render={({ field }) => (
                          <Input
                            {...field}
                            maxLength={maxLength}
                            showCount
                            onChange={(e) => {
                              setValue(field.name, e.target.value);
                            }}
                          />
                        )}
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
                        <Controller
                          control={control}
                          name="brand"
                          render={({ field }) => (
                            <>
                              <Select
                                {...field}
                                defaultValue="Select Category..."
                                style={{ width: "100%" }}
                              >
                                <Option value="jack">Jack</Option>
                                <Option value="lucy">Lucy</Option>
                                <Option value="disabled" disabled>
                                  Disabled
                                </Option>
                                <Option value="Yiminghe">yiminghe</Option>
                              </Select>
                            </>
                          )}
                        />
                      </div>
                    </div>
                    <div className="form-group">
                      <label>Tags</label>
                      <Controller
                        name="tags"
                        defaultValue=""
                        control={control}
                        render={({ field }) => (
                          <Input
                            {...field}
                            maxLength={maxLength}
                            showCount
                            onChange={(e) => {
                              setValue(field.name, e.target.value);
                            }}
                          />
                        )}
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
              <Controller
                name="back"
                defaultValue=""
                control={control}
                render={({ field }) => (
                  <Button {...field} type="primary" loading={false} htmlType='reset'>
                    Reset
                  </Button>
                )}
              />
              <Controller
                name="submit"
                defaultValue=""
                control={control}
                render={({ field }) => (
                  <Button
                    {...field}
                    type="primary"
                    htmlType="submit"
                    loading={false}
                  >
                    Submit
                  </Button>
                )}
              />
            </Space>
          </div>
        </form>
      </section>
    </div>
  );
};
export default NewProduct;
