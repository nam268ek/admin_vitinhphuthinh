/* eslint-disable new-cap */
/* eslint-disable curly */
import { Button, Form, Space } from 'antd';
import { cloneDeep } from 'lodash';
import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { NAME_ACTION } from '../../constants/const';
import { SPECS } from '../../types/types';
import { TypeOf } from '../../utils/CheckTypeOfValue';
import { getListBrandsService } from '../redux/Slices/BrandSlice';
import { getListImageService, setImageAction } from '../redux/Slices/ImageSlice';
import {
  getCreateProductInventoryService,
  getCreateProductService,
  getUpdateProductInventoryService,
  getUpdateProductService,
  setDefaultProductAction,
  updateStateKeyProductAction,
} from '../redux/Slices/ProductSlice';
import { getListTagsService } from '../redux/Slices/TagSlice';
import { RootState } from '../redux/store/store';
import { openMessage } from '../services/general.service';
import { FormCategories } from './Component/FormCategories';
import { FormGeneral } from './Component/FormGeneral';
import { FormProductImages } from './Component/FormImages';
import { FormInventories } from './Component/FormInventories';
import { FormMeta } from './Component/FormMeta';
import { FormProductDescription } from './Component/FormProductDescription';
import { FormProductSpecs } from './Component/FormProductSpecs';
import { FormStatus } from './Component/FormStatus';

const bodyDataProduct: any = {};
let bodyDataProductSpecs: any = [];

