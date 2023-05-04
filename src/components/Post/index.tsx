import { PlusOutlined } from '@ant-design/icons';
import { Breadcrumb, Button, FloatButton, Layout, theme } from 'antd';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { NAME_ACTION } from '../../constants/const';
import { setImageAction } from '../redux/Slices/ImageSlice';
import { getListPostsService, setPostAction } from '../redux/Slices/PostSlice';
import { RootState } from '../redux/store/store';
import { Search } from '../Search/Search';
import { TableListPosts } from './Components/TableListPosts';
import { useTranslation } from 'react-i18next';

const { Header, Content } = Layout;

export const Posts: React.FC = () => {
  const { t } = useTranslation();
  const { orders } = useSelector((state: RootState) => state.order);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getListPostsService()).unwrap();
  }, []);

  const handleCreatePost = () => {
    dispatch(setPostAction(NAME_ACTION.CREATE_POST));
    dispatch(setImageAction([]));
    navigate('/posts/new', { replace: true });
  };

  return (
    <>
      <Header className="sticky top-0 z-10 w-full flex" style={{ background: colorBgContainer, paddingInline: '35px' }}>
        <div className="w-full flex items-center">
          <Search listItems={orders} />
        </div>
      </Header>
      <Content className="my-0 mx-4">
        <Breadcrumb className="mx-0 my-2 px-5">
          <Breadcrumb.Item>Posts</Breadcrumb.Item>
          <Breadcrumb.Item>List</Breadcrumb.Item>
        </Breadcrumb>
        <div style={{ background: colorBgContainer }} className="px-5 py-6 min-h-full">
          <p className="text-2xl font-medium m-0 flex items-center">{t('posts')}</p>
          <TableListPosts />
        </div>
      </Content>
    </>
  );
};
