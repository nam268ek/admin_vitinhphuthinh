/* eslint-disable prettier/prettier */
/* eslint-disable prefer-const */
/* eslint-disable new-cap */
/* eslint-disable curly */
import { Breadcrumb, Button, Form, Layout, Space, theme } from 'antd';
import { cloneDeep } from 'lodash';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { NAME_ACTION } from '../../constants/const';
import { SPECS } from '../../types/types';
import { TypeOf } from '../../utils/CheckTypeOfValue';
import { getListCategoryService } from '../redux/Slices/CategorySlice';
import { setImageAction } from '../redux/Slices/ImageSlice';
import {
  getCreateProductService,
  getUpdateProductService,
  setDefaultProductAction,
  updateStateKeyProductAction,
} from '../redux/Slices/ProductSlice';
import { RootState } from '../redux/store/store';
import { openMessage } from '../services/general.service';
import { FormGeneral } from './Components/FormGeneral';
import { FormProductImages } from './Components/FormImages';
import { FormInventories } from './Components/FormInventories';
import { FormMeta } from './Components/FormMeta';
import { FormProductDescription } from './Components/FormProductDescription';
import { FormProductSpecs } from './Components/FormProductSpecs';
import { FormStatus } from './Components/FormStatus';

const { Header, Content } = Layout;
let bodyDataProduct: any = {};
let bodyDataProductSpecs: any = [];
let listImages: any = [];

export const NewProduct = () => {
  const [nameCategory, setNameCategory] = useState<string>('');
  const { categories } = useSelector((state: RootState) => state.category);
  const { action, loading, products, keyProduct } = useSelector((state: RootState) => state.product);
  const { categoryId, productId } = Object.fromEntries(new URLSearchParams(window.location.search));

  const childRef = useRef<any>(null);
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getListCategoryService()).unwrap();
  }, []);

  useEffect(() => {
    bodyDataProduct = {};
    bodyDataProductSpecs = [];
    listImages = [];
  }, []);

  useEffect(() => {
    if (action === NAME_ACTION.CREATE_PRODUCT) {
      handleLoadCreateProduct(categoryId);
    }
    if (action === NAME_ACTION.UPDATE_PRODUCT) {
      handleLoadProductUpdate(productId);
    }
  }, [productId, categoryId]);

  const handleLoadCreateProduct = (key: string | undefined) => {
    const category = categories.find((c) => c.id === key);
    if (!category) {
      navigate('/products');
      return;
    }
    setNameCategory(category.name);
    form.setFieldsValue({ status: true });
  };

  const handleLoadProductUpdate = (id: string | undefined) => {
    if (!id) {
      navigate('/products');
      return;
    }

    const product = products.filter((p) => p.id === id);

    if (product.length === 0) {
      navigate('/products');
      return;
    }

    const { images, category, brand, tags, categoryKey, specs, ...prod } = product[0];
    dispatch(setImageAction(images));
    dispatch(updateStateKeyProductAction(categoryKey));
    const unwindSpecs = unwindSpecsProduct(specs);

    form.setFieldsValue({
      ...prod,
      ...unwindSpecs,
      category: category?.id,
      brand: brand?.id,
      tags: tags?.map((t: any) => t.id),
    });
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
    body['categoryKey'] = keyProduct;

    try {
      await dispatch(getCreateProductService(body)).unwrap();
      openMessage();
      dispatch(setDefaultProductAction());
      navigate('/products', { replace: true });
    } catch (error) {
      openMessage(error);
    }
  };

  const handleUpdateProduct = async (data: any) => {
    const body = cloneDeep(bodyDataProduct);
    body['categoryKey'] = keyProduct;
    body['productId'] = productId;

    try {
      await dispatch(getUpdateProductService(body)).unwrap();
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
    if (key === 'content') {
      bodyDataProduct['productInformation'] = { content: childRef.current.contentEditor() };
    }
    console.log(bodyDataProduct);
  };

  const handleChangeSpecs = (e: any, key: string) => {
    let value = e;
    if (TypeOf(e) === 'Object' && !(e instanceof Event)) value = e.target.value;

    const data = handlePushDataToBody(cloneDeep(bodyDataProductSpecs), value, key);
    bodyDataProductSpecs = data;
    bodyDataProduct['specs'] = bodyDataProductSpecs;
    console.log(bodyDataProductSpecs);
  };

  const handleChangeImages = (data: any, key: string, actionName: string) => {
    if (actionName === 'upload') {
      listImages.push(data);
    }
    if (actionName === 'remove') {
      listImages = cloneDeep(listImages).filter((item: any) => item.keyId !== data.keyId);
    }
    if (actionName === 'select') {
      bodyDataProduct[key] = data?.map((img: any) => img.id);
      return;
    }
    bodyDataProduct[key] = listImages?.map((img: any) => img.id);
    console.log(bodyDataProduct);
    console.log(data);
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

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <>
      <Header
        className="sticky top-0 z-10 w-full flex items-center justify-between border-t-0 border-x-0 border-b border-solid border-[#eee] bg-[#001529]"
        style={{ paddingInline: '35px' }}
      >
        <div className="text-2xl font-medium m-0 flex items-center">
          <div className="text-2xl text-slate-100 font-medium">
            {`${action === NAME_ACTION.CREATE_PRODUCT ? 'Thêm' : 'Cập nhật'}`} sản phẩm
          </div>
          <div>
            <span className="text-xl text-slate-100 px-3">&#10148;</span>
          </div>
          <div className="text-2xl font-medium text-slate-100">{nameCategory}</div>
        </div>
        <Form onFinish={onFinish} form={form}>
          <Form.Item noStyle>
            <Space>
              <Button type="default" onClick={goBack}>
                Back
              </Button>
              <Button type="primary" htmlType="submit" loading={loading}>
                Submit
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Header>
      <Content className="my-0 mx-4">
        <Breadcrumb className="mx-0 my-2 px-5">
          <Breadcrumb.Item>Products</Breadcrumb.Item>
          <Breadcrumb.Item>Create</Breadcrumb.Item>
        </Breadcrumb>
        <div style={{ background: colorBgContainer }} className="px-5 py-6 min-h-full">
          <p>
            (<span style={{ color: 'red' }}>*</span>) Các trường buộc phải nhập
          </p>
          <section>
            <Form onFinish={onFinish} form={form}>
              <div className="grid grid-cols-2 grid-flow-col gap-4">
                <div>
                  <FormGeneral handleChange={handleChange} />
                  <FormStatus handleChange={handleChange} />
                </div>
                <div>
                  <FormProductImages onChange={handleChangeImages} />
                  <FormInventories handleChange={handleChange} />
                  <FormMeta handleChange={handleChange} />
                </div>
              </div>
              <FormProductDescription
                childRef={childRef}
                productId={productId}
                onChange={handleChange}
              />
              <FormProductSpecs onChange={handleChangeSpecs} />
            </Form>
          </section>
        </div>
      </Content>
    </>
  );
};
