/* eslint-disable curly */
import { Button, Form, Input, InputNumber, message, Space } from 'antd';
import { cloneDeep } from 'lodash';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { MAX_LENGTH_TEXT } from '../../../constants/const';
import { SelectOptionV2 } from '../../common/SelectOptionV2';
import {
  cleanState,
  getCreateCategoryService,
  getListCategoryService,
} from '../../redux/Slices/CategorySlice';
import { RootState } from '../../redux/store/store';
import { convertListDropdown } from '../../services/general.service';

export const CreateCategory: React.FC = () => {
  const { itemSelected, categories } = useSelector((state: RootState) => state.category);
  const options = convertListDropdown(categories);

  const dispatch = useDispatch();
  const [form] = Form.useForm();

  useEffect(() => {
    if (itemSelected.length > 0) {
      const { name, index, category, parent } = itemSelected[0];
      form.setFieldsValue({ name, index, category, parent: convertListDropdown(parent)[0] });
    }
  }, [itemSelected, form]);

  const onFinish = async (data: any) => {
    const isValid = validateSelectedItem(data.parent);
    if (isValid) {
      const body = cloneDeep(data);
      if (!body.parent || body.parent.length === 0) delete body.parent;
      const response = await dispatch(getCreateCategoryService(body)).unwrap();

      if (response) {
        form.resetFields();
        await dispatch(getListCategoryService());
      }
      console.log(body);
    }
  };

  const handleCancel = () => {
    dispatch(cleanState({ list: ['itemSelected'] }));
    form.resetFields();
  };

  const validateSelectedItem = (id: string): boolean => {
    if (itemSelected[0].id === id) {
      message.error('Select parent not correct');
      return false;
    }
    return true;
  };

  return (
    <div className="ps-form__content">
      <Form onFinish={onFinish} form={form}>
        <figure
          className={
            itemSelected.length > 0 ? 'ps-block--form-box ps-box-edit' : 'ps-block--form-box'
          }
        >
          <figcaption>{itemSelected.length > 0 ? 'Update' : 'Thêm'} Danh mục</figcaption>
          <div className="ps-block__content">
            <div className="row">
              <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12">
                <div className="form-group">
                  <label>
                    Tên danh mục<sup>*</sup>
                  </label>
                  <Form.Item
                    name="name"
                    rules={[
                      {
                        required: true,
                        message: 'Vui lòng nhập tên danh mục',
                      },
                    ]}
                    validateTrigger={['onChange', 'onBlur']}
                  >
                    <Input maxLength={MAX_LENGTH_TEXT} showCount placeholder="Dell" />
                  </Form.Item>
                </div>

                <div className="form-group">
                  <label>Parent</label>
                  <SelectOptionV2 name="parent" options={options} placeholder="Dell" />
                </div>
              </div>
              <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12">
                <div className="form-group">
                  <label>
                    Index<sup>*</sup>
                  </label>
                  <Form.Item
                    name="index"
                    rules={[
                      {
                        required: true,
                        message: 'Vui lòng nhập vị trí',
                      },
                      {
                        pattern: /^[0-9]*$/,
                        message: 'Chỉ được nhập số',
                      },
                    ]}
                    validateTrigger={['onChange', 'onBlur']}
                  >
                    <InputNumber maxLength={2} width={100} placeholder="Vị trí hiện thị" />
                  </Form.Item>
                </div>
                <div className="form-group">
                  <label>
                    Link<sup>*</sup>
                  </label>
                  <Form.Item
                    name="category"
                    rules={[
                      {
                        required: true,
                        message: 'Vui lòng nhập',
                      },
                      {
                        pattern: /^[a-z]*$/,
                        message: 'Không đúng định dạng',
                      },
                    ]}
                    validateTrigger={['onChange', 'onBlur']}
                  >
                    <Input maxLength={MAX_LENGTH_TEXT} showCount placeholder="dell" />
                  </Form.Item>
                </div>
                <Form.Item>
                  <Space
                    style={{
                      width: '100%',
                      justifyContent: 'flex-end',
                    }}
                  >
                    <Button type="link" className="ps-btn-secondary" htmlType="reset">
                      <span>Reset</span>
                    </Button>
                    <Button
                      type="ghost"
                      danger
                      className="ps-btn-secondary"
                      htmlType="button"
                      onClick={handleCancel}
                    >
                      <span>Cancel</span>
                    </Button>
                    <Button type="primary" className="ps-btn-secondary" htmlType="submit">
                      <span>Submit</span>
                    </Button>
                  </Space>
                </Form.Item>
              </div>
            </div>
          </div>
        </figure>
      </Form>
    </div>
  );
};
