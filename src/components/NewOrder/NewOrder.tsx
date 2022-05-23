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
import { getListDropdown, setIsLoading } from "../redux/Slices/PrimarySlice";
import SelectAddItem from "../common/SelectAddItem";
import { getListCategory } from "../redux/Slices/CategorySlice";
import { useNavigate } from "react-router-dom";
import ModuleProducts from "./ModuleProducts/ModuleProducts";

const NewOrder: React.FC = () => {
  const dispatch = useDispatch();
  const childRef = React.useRef<any>(null);
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const { listImages, dataUpdate, statusResponse, listImageRemove } = useSelector((state: any) => state.product);
  const { listDropDown } = useSelector((state: any) => state.primary);
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

  // React.useEffect(() => {
  //   openDialogError(statusResponse);
  // }, [statusResponse]);

  React.useEffect(() => {
    dispatch(getListCategory({ role: "" }));
    dispatch(getListDropdown({ role: "" }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onFinish = async (data: any) => {
    const bodyNewProduct = cloneDeep(originalProduct);
    bodyNewProduct.action = action;
    if (action === "update") {
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
    const result = await dispatch(createProduct(bodyNewProduct));
    dispatch(setIsLoading(false));
    if (result.payload.code === 200) {
      navigate("/products", { replace: true });
    }
  };

  const resetForm = () => {
    dispatch(updateProduct([]));
  };

  const handleCancel = (e: any) => {
    e.preventDefault();
    navigate("/products", { replace: true });
  };

  return (
    <div className="ps-main__wrapper">
      <div className="header--dashboard">
        <div className="header__left">
          <h3>Tạo đơn hàng</h3>
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
                <ModuleProducts />
              </div>
              <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12">
                <figure className="ps-block--form-box">
                  <figcaption>Order Detail</figcaption>
                  <div className="ps-block__content">
                    <div className="row">
                      <div className="col-8">
                        <div className="content-left">
                          <div className="item">
                            <div className="i-img">
                              <img
                                src="https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/mbp-spacegray-select-202011_GEO_DK?wid=904&hei=840&fmt=jpeg&qlt=90&.v=1632948912000"
                                alt="martfury"
                              />
                            </div>
                          </div>
                          <div className="item">
                            <div className="i-content">
                              <h6>Dell Latitude 9420 Core i7 1185G7 16GB 512GB SSD 14 inch FHD Windows 10 Pro</h6>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-4">
                        <div className="content-right">
                          <div className="item">
                            <div className="i-price">
                              <span>13.900.000 đ</span>
                            </div>
                            <div className="i-qty">
                              <p>
                                Số lượng: <span>1</span>
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </figure>
                <figure className="ps-block--form-box">
                  <figcaption>Order Summary</figcaption>
                  <div className="ps-block__content">
                    <div className="row">
                    <div className="col-6">
                      <div className="row">
                        <div className="col-6">
                          <p></p>
                          <p></p>
                          <p></p>
                        </div>
                        <div className="col-6">
                          <div className="o-price"><p></p>
                          <p></p>
                          <p></p></div>
                        </div>
                      </div>
                    </div>
                    <div className="col-6">
                      <div className="row">
                        <div className="col-6">
                          <p>SubTotal</p>
                          <p>Discount</p>
                          <p>Shipping</p>
                        </div>
                        <div className="col-6">
                          <div className="o-price"><p>12.000.000 đ</p>
                          <p>12.000.000 đ</p>
                          <p>12.000.000 đ</p></div>
                        </div>
                      </div>
                    </div>
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
                <Button type="primary" danger loading={false} onClick={handleCancel}>
                  Cancel
                </Button>
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
export default NewOrder;