export const NewProduct = () => {
  const { action, itemSelected, isChange, loading, products, keyProduct } = useSelector(
    (state: RootState) => state.product,
  );
  const { imageUploaded } = useSelector((state: RootState) => state.image);
  const { productId } = useParams();

  const childRef = useRef<any>(null);
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    try {
      dispatch(getListTagsService()).unwrap();
      dispatch(getListBrandsService()).unwrap();
      dispatch(getListImageService()).unwrap();
    } catch (error) {
      openMessage(error);
    }
  }, [dispatch]);

  useEffect(() => {
    handleLoadProductUpdate(productId);
  }, [productId]);

  const handleLoadProductUpdate = async (id: string | undefined) => {
    if (id) {
      const product = products.filter((p) => p.id === id);
      if (product.length > 0) {
        const { images, category, brand, tags, categoryKey, specs, ...prod } = product[0];

        dispatch(setImageAction(images));
        dispatch(updateStateKeyProductAction(categoryKey));
        const unwindSpecs = unwindSpecsProduct(specs);

        form.setFieldsValue({
          ...prod,
          ...unwindSpecs,
          category: category.id,
          brand: brand.id,
          tags: tags.map((t: any) => t.id),
        });
      }
    }
  };

  const unwindSpecsProduct = (specs: any) => {
    const result: any = {};
    specs.map((item: any) => {
      result[item.k] = item.v;
    });
    console.log(result);
    return result;
  };

  const handleCreateProduct = async (data: any) => {
    for (const item in data) {
      handleChange(data[item], item);
    }
    const body = cloneDeep(bodyDataProduct);
    body['images'] = imageUploaded.map((o) => o.id);
    body['productInformation'] = { content: childRef.current.contentEditor() };
    body['specs'] = bodyDataProductSpecs;
    body['categoryKey'] = keyProduct;

    try {
      const { productId: prodId } = await dispatch(getCreateProductService(body)).unwrap();

      await dispatch(
        getCreateProductInventoryService({
          productId: prodId,
          quantity: body['quantity'] || 0,
          priceSale: body['priceSale'] || 0,
        }),
      ).unwrap();

      openMessage();
      dispatch(setDefaultProductAction());
      navigate('/products', { replace: true });
    } catch (error) {
      openMessage(error);
    }
  };

  const handleUpdateProduct = async (data: any) => {
    const body = cloneDeep(bodyDataProduct);
    body['images'] = imageUploaded?.map((o) => o.id);
    body['productInformation'] = { content: childRef.current.contentEditor() };
    body['specs'] = bodyDataProductSpecs;
    body['categoryKey'] = keyProduct;
    body['productId'] = productId;

    try {
      await dispatch(getUpdateProductService(body)).unwrap();

      await dispatch(
        getUpdateProductInventoryService({
          productId,
          quantity: body['quantity'],
          priceSale: body['priceSale'],
        }),
      ).unwrap();

      openMessage();
      dispatch(setDefaultProductAction());
      navigate('/products', { replace: true });
    } catch (error) {
      openMessage(error);
    }
    console.log(bodyDataProduct);
  };

  const onFinish = async (data: any) => {
    const body = cloneDeep(data);
    switch (action) {
      case NAME_ACTION.CREATE_PRODUCT:
        handleCreateProduct(body);
        break;
      case NAME_ACTION.UPDATE_PRODUCT:
        handleUpdateProduct(body);
        break;
      default:
        break;
    }
  };

  const resetForm = (e: any) => {
    e.preventDefault();
    form.resetFields();
    childRef.current.resetContentEditor();
    dispatch(setImageAction([]));
    dispatch(setDefaultProductAction());
  };

  const goBack = (e: any) => {
    e.preventDefault();
    dispatch(setImageAction([]));
    dispatch(setDefaultProductAction());
    navigate('/products', { replace: true });
  };

  const handleChange = (e: any, key: any) => {
    let value = e;
    if (TypeOf(e) === 'Object' && !(e instanceof Event)) value = e.target.value;
    if (key === 'isNewProduct' || key === 'status') value = e ? true : false;

    if (!Object.values(SPECS)?.includes(key)) {
      bodyDataProduct[key] = value;
    }
    console.log(bodyDataProduct);
  };

  const handleChangeSpecs = (e: any, key: string) => {
    let value = e;
    if (TypeOf(e) === 'Object' && !(e instanceof Event)) value = e.target.value;

    const data = handlePushDataToBody(cloneDeep(bodyDataProductSpecs), value, key);
    bodyDataProductSpecs = data;
    console.log(bodyDataProductSpecs);
  };

  const handlePushDataToBody = (body: any, value: any, key: string) => {
    const index = body.findIndex((item: any) => item.k === key);
    if (index !== -1) {
      body[index].v = value;
    } else {
      body.push({
        k: key,
        v: value,
      });
    }
    return body;
  };

  return (
    <div id="new-product">
      <div className="ps-main__wrapper">
        <h3 className="header-button">
          <span className="header-button-name">
            {`${action === NAME_ACTION.CREATE_PRODUCT ? 'Thêm' : 'Cập nhật'}`} sản phẩm
          </span>
          <Form onFinish={onFinish} form={form}>
            <Form.Item className="header-button-form">
              <Space>
                <Button type="primary" danger onClick={goBack}>
                  Back
                </Button>
                <Button type="primary" htmlType="reset" onClick={resetForm}>
                  Reset
                </Button>
                <Button type="primary" htmlType="submit" loading={loading}>
                  Submit
                </Button>
              </Space>
            </Form.Item>
          </Form>
        </h3>
        <div className="content">
          <div className="header--dashboard">
            <div className="header__left">
              <p>
                (<span style={{ color: 'red' }}>*</span>) Các trường buộc phải nhập
              </p>
            </div>
          </div>
          <section className="ps-new-item">
            <Form onFinish={onFinish} form={form}>
              <div className="ps-form__content">
                <div className="row">
                  <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12">
                    <FormGeneral handleChange={handleChange} />
                    <FormStatus handleChange={handleChange} />
                  </div>
                  <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12">
                    <FormProductImages />
                    <FormInventories handleChange={handleChange} />
                    <FormMeta handleChange={handleChange} />
                  </div>
                </div>
              </div>
              <FormCategories handleChange={handleChange} />
              <FormProductDescription
                childRef={childRef}
                defaultValue={itemSelected[0]?.productInformation.content}
              />
              <FormProductSpecs onChange={handleChangeSpecs} />
              <Space style={{ width: '100%', justifyContent: 'flex-end' }}>
                <Form.Item>
                  <Space style={{ width: '100%', justifyContent: 'flex-end' }}>
                    <Button type="primary" danger onClick={goBack}>
                      Back
                    </Button>
                    <Button type="primary" htmlType="reset" onClick={resetForm}>
                      Reset
                    </Button>
                    <Button type="primary" htmlType="submit" loading={loading}>
                      Submit
                    </Button>
                  </Space>
                </Form.Item>
              </Space>
            </Form>
          </section>
        </div>
      </div>
    </div>
  );
};
