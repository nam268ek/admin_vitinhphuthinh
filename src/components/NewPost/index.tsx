/* eslint-disable new-cap */
/* eslint-disable curly */
import { Button, Form, Space } from 'antd';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { NAME_ACTION } from '../../constants/const';
import { TypeOf } from '../../utils/CheckTypeOfValue';
import { getCreatePostService, getListPostsService } from '../redux/Slices/PostSlice';
import { RootState } from '../redux/store/store';
import { openMessage } from '../services/general.service';
import { FormBlogBasic } from './Components/FormBlogBasic';
import { FormPostDetails } from './Components/FormPostDetails';

export const NewPost: React.FC = () => {
  const { action, posts, loading } = useSelector((state: RootState) => state.post);
  const { imageUploaded } = useSelector((state: RootState) => state.image);

  const [isReset, setIsReset] = useState<boolean>(false);
  const childRef = useRef<any>(null);

  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const { postId } = useParams();

  useEffect(() => {
    handleLoadPostUpdate(postId);
  }, [postId]);

  const handleLoadPostUpdate = (id: string | undefined) => {
    if (!id) return;

    const post = posts?.filter((p) => p.id === id);
    if (post.length > 0) {
      const { customer, ...postRest } = post[0];

      form.setFieldsValue({
        ...postRest,
        ...customer,
      });
    }
  };

  const onFinish = async (data: any) => {
    console.log(data);
    switch (action) {
      case NAME_ACTION.CREATE_POST:
        handleCreatePost(data);
        break;
      case NAME_ACTION.UPDATE_POST:
        handleUpdatePost(data);
        break;
      default:
        break;
    }
  };

  const handleCreatePost = async (data: any) => {
    const imageId = imageUploaded?.map((item) => item.id)[0] || undefined;
    const bodyCreatePost = {
      ...data,
      images: imageId,
      url: data.urlSlug,
      content: childRef.current.contentEditor(),
    };

    try {
      await dispatch(getCreatePostService(bodyCreatePost)).unwrap();
      await dispatch(getListPostsService()).unwrap();
      openMessage();
    } catch (error) {
      openMessage(error);
    }
    console.log(data);
  };

  const handleUpdatePost = async (data: any) => {
    //
    console.log(data);
  };

  const resetForm = (e: any) => {
    e.preventDefault();
    form.resetFields();
    setIsReset(true);
  };

  const goBack = (e: any) => {
    resetForm(e);
    navigate('/posts', { replace: true });
  };

  const onChange = (e: any, key: string) => {
    let value = e;
    if (TypeOf(e) === 'Object' && !(e instanceof Event)) value = e.target.value;
  };

  return (
    <div id="new-post">
      <div className="ps-main__wrapper">
        <h3 className="header-button">
          <span className="w-1/2 text-3xl font-normal">
            {`${action === NAME_ACTION.CREATE_ORDER ? 'Tạo' : 'Cập nhật'}`} bài đăng
          </span>
          <Form onFinish={onFinish} form={form}>
            <Form.Item className="header-button-form">
              <Space>
                <Button type="primary" danger onClick={goBack}>
                  Back
                </Button>
                <Button type="primary" hidden={!!postId} htmlType="reset" onClick={resetForm}>
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
          <section>
            <Form form={form} onFinish={onFinish}>
              <div className="ps-form__content">
                <div className="row">
                  <FormBlogBasic onChange={onChange} form={form} />
                  <FormPostDetails childRef={childRef} defaultValue={<></>} />
                </div>
              </div>
              <div className="ps-form__bottom">
                <Form.Item>
                  <Space style={{ width: '100%', justifyContent: 'flex-end' }}>
                    <Button type="primary" danger onClick={goBack}>
                      Back
                    </Button>
                    <Button type="primary" hidden={!!postId} htmlType="reset" onClick={resetForm}>
                      Reset
                    </Button>
                    <Button type="primary" htmlType="submit" loading={loading}>
                      Submit
                    </Button>
                  </Space>
                </Form.Item>
              </div>
            </Form>
          </section>
        </div>
      </div>
    </div>
  );
};
