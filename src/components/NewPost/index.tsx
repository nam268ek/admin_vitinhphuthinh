/* eslint-disable new-cap */
/* eslint-disable curly */
import { Breadcrumb, Button, Form, Layout, message, Space, theme } from 'antd';
import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { NAME_ACTION } from '../../constants/const';
import { TypeOf } from '../../utils/CheckTypeOfValue';
import { setImageAction } from '../redux/Slices/ImageSlice';
import {
  getCreatePostService,
  getListPostsService,
  getUpdatePostService,
} from '../redux/Slices/PostSlice';
import { RootState } from '../redux/store/store';
import { openMessage } from '../services/general.service';
import { FormBlogBasic } from './Components/FormBlogBasic';
import { FormPostDetails } from './Components/FormPostDetails';

let bodyUpdatePost: any = {};
const { Header, Content } = Layout;

export const NewPost: React.FC = () => {
  const { action, posts, loading } = useSelector((state: RootState) => state.post);
  const { imageUploaded } = useSelector((state: RootState) => state.image);

  const childRef = useRef<any>(null);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  useEffect(() => {
    bodyUpdatePost = {};
  }, []);

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
      const { urlSlug, category, tags, images, namePost, ...postRest } = post[0];

      if (images) dispatch(setImageAction(images));

      form.setFieldsValue({
        ...postRest,
        namePost,
        images: images || [],
        urlSlug,
        category,
        tags: tags?.map((tag: any) => tag.id),
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
      namePost: data.namePost,
      images: imageId,
      urlSlug: data.urlSlug,
      content: childRef.current.contentEditor(),
    };

    try {
      await dispatch(getCreatePostService(bodyCreatePost)).unwrap();
      await dispatch(getListPostsService()).unwrap();
      openMessage();
      navigate('/posts');
    } catch (error) {
      openMessage(error);
    }
    console.log(data);
  };

  const handleUpdatePost = async (data: any) => {
    const key = 'update';
    try {
      message.loading({ content: 'Updating...', key });
      await dispatch(getUpdatePostService({ newspaperId: postId, ...bodyUpdatePost })).unwrap();
      await dispatch(getListPostsService()).unwrap();

      openMessage(undefined, key);
      navigate('/posts', { replace: true });
    } catch (error) {
      openMessage(error, key);
    }
  };

  const resetForm = (e: any) => {
    e.preventDefault();
    form.resetFields();
  };

  const goBack = (e: any) => {
    resetForm(e);
    navigate('/posts', { replace: true });
  };

  const onChange = (e: any, key: string, actionName: string) => {
    let value = e;
    if (key === 'images' && actionName === 'upload') {
      value = e.id;
    } else if (key === 'images' && actionName === 'remove') {
      value = undefined;
    } else if (TypeOf(e) === 'Object' && !(e instanceof Event)) value = e.target.value;

    bodyUpdatePost[key] = value;
  };

  return (
    <>
      <Header
        className="sticky top-0 z-10 w-full flex items-center justify-between border-t-0 border-x-0 border-b border-solid border-[#eee]"
        style={{ background: colorBgContainer, paddingInline: '35px' }}
      >
        <p className="text-2xl m-0 flex items-center">
          {`${action === NAME_ACTION.CREATE_ORDER ? 'Tạo' : 'Cập nhật'}`} bài đăng
        </p>
        <Form onFinish={onFinish} form={form}>
          <Form.Item noStyle>
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
      </Header>
      <Content className="my-0 mx-4">
        <Breadcrumb className="mx-0 my-2 px-5">
          <Breadcrumb.Item>Posts</Breadcrumb.Item>
          <Breadcrumb.Item>Create</Breadcrumb.Item>
        </Breadcrumb>
        <div style={{ background: colorBgContainer }} className="px-5 py-6 min-h-full">
          <p>
            (<span style={{ color: 'red' }}>*</span>) Các trường buộc phải nhập
          </p>
          <section>
            <Form form={form} onFinish={onFinish}>
              <FormBlogBasic onChange={onChange} form={form} />
              <FormPostDetails childRef={childRef} postId={postId} onChange={onChange} />
            </Form>
          </section>
        </div>
      </Content>
    </>
  );
};
