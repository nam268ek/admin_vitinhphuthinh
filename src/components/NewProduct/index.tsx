import { Button, Empty, Form, Modal, Space } from 'antd';
import { FormProviderProps } from 'antd/lib/form/context';
import { Store } from 'antd/lib/form/interface';
import { cloneDeep } from 'lodash';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { NAME_ACTION } from '../../constants/const';
import { usePrompt } from '../common/hook/useFrompt';
import { RootState } from '../redux/store/store';
import { FormCategories } from './Component/FormCategories';
import { FormGeneral } from './Component/FormGeneral';
import { FormProductImages } from './Component/FormImages';
import { FormInventories } from './Component/FormInventories';
import { FormMeta } from './Component/FormMeta';
import { FormProductDescription } from './Component/FormProductDescription';
import { FormProductSpecs } from './Component/FormProductSpecs';

export const NewProduct = () => {
  const { action, itemSelected } = useSelector((state: RootState) => state.product);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [statusChangeForm, setStatusChangeForm] = useState<boolean>(false);
  const [showPrompt, confirmNavigation, cancelNavigation, isConfirm] = usePrompt(statusChangeForm);

  const handleCreateProduct = (data: any) => {
    console.log(data);
  };
  const handleUpdateProduct = (data: any) => {
    console.log(data);
  };

  const onFinish = async (data: any) => {
    console.log(data);
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
    setStatusChangeForm(false);
  };

  const handleCancel = (e: any) => {
    e.preventDefault();
    setStatusChangeForm(false);

    navigate('/products', { replace: true });
  };
  const [form] = Form.useForm();
  const handleSubmit = () => {
    form.submit();
  };

  return (
    <>
      <div id="new-product">
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
            <Form onFinish={onFinish} form={form}>
              <div className="ps-form__content">
                <div className="row">
                  <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12">
                    <FormGeneral />
                  </div>
                  <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12">
                    <FormProductImages />
                    <FormInventories />
                    <FormMeta />
                  </div>
                </div>
              </div>
              <FormCategories />
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
            </Form>
          </section>
        </div>
      </div>
    </>
  );
};
