import { Button, Form, Input, InputNumber, Modal, Space, Empty } from 'antd';
import { cloneDeep } from 'lodash';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import EditorText from '../common/EditorText';
import { usePrompt } from '../common/hook/useFrompt';
import { useQuery } from '../common/hook/useQuery';
import SelectAddItem from '../common/SelectAddItem';
import ConfigInfo from '../ConfigInfo/ConfigInfo';
import ImageUploadCloud from '../ImageUpload/ImageUploadCloud';
import InfoPrintComponent from '../InfoPrintComponent/InfoPrintComponent';
// import { getListCategory } from "../redux/Slices/CategorySlice";
// import { clearImages, getListDropdown, setIsLoading } from '../redux/Slices/PrimarySlice';
// import { createProduct, updateProduct } from '../redux/Slices/ProductSlice';
import { bodyCreateProduct } from '../services/general.service';
import { FormCategories } from './Component/FormCategories';
import { FormGeneral } from './Component/FormGeneral';
import { FormProductImages } from './Component/FormImages';
import { FormInventories } from './Component/FormInventories';
import { FormMeta } from './Component/FormMeta';
import { FormProductDescription } from './Component/FormProductDescription';
import { FormProductSpecs } from './Component/FormProductSpecs';

export const NewProduct: React.FC = () => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [statusChangeForm, setStatusChangeForm] = useState<boolean>(false);
  const [showPrompt, confirmNavigation, cancelNavigation, isConfirm] = usePrompt(statusChangeForm);

  const { search } = useLocation();
  const query = React.useMemo(() => new URLSearchParams(search), [search]);

  const keyNumber: string | null = query.get('key');
  const [createKey, setCreateKey] = React.useState<string>('');
  const [submit, setSubmit] = React.useState<boolean>(false);

  React.useEffect(() => {
    if (keyNumber) {
      switch (keyNumber) {
        case '1':
        case '2':
          setCreateKey(keyNumber);
          break;
        default:
          setCreateKey('');
          break;
      }
    }
  }, [keyNumber]);

  React.useEffect(() => {
    // dispatch(getListCategory({ role: "user" }));
    // dispatch(getListDropdown({ role: 'user' }));
  }, []);

  const onFinish = async (data: any) => {
    const body = cloneDeep(bodyCreateProduct);
    for (const key in data) {
      if (key === 'images' && data[key] === undefined) {
        data[key] = [];
      }
      if (key !== 'images' && data[key] === undefined) {
        data[key] = '';
      }
      // body[key] = data[key];
    }
  };

  React.useEffect(() => {
    if (!statusChangeForm && submit) {
      navigate('/products', { replace: true });
    }
  }, [statusChangeForm, submit, navigate]);

  const resetForm = () => {
    setStatusChangeForm(false);
  };

  const handleCancel = (e: any) => {
    e.preventDefault();
    setStatusChangeForm(false);

    navigate('/products', { replace: true });
  };
  const onFormFinish = () => {
    //
  };
  return (
    <>
      {createKey === '' ? (
        <div className="ps-main__wrapper nodata">
          <Empty />
        </div>
      ) : (
        <div>
          <Modal
            title="Warring !"
            open={showPrompt}
            onOk={confirmNavigation}
            onCancel={cancelNavigation}
          >
            <p>Dữ liệu chưa được save, bạn có chắc muốn rời đi?</p>
          </Modal>

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
              <Form.Provider onFormFinish={onFormFinish}>
                <div className="ps-form__content">
                  <div className="row">
                    <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12">
                      <FormGeneral />
                      <FormCategories />
                    </div>
                    <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12">
                      <FormProductImages />
                      <FormInventories />
                      <FormMeta />
                    </div>
                  </div>
                </div>
                <FormProductDescription />
                <FormProductSpecs />
                <Space>
                  <Form.Item>
                    <Space style={{ width: '100%', justifyContent: 'flex-end' }}>
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
                </Space>
              </Form.Provider>
            </section>
          </div>
        </div>
      )}
    </>
  );
};
