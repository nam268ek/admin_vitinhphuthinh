/* eslint-disable curly */
import { Button, Form, Input, InputNumber, message, Space } from 'antd';
import { cloneDeep } from 'lodash';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { MAX_LENGTH_TEXT, NAME_ACTION } from '../../../constants/const';
import { SelectOptionV2 } from '../../common/SelectOptionV2';
import {
  cleanState,
  getCreateCategoryService,
  getListCategoryService,
  getUpdateCategoryService,
} from '../../redux/Slices/CategorySlice';
import { RootState } from '../../redux/store/store';
import { convertListDropdown, convertViToEn, openMessage, resetFieldsErrors } from '../../services/general.service';

export const CreateCategory: React.FC = () => {
  const { itemSelected, categories, action } = useSelector((state: RootState) => state.category);
  const options = convertListDropdown(categories);

  const dispatch = useDispatch();
  const [form] = Form.useForm();

  useEffect(() => {
    handleCancel();
  }, []);

  useEffect(() => {
    if (itemSelected.length > 0) {
      const { name, category, path, slug } = itemSelected[0];
      form.setFieldsValue({ name, category, slug, path: path?.map((item: any) => item.id) });
    }
  }, [itemSelected, form]);

  const handleCreateCategory = async (body: any) => {
    try {
      const payload = handlePayloadCreateCategory(body);
      await dispatch(getCreateCategoryService(payload)).unwrap();
      await dispatch(getListCategoryService());

      form.resetFields();
      openMessage();
    } catch (error: any) {
      Object.entries(error.errors).forEach(([key, value]) => {
        form.setFields([{ name: [`${key}`], errors: [`${value}`] }]);
      });
      resetFieldsErrors(form, Object.keys(error.errors));
      // openMessage(error);
    }
  };

  const handlePayloadCreateCategory = (body: any) => {
    const { path, name, category } = body;
    if (!path || path.length === 0) return { name, category, path: [] };
    return {
      name,
      category,
      path,
      parent: path[path.length - 1],
    };
  };

  const handleUpdateCategory = async (body: any) => {
    try {
      await dispatch(getUpdateCategoryService({ ...body, categoryId: itemSelected[0].id })).unwrap();
      await dispatch(getListCategoryService());

      form.resetFields();
      openMessage();
    } catch (error) {
      openMessage(error);
    }
  };

  const onFinish = async (data: any) => {
    const body = cloneDeep(data);
    if (!body.parent || body.parent.length === 0) delete body.parent;

    switch (action) {
      case NAME_ACTION.CREATE_CATEGORY:
        handleCreateCategory(body);
        break;
      case NAME_ACTION.UPDATE_CATEGORY:
        handleUpdateCategory(body);
        break;
      default:
        break;
    }

    console.log(body);
  };

  const handleCancel = () => {
    dispatch(cleanState());
    form.resetFields();
  };

  const handleOnChange = (value: any, name: string) => {
    //
    console.log(value);
  };

  const onChangeSlug = (event: any, key: string) => {
    const value = event.target.value;
    const slug = convertViToEn(value);
    form.setFieldsValue({ category: slug });
  };

  return (
    <div id="category">
      <Form onFinish={onFinish} form={form}>
        <figure className={itemSelected.length > 0 ? 'ps-box-edit' : ''}>
          <figcaption className="rounded-t-md font-semibold text-base bg-blue-200 px-6 py-3">
            {itemSelected.length > 0 ? 'Update' : 'Thêm'} Danh mục
          </figcaption>
          <div className="rounded-b-md px-6 py-4 border border-solid border-gray-200 border-t-0">
            <div className="">
              <div className="">
                <div className="flex flex-wrap ">
                  <div className="flex w-full">
                    <div className="mx-2 w-1/2">
                      <label className="mb-3 text-sm font-normal">
                        Tên danh mục<sup className="text-red-600 ml-1">*</sup>
                      </label>
                      <Form.Item name="name">
                        <Input
                          maxLength={MAX_LENGTH_TEXT}
                          showCount
                          placeholder="Dell"
                          onChange={(e) => onChangeSlug(e, 'name')}
                        />
                      </Form.Item>
                    </div>
                    <div className="mx-2 w-1/2">
                      <label className="mb-3 text-sm font-normal">
                        Category<sup className="text-red-600 ml-1">*</sup>
                      </label>
                      <Form.Item name="category">
                        <Input maxLength={MAX_LENGTH_TEXT} showCount placeholder="dell" />
                      </Form.Item>
                    </div>
                  </div>
                  <div className="mx-2 w-full">
                    <label className="mb-3 text-sm font-normal">Parent</label>
                    <SelectOptionV2
                      name="path"
                      className="w-full mb-4"
                      options={options}
                      placeholder="Dell"
                      handleOnChange={handleOnChange}
                    />
                  </div>
                </div>
              </div>
              <div className="mx-2">
                <Form.Item>
                  <Space
                    style={{
                      width: '100%',
                      justifyContent: 'flex-end',
                    }}
                  >
                    <Button type="default" htmlType="button" onClick={handleCancel}>
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
