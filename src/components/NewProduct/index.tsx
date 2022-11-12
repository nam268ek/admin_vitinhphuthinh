/* eslint-disable curly */
import { Button, Empty, Form, Modal, Space } from 'antd';
import { FormProviderProps } from 'antd/lib/form/context';
import { Store } from 'antd/lib/form/interface';
import { cloneDeep, cloneDeepWith, isArray, isBoolean, isNumber, isString } from 'lodash';
import { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { NAME_ACTION } from '../../constants/const';
import { usePrompt } from '../common/hook/useFrompt';
import { getListBrandsService } from '../redux/Slices/BrandSlice';
import { getListTagsService } from '../redux/Slices/TagSlice';
import { RootState } from '../redux/store/store';
import { bodyCreateProduct, openMessage } from '../services/general.service';
import { FormCategories } from './Component/FormCategories';
import { FormGeneral } from './Component/FormGeneral';
import { FormProductImages } from './Component/FormImages';
import { FormInventories } from './Component/FormInventories';
import { FormMeta } from './Component/FormMeta';
import { FormProductDescription } from './Component/FormProductDescription';
import { FormProductSpecs } from './Component/FormProductSpecs';
import { FormStatus } from './Component/FormStatus';
import {
  getCreateProductInventoryService,
  getCreateProductService,
  getListProductInventoryService,
  updateStateKeyProductAction,
} from '../redux/Slices/ProductSlice';
import { SPECS } from '../../types/types';
import { setImageAction } from '../redux/Slices/ImageSlice';

const bodyDataProduct: any = {};
let bodyDataProductSpecs: any = [];

export const NewProduct = () => {
  const { action, itemSelected, isChange, loading, products, keyProduct } = useSelector(
    (state: RootState) => state.product,
  );
  const childRef = useRef<any>(null);
  const { imageUploaded } = useSelector((state: RootState) => state.image);
  const { productId } = useParams();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // useEffect(() => {
  //   if (action === NAME_ACTION.UPDATE_PRODUCT) handleLoadProductUpdate();
  // }, [itemSelected, action]);

  useEffect(() => {
    try {
      dispatch(getListTagsService()).unwrap();
      dispatch(getListBrandsService()).unwrap();
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

        try {
          const { priceSale, quantity } = await dispatch(
            getListProductInventoryService({ productId: id }),
          ).unwrap();

          form.setFieldsValue({
            ...prod,
            ...unwindSpecs,
            priceSale,
            quantity,
            category: category[0].id,
            brand: brand[0].id,
            tags: tags.map((t: any) => t.id),
          });
        } catch (error) {
          openMessage(error);
        }
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
      const resProd = await dispatch(getCreateProductService(body)).unwrap();

      await dispatch(
        getCreateProductInventoryService({
          productId: resProd.productId,
          quantity: body['quantity'] || 0,
          priceSale: body['priceSale'] || 0,
        }),
      ).unwrap();

      openMessage();
      navigate('/products', { replace: true });
    } catch (error) {
      openMessage(error);
    }
  };

  const handleUpdateProduct = (data: any) => {
    console.log(data);
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

  const resetForm = () => {
    // setStatusChangeForm(false);
  };

  const handleCancel = (e: any) => {
    e.preventDefault();
    // setStatusChangeForm(false);

    navigate('/products', { replace: true });
  };
  const [form] = Form.useForm();

  const handleChange = (e: any, key: any) => {
    let value = e;
    // if (e === undefined) value = '';
    // else if (isNumber(e) || isBoolean(e) || isString(e) || isArray(e)) value = e;
    // else value = e.target.value;

    // if (key === 'category') value = e[e.length - 1];
    if (key === 'isNewProduct' || key === 'status') value = e ? true : false;

    if (!Object.values(SPECS)?.includes(key)) {
      bodyDataProduct[key] = value;
    }
    console.log(bodyDataProduct);
  };

  const handleChangeSpecs = (e: any, key: string) => {
    let value;
    if (isNumber(e) || isBoolean(e)) value = e;
    else value = e.target.value;

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
        <div className="header--dashboard">
          <div className="header__left">
            <h3>Thêm Sản phẩm</h3>
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
            <Space>
              <Form.Item>
                <Space style={{ width: '100%', justifyContent: 'flex-end' }}>
                  <Button type="primary" danger onClick={handleCancel}>
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
  );
};
