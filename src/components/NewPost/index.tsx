/* eslint-disable import/no-unresolved */
/* eslint-disable new-cap */
/* eslint-disable curly */
import { Breadcrumb, Button, Form, Layout, Space, theme } from 'antd';
import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { NAME_ACTION } from '../../constants/const';
import { TypeOf } from '../../utils/CheckTypeOfValue';
import { setImageAction } from '../redux/Slices/ImageSlice';
import { getCreatePostService, getListPostsService, getUpdatePostService } from '../redux/Slices/PostSlice';
import { RootState } from '../redux/store/store';
import { handleErrorFields, openMessage } from './../services/general.service';
import { FormBlogBasic } from './Components/FormBlogBasic';
import { FormPostDetails } from './Components/FormPostDetails';
import { ITag } from 'src/types/types';
import { cloneDeep, isEqual } from 'lodash';
import { getListCategoryService } from '../redux/Slices/CategorySlice';
import { FormSEOPost } from './Components/FormSEOPost';

let bodyOnChange: any = {};
let tasks: any[] = [];
const { Header, Content } = Layout;

export const NewPost: React.FC = () => {
  const { action, posts, loading } = useSelector((state: RootState) => state.post);
  const { categories } = useSelector((state: RootState) => state.category);
  const { imageUploaded } = useSelector((state: RootState) => state.image);

  const childRef = useRef<any>(null);
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const { postId } = useParams();
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  useEffect(() => {
    bodyOnChange = {};
    tasks = [];

    loadFunction();
  }, []);

  const loadFunction = async () => {
    //check category list
    if (categories.length === 0) {
      await dispatch(getListCategoryService()).unwrap();
    }
  };

  useEffect(() => {
    if (action === NAME_ACTION.CREATE_POST) {
      handleSetDefaultForm();
    } else {
      handleLoadPostUpdate(postId);
    }
  }, [postId]);

  const handleSetDefaultForm = async () => {
    dispatch(setImageAction([]));
    form.setFieldsValue({
      status: true,
    });
  };

  const handleLoadPostUpdate = (id: string | undefined) => {
    if (!id) return;

    const post = posts?.filter((p) => p.id === id);
    if (post.length > 0) {
      const { urlSlug, category, tags, image, namePost, ...postRest } = post[0];

      if (image) dispatch(setImageAction(image));

      form.setFieldsValue({
        ...postRest,
        namePost,
        image: image || [],
        urlSlug,
        category: category?.path?.concat([category?.id]),
        tags: tags?.map((tag: ITag) => tag.id),
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
    // const imageId = imageUploaded?.map((item) => item.id)[0] || undefined;
    const { namePost, category, status, urlSlug, summary, ...rest } = data;
    const bodyCreatePost = {
      namePost,
      urlSlug,
      summary,
      status: status ? 'Y' : 'N',
      category: category?.at(-1) || undefined,
      altItems: { tasks },
      content: childRef.current.contentEditor(),
      ...rest,
    };

    try {
      await dispatch(getCreatePostService(bodyCreatePost)).unwrap();
      await dispatch(getListPostsService()).unwrap();
      openMessage();
      navigate('/posts');
    } catch (error) {
      handleErrorFields(error, form);
    }
  };

  const handleUpdatePost = async (data: any) => {
    try {
      await dispatch(getUpdatePostService({ postId, ...bodyOnChange })).unwrap();
      await dispatch(getListPostsService()).unwrap();
      navigate('/posts', { replace: true });
    } catch (error) {
      handleErrorFields(error, form);
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

  const onChange = (e: any, key: string, actionName?: string) => {
    let value = e;
    if (key === 'images' && actionName === 'upload') {
      value = e.id;
    } else if (key === 'images' && actionName === 'remove') {
      value = undefined;
    } else if (TypeOf(e) === 'Object' && !(e instanceof Event)) value = e.target.value;

    bodyOnChange[key] = value;
    if (key === 'tags') form.setFieldValue('tags', value);
  };

  const onChangeUpdate = (e: any, key: string, st: 'add' | 'remove'): void => {
    const newItem = { key: `${key}.${st}`, value: e };
    const index = tasks.findIndex((item) => item.value === newItem.value);
    if (index === -1) tasks.push(newItem);
    if (index !== -1) tasks.splice(index, 1);
    bodyOnChange.altItems = { tasks };
    console.log(bodyOnChange);
  };

  const handleSubmit = () => {
    form.submit();
  };

  return (
    <>
      <Header
        className="sticky top-0 z-10 w-full flex items-center justify-between border-t-0 border-x-0 border-b border-solid border-[#eee]"
        style={{ background: colorBgContainer, paddingInline: '35px' }}
      >
        <p className="text-2xl m-0 flex items-center">{`${action === NAME_ACTION.CREATE_POST ? 'Tạo' : 'Cập nhật'}`} bài đăng</p>
        <Space>
          <Button className="font-medium" onClick={goBack}>
            Back
          </Button>
          <Button type="primary" className="font-medium" onClick={handleSubmit} loading={loading}>
            Submit
          </Button>
        </Space>
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
              <FormBlogBasic onChange={onChange} onChangeUpdate={onChangeUpdate} form={form} />
              <FormSEOPost onChange={onChange} />
              <FormPostDetails childRef={childRef} postId={postId} onChange={onChange} />
            </Form>
          </section>
        </div>
      </Content>
    </>
  );
};
