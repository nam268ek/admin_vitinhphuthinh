import { Button, Form, Input, InputNumber, Modal, Space, Empty } from "antd";
import { cloneDeep } from "lodash";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import EditorText from "../common/EditorText";
import { usePrompt } from "../common/hook/useFrompt";
import useQuery from "../common/hook/useQuery";
import SelectAddItem from "../common/SelectAddItem";
import ConfigInfo from "../ConfigInfo/ConfigInfo";
import ImageUploadCloud from "../ImageUpload/ImageUploadCloud";
import InfoPrintComponent from "../InfoPrintComponent/InfoPrintComponent";
// import { getListCategory } from "../redux/Slices/CategorySlice";
import { clearImages, getListDropdown, setIsLoading } from "../redux/Slices/PrimarySlice";
import { createProduct, updateProduct } from "../redux/Slices/productSlice";
import { bodyCreateProduct, previousData } from "../services/general.service";
import StatusProduct from "../StatusProduct/StatusProduct";

const NewProduct: React.FC = () => {
  const dispatch = useDispatch();
  const childRef = React.useRef<any>(null);
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [statusChangeForm, setStatusChangeForm] = useState<boolean>(false);
  const [showPrompt, confirmNavigation, cancelNavigation, isConfirm] = usePrompt(statusChangeForm);
  const { listImages, dataUpdate, listImageRemove } = useSelector((state: any) => state.product);
  const { listAllCategory } = useSelector((state: any) => state.category);
  const { action, images, listDropDown } = useSelector((state: any) => state.primary);
  const maxLength: number = 100;
  const maxLengthTextArea: number = 500;
  const { TextArea } = Input;
  const keyNumber: string | null = useQuery("key");
  const [createKey, setCreateKey] = React.useState<string>("");
  const [submit, setSubmit] = React.useState<boolean>(false);

  React.useEffect(() => {
    if (keyNumber) {
      switch (keyNumber) {
        case "1":
        case "2":
          setCreateKey(keyNumber);
          break;
        default:
          setCreateKey("");
          break;
      }
    }
  }, [keyNumber]);

  React.useEffect(() => {
    // dispatch(getListCategory({ role: "user" }));
    dispatch(getListDropdown({ role: "user" }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  React.useEffect(() => {
    if (isConfirm) {
      if (images && images.length > 0) dispatch(clearImages());
    }
  }, [isConfirm, dispatch, images]);

  // const onFinish = async (data: any) => {
  //   const bodyNewProduct = cloneDeep(originalProduct);
  //   bodyNewProduct.action = action;
  //   if (action === "update") {
  //     bodyNewProduct.data._id = dataUpdate[0]._id;
  //   }
  //   bodyNewProduct.data.img = [...listImages] || [];
  //   bodyNewProduct.data.imgRm = listImageRemove;
  //   bodyNewProduct.data.title = data.nameprod || "";
  //   bodyNewProduct.data.contsum = data.prodsummary || "";
  //   bodyNewProduct.data.price = data.pricesale ? parseInt(data.pricesale) : "";
  //   bodyNewProduct.data.pricesale = data.pricesale ? parseInt(data.pricesale) : "";
  //   bodyNewProduct.data.label = (((data.oriprice - data.pricesale) / data.oriprice) * 100) | 0;
  //   bodyNewProduct.data.brand = data.brand ? data.brand : "";
  //   bodyNewProduct.data.category = data.category ? data.category : "";
  //   bodyNewProduct.data.count = data.count ? parseInt(data.count) : 1;
  //   bodyNewProduct.data.previousPrice = data.oriprice ? parseInt(data.oriprice) : 0;
  //   bodyNewProduct.data.contentEditor = childRef.current.contentEditor();
  //   bodyNewProduct.data.sku = data.sku ? data.sku : "";
  //   if (createKey === "1") {
  //     bodyNewProduct.data.contentInfo.model = data.model ? data.model : "";
  //     bodyNewProduct.data.contentInfo.color = data.color ? data.color : "";
  //     bodyNewProduct.data.contentInfo.cpu = data.cpu ? data.cpu : "";
  //     bodyNewProduct.data.contentInfo.ram = data.ram ? data.ram : "";
  //     bodyNewProduct.data.contentInfo.harddrive = data.harddrive ? data.harddrive : "";
  //     bodyNewProduct.data.contentInfo.vgacard = data.vgacard ? data.vgacard : "";
  //     bodyNewProduct.data.contentInfo.os = data.os ? data.os : "";
  //     bodyNewProduct.data.contentInfo.warranty = data.warranty ? data.warranty : "";
  //     bodyNewProduct.data.contentInfo.monitor = data.monitor ? data.monitor : "";
  //     bodyNewProduct.data.contentInfo.network = data.network ? data.network : "";
  //     bodyNewProduct.data.contentInfo.extend = data.extend ? data.extend : "";
  //     bodyNewProduct.data.contentInfo.battery = data.battery ? data.battery : "";
  //     bodyNewProduct.data.contentInfo.weight = data.weight ? data.weight : "";
  //   }
  //   if (createKey === "2") {
  //     bodyNewProduct.data.contentInfo.model = data.model ? data.model : "";
  //     bodyNewProduct.data.contentInfo.color = data.color ? data.color : "";
  //     bodyNewProduct.data.contentInfo.nsx = data.nsx ? data.nsx : "";
  //     bodyNewProduct.data.contentInfo.inCountry = data.inCountry ? data.inCountry : "";
  //     bodyNewProduct.data.contentInfo.timeWarranty = data.timeWarranty ? data.timeWarranty : "";
  //     bodyNewProduct.data.contentInfo.locationWarranty = data.locationWarranty ? data.locationWarranty : "";
  //     bodyNewProduct.data.contentInfo.categoryPrinter = data.categoryPrinter ? data.categoryPrinter : "";
  //     bodyNewProduct.data.contentInfo.function = data.function ? data.function : "";
  //     bodyNewProduct.data.contentInfo.pixel = data.pixel ? data.pixel : "";
  //     bodyNewProduct.data.contentInfo.speedPrintBlackWhite = data.speedPrintBlackWhite ? data.speedPrintBlackWhite : "";
  //     bodyNewProduct.data.contentInfo.speedPrintColor = data.speedPrintColor ? data.speedPrintColor : "";
  //     bodyNewProduct.data.contentInfo.autoPrint = data.autoPrint ? data.autoPrint : "";
  //     bodyNewProduct.data.contentInfo.categoryInk = data.categoryInk ? data.categoryInk : "";
  //     bodyNewProduct.data.contentInfo.memory = data.memory ? data.memory : "";
  //     bodyNewProduct.data.contentInfo.paperSize = data.paperSize ? data.paperSize : "";
  //     bodyNewProduct.data.contentInfo.paperTray = data.paperTray ? data.paperTray : "";
  //     bodyNewProduct.data.contentInfo.usbConnect = data.usbConnect ? data.usbConnect : "";
  //     bodyNewProduct.data.contentInfo.internetConnect = data.internetConnect ? data.internetConnect : "";
  //     bodyNewProduct.data.contentInfo.printToMobile = data.printToMobile ? data.printToMobile : "";
  //     bodyNewProduct.data.contentInfo.weigth = data.weigth ? data.weigth : "";
  //     bodyNewProduct.data.contentInfo.size = data.size ? data.size : "";
  //     bodyNewProduct.data.contentInfo.sizeBox = data.sizeBox ? data.sizeBox : "";
  //     bodyNewProduct.data.contentInfo.weigthBox = data.weigthBox ? data.weigthBox : "";
  //   }

  //   console.log(bodyNewProduct);

  //   dispatch(setIsLoading(true));
  //   const result = await dispatch(createProduct(bodyNewProduct));
  //   dispatch(setIsLoading(false));
  //   if (result.payload.code === 200) {
  //     setStatusChangeForm(false);
  //     setSubmit(true);
  //   }
  // };

  const onFinish = async (data: any) => {
    previousData["product"] = cloneDeep(bodyCreateProduct);
    for (const key in data) {
      if (key === "images" && data[key] === undefined) {
        data[key] = [];
      }
      if (key !== "images" && data[key] === undefined) {
        data[key] = "";
      }
      previousData["product"][key] = data[key];
    }
    console.log(previousData["product"]);
  };

  React.useEffect(() => {
    if (!statusChangeForm && submit) {
      navigate("/products", { replace: true });
    }
  }, [statusChangeForm, submit, navigate]);

  const resetForm = () => {
    setStatusChangeForm(false);
    if (images && images.length > 0) dispatch(clearImages());
    dispatch(updateProduct([]));
  };

  const handleCancel = (e: any) => {
    e.preventDefault();
    setStatusChangeForm(false);
    if (images && images.length > 0) dispatch(clearImages());
    navigate("/products", { replace: true });
  };

  const onValuesChangeForm = (changedValues: any, allValues: any) => {
    if (!statusChangeForm) {
      setStatusChangeForm(true);
    }
  };

  return (
    <>
      {createKey === "" ? (
        <div className="ps-main__wrapper nodata">
          <Empty />
        </div>
      ) : (
        <div>
          <Modal title="Warring !" visible={showPrompt} onOk={confirmNavigation} onCancel={cancelNavigation}>
            <p>Dữ liệu chưa được save, bạn có chắc muốn rời đi?</p>
          </Modal>

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
              <Form
                className="ps-form ps-form--new-product"
                form={form}
                onFinish={onFinish}
                onValuesChange={onValuesChangeForm}
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
                            <Form.Item
                              name="name"
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
                                name="price"
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
                          <div className="form-group">
                            <label>
                              Tóm tắt sản phẩm<sup>*</sup>
                            </label>
                            <Form.Item
                              name="description"
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
                        </div>
                      </figure>
                      <figure className="ps-block--form-box">
                        <figcaption>Category</figcaption>
                        <div className="ps-block__content">
                          {/* <div className="form-group">
                            <label>
                              Danh mục<sup>*</sup>
                            </label>
                            <StatusProduct
                              list={listAllCategory}
                              defaultValue={dataUpdate[0] ? dataUpdate[0].category : ""}
                            />
                          </div> */}
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
                              <ImageUploadCloud maxNumberOfFiles={3} listImages={listImages} status={action} />

                              {/* <ImageUpload maxNumberOfFiles={3} listFileUpdate={dataUpdate[0] ? dataUpdate[0].img : []} status={action} /> */}
                            </div>
                          </div>
                        </div>
                      </figure>
                      <figure className="ps-block--form-box">
                        <figcaption>Inventory</figcaption>
                        <div className="ps-block__content">
                          <div className="form-group">
                            <label>Giá khuyến mãi</label>
                            <Form.Item
                              initialValue={dataUpdate[0] ? dataUpdate[0].pricesale : ""}
                              style={{ position: "relative" }}
                            >
                              <Form.Item
                                name="priceSale"
                                initialValue={dataUpdate[0] ? dataUpdate[0].pricesale : ""}
                                noStyle
                              >
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
                              <Form.Item name="quantity" initialValue={dataUpdate[0] ? dataUpdate[0].count : 0}>
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
                      <figure className="ps-block--form-box">
                        <figcaption>Meta</figcaption>
                        <div className="ps-block__content">
                          <div className="form-group form-group--select">
                            <label>
                              Thương hiệu<sup>*</sup>
                            </label>
                            <div className="form-group__content">
                              <SelectAddItem
                                defaultValue={dataUpdate[0] ? dataUpdate[0].brand : ""}
                                listItem={listDropDown}
                              />
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
                  <EditorText
                    ref={childRef}
                    statusChangeEditor={onValuesChangeForm}
                    defaultValue={dataUpdate[0] ? dataUpdate[0].contentEditor : "<p></p>"}
                  />
                </figure>
                <figure className="ps-block--form-box">
                  <figcaption>Thông tin cấu hình</figcaption>
                  <div className="ps-block__content">
                    {/* {createKey === "1" ? (
                      <ConfigInfo
                        maxLength={maxLength}
                        maxLengthTextArea={maxLengthTextArea}
                        defaultValue={dataUpdate[0] ? dataUpdate[0].contentInfo : ""}
                      />
                    ) : (
                      createKey === "2" && (
                        <InfoPrintComponent
                          maxLength={maxLength}
                          maxLengthTextArea={maxLengthTextArea}
                          defaultValue={dataUpdate[0] ? dataUpdate[0].contentInfo : ""}
                        />
                      )
                    )} */}
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
        </div>
      )}
    </>
  );
};
export default NewProduct;
