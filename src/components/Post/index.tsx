import { PlusOutlined } from '@ant-design/icons';
import { Breadcrumb, Button, FloatButton, Layout, theme } from 'antd';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { NAME_ACTION } from '../../constants/const';
import { setImageAction } from '../redux/Slices/ImageSlice';
import { setPostAction } from '../redux/Slices/PostSlice';
import { RootState } from '../redux/store/store';
import { Search } from '../Search/Search';
import { TableListPosts } from './Components/TableListPosts';

const { Header, Content } = Layout;

export const Posts: React.FC = () => {
  const { orders } = useSelector((state: RootState) => state.order);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleCreatePost = () => {
    dispatch(setPostAction(NAME_ACTION.CREATE_POST));
    dispatch(setImageAction([]));
    navigate('/posts/new', { replace: true });
  };

  return (
    <>
      <Header
        className="sticky top-0 z-1 w-full flex"
        style={{ background: colorBgContainer, paddingInline: '35px' }}
      >
        <p className="text-2xl m-0 flex items-center">Bài đăng</p>
      </Header>
      <Content className="my-0 mx-4">
        <Breadcrumb className="mx-0 my-2 px-5">
          <Breadcrumb.Item>Posts</Breadcrumb.Item>
          <Breadcrumb.Item>List</Breadcrumb.Item>
        </Breadcrumb>
        <div style={{ background: colorBgContainer }} className="px-5 py-6 min-h-full">
          <div className="flex mb-2">
            <Search
              listItems={orders}
              flowName="orders"
              className="w-full"
              placeholder="Tìm kiếm post..."
            />
            <Button
              className="flex items-center btn-green h-[40px] border-0 ml-2"
              icon={<PlusOutlined />}
              onClick={handleCreatePost}
            >
              <span className="ml-2 uppercase">Tạo post mới</span>
            </Button>
          </div>
          <TableListPosts />
        </div>
        <FloatButton type="primary" className="float-button-doc" tooltip={<div>Documents</div>} />
      </Content>
    </>
  );
};
