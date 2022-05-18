import React from "react";
import ImageUpload from "../ImageUpload/ImageUpload";
import { Form, Input, Select, Button, Space, Modal, InputNumber } from "antd";
import StatusProduct from "../StatusProduct/StatusProduct";
import SelectOption from "../common/SelectOption";
import EditorText from "../common/EditorText";
import { useForm, Controller } from "react-hook-form";
import ConfigInfo from "../ConfigInfo/ConfigInfo";
import { cloneDeep } from "lodash";
import { openDialogError, originalProduct } from "../Services/general.service";
import { useDispatch, useSelector } from "react-redux";
import { createProduct, updateProduct } from "../redux/Slices/productSlice";
import { setIsLoading } from "../redux/Slices/PrimarySlice";
import SelectAddItem from "../common/SelectAddItem";
import { getListCategory } from "../redux/Slices/CategorySlice";

const NewProduct: React.FC = () => {
  const dispatch = useDispatch();
  const childRef = React.useRef<any>(null);
  const [form] = Form.useForm();

  const { listImages, dataUpdate, statusResponse, listImageRemove } = useSelector((state: any) => state.product);
  const { listAllCategory } = useSelector((state: any) => state.category);
  const { action } = useSelector((state: any) => state.primary);
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

  React.useEffect(() => {
    openDialogError(statusResponse);
  }, [statusResponse]);

  React.useEffect(() => {
    dispatch(getListCategory({ role: "" }));
  }, []);

  const onFinish = async (data: any) => {
    const bodyNewProduct = cloneDeep(originalProduct);
    bodyNewProduct.action = action;
    if(action === "update"){
      bodyNewProduct.data._id = dataUpdate[0]._id;
    }
    bodyNewProduct.data.img = [...listImages, { imgRm: listImageRemove }] || [];
    bodyNewProduct.data.title = data.nameprod || "";
    bodyNewProduct.data.contsum = data.prodsummary || "";
    bodyNewProduct.data.price = data.pricesale ? parseInt(data.pricesale) : "";
    bodyNewProduct.data.pricesale = data.pricesale ? parseInt(data.pricesale) : "";
    bodyNewProduct.data.label = (((data.oriprice - data.pricesale) / data.oriprice) * 100) | 0;
    bodyNewProduct.data.brand = data.brand ? data.brand : "";
    bodyNewProduct.data.category = data.category ? data.category : "";
    bodyNewProduct.data.count = data.count ? parseInt(data.count) : 1;
    bodyNewProduct.data.previousPrice = data.oriprice ? parseInt(data.oriprice) : 0;
    bodyNewProduct.data.contentEditor = childRef.current.contentEditor();
    bodyNewProduct.data.sku = data.sku ? data.sku : "";
    bodyNewProduct.data.contentInfo.model = data.model ? data.model : "";
    bodyNewProduct.data.contentInfo.color = data.color ? data.color : "";
    bodyNewProduct.data.contentInfo.cpu = data.cpu ? data.cpu : "";
    bodyNewProduct.data.contentInfo.ram = data.ram ? data.ram : "";
    bodyNewProduct.data.contentInfo.harddrive = data.harddrive ? data.harddrive : "";
    bodyNewProduct.data.contentInfo.vgacard = data.vgacard ? data.vgacard : "";
    bodyNewProduct.data.contentInfo.os = data.os ? data.os : "";
    bodyNewProduct.data.contentInfo.warranty = data.warranty ? data.warranty : "";
    bodyNewProduct.data.contentInfo.monitor = data.monitor ? data.monitor : "";
    bodyNewProduct.data.contentInfo.network = data.network ? data.network : "";
    bodyNewProduct.data.contentInfo.extend = data.extend ? data.extend : "";
    bodyNewProduct.data.contentInfo.battery = data.battery ? data.battery : "";
    bodyNewProduct.data.contentInfo.weight = data.weight ? data.weight : "";

    console.log(bodyNewProduct);

    dispatch(setIsLoading(true));
    await dispatch(createProduct(bodyNewProduct));
    dispatch(setIsLoading(false));
  };

  const resetForm = () => {
    dispatch(updateProduct([]));
  };

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
        <Form className="ps-form ps-form--new-product" form={form} onFinish={onFinish}>
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
                      <Form.Item
                        name="nameprod"
                        initialValue={dataUpdate[0] ? dataUpdate[0].title : ""}
                        rules={[
                          {
                            required: true,
                            message: "Vui lòng nhập tên sản phẩm",
                          },
                        ]}
                      >
                        <Input maxLength={maxLength} showCount placeholder="Nhập tên sản phẩm..." />
                      </Form.Item>
                    </div>
                    <div className="form-group">
                      <label>
                        Danh mục<sup>*</sup>
                      </label>
                      <StatusProduct list={listAllCategory} defaultValue={dataUpdate[0] ? dataUpdate[0].category : ""} />
                    </div>
                    <div className="form-group">
                      <label>
                        Tóm tắt sản phẩm<sup>*</sup>
                      </label>
                      <Form.Item
                        name="prodsummary"
                        initialValue={dataUpdate[0] ? dataUpdate[0].contsum : ""}
                        rules={[
                          {
                            required: true,
                            message: "Vui lòng nhập tóm tắt sản phẩm",
                          },
                        ]}
                      >
                        <TextArea style={{ height: "195px" }} maxLength={maxLengthTextArea} showCount />
                      </Form.Item>
                    </div>
                    <div className="form-group">
                      <label>
                        Giá gốc<sup>*</sup>
                      </label>
                      <Form.Item
                        initialValue={dataUpdate[0] ? dataUpdate[0].previousPrice : ""}
                        rules={[
                          {
                            required: true,
                            message: "Vui lòng nhập giá gốc",
                          },
                        ]}
                      >
                        <Form.Item
                          name="oriprice"
                          noStyle
                          initialValue={dataUpdate[0] ? dataUpdate[0].previousPrice : ""}
                          rules={[
                            {
                              required: true,
                              message: "Vui lòng nhập giá gốc",
                            },
                          ]}
                        >
                          <InputNumber
                            min={0}
                            max={1000000000}
                            formatter={(value: any) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                            parser={(value: any) => value.replace(/\$\s?|(,*)/g, "")}
                            style={{ width: "100%" }}
                            placeholder="Nhập giá gốc..."
                          />
                        </Form.Item>
                        <span className="form-money">VND</span>
                      </Form.Item>
                    </div>
                    <div className="form-group">
                      <label>Giá khuyến mãi</label>
                      <Form.Item initialValue={dataUpdate[0] ? dataUpdate[0].pricesale : ""} style={{ position: "relative" }}>
                        <Form.Item name="pricesale" initialValue={dataUpdate[0] ? dataUpdate[0].pricesale : ""} noStyle>
                          <InputNumber
                            min={0}
                            max={1000000000}
                            formatter={(value: any) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                            parser={(value: any) => value.replace(/\$\s?|(,*)/g, "")}
                            style={{ width: "100%" }}
                            placeholder="Nhập giá sale..."
                          />
                        </Form.Item>
                        <span className="form-money">VND</span>
                      </Form.Item>
                    </div>
                    <div className="form-group">
                      <label>
                        Số lượng<sup>*</sup>
                      </label>
                      <Form.Item noStyle initialValue={dataUpdate[0] ? dataUpdate[0].count : 0}>
                        <Form.Item name="count" initialValue={dataUpdate[0] ? dataUpdate[0].count : 0}>
                          <InputNumber
                            min={0}
                            max={500}
                            formatter={(value: any) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                            parser={(value: any) => value.replace(/\$\s?|(,*)/g, "")}
                            style={{ width: "100%" }}
                            placeholder="Nhập số lượng..."
                          />
                        </Form.Item>
                      </Form.Item>
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
                        <ImageUpload maxNumberOfFiles={3} listFileUpdate={dataUpdate[0] ? dataUpdate[0].img : []} />
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
                      <Form.Item
                        name="sku"
                        initialValue={dataUpdate[0] ? dataUpdate[0].sku : ""}
                        rules={[
                          {
                            required: true,
                            message: "Vui lòng nhập SKU",
                          },
                        ]}
                      >
                        <Input maxLength={maxLength} showCount placeholder="Nhập SKU sản phẩm..." />
                      </Form.Item>
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
                        <SelectAddItem defaultValue={dataUpdate[0] ? dataUpdate[0].brand : ""} />
                      </div>
                    </div>
                    <div className="form-group">
                      <label>Tags</label>
                      <Form.Item name="tags">
                        <Input maxLength={maxLength} showCount />
                      </Form.Item>
                    </div>
                  </div>
                </figure>
              </div>
            </div>
          </div>
          <figure className="ps-block--form-box">
            <figcaption>Mô tả sản phẩm</figcaption>
            <EditorText ref={childRef} defaultValue={dataUpdate[0] ? dataUpdate[0].contentEditor : "<p></p>"} />
          </figure>
          <figure className="ps-block--form-box">
            <figcaption>Thông tin cấu hình</figcaption>
            <div className="ps-block__content">
              <ConfigInfo
                onSubmit={onFinish}
                setValue={setValue}
                control={control}
                maxLength={maxLength}
                maxLengthTextArea={maxLengthTextArea}
                defaultValue={dataUpdate[0] ? dataUpdate[0].contentInfo : ""}
              />
            </div>
          </figure>
          <div className="ps-form__bottom">
            <Form.Item>
              <Space style={{ width: "100%", justifyContent: "flex-end" }}>
                <Button type="primary" loading={false} htmlType="reset" onClick={resetForm}>
                  Reset
                </Button>
                <Button type="primary" htmlType="submit" loading={false}>
                  Submit
                </Button>
              </Space>
            </Form.Item>
          </div>
        </Form>
      </section>
    </div>
  );
};
export default NewProduct;
