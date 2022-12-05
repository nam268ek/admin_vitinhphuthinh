import { Button, FloatButton } from 'antd';
import React from 'react';
import { FaPlusCircle } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { NAME_ACTION } from '../../constants/const';
import { setPostAction } from '../redux/Slices/PostSlice';
import { RootState } from '../redux/store/store';
import { Search } from '../Search/Search';
import { TableListPosts } from './Components/TableListPosts';
import { PlusOutlined } from '@ant-design/icons';
import { setImageAction } from '../redux/Slices/ImageSlice';

export const Posts: React.FC = () => {
  const { orders } = useSelector((state: RootState) => state.order);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleCreatePost = () => {
    dispatch(setPostAction(NAME_ACTION.CREATE_POST));
    dispatch(setImageAction([]));
    navigate('/posts/new', { replace: true });
  };

  return (
    <div id="newspaper">
      <div className="ps-main__wrapper">
        <div className="header--dashboard">
          <div className="header__left">
            <h3 className="text-3xl font-normal">Bài đăng</h3>
            <p>Danh Sách bài đăng</p>
          </div>
        </div>
        <section>
          <div className="grid grid-flow-col grid-cols-2 gap-2 mb-2">
            <div className="col-span-2">
              <Search
                listItems={orders}
                flowName="orders"
                className="w-full"
                placeholder="Tìm kiếm post..."
              />
            </div>
            <div className="col-span-1">
              <Button
                className="flex items-center btn-green h-full border-0"
                icon={<PlusOutlined />}
                onClick={handleCreatePost}
              >
                <span className="ml-2 uppercase">Tạo post mới</span>
              </Button>
            </div>
          </div>
          <div className="ps-section__content">
            <div className="table-responsive">
              <TableListPosts />
            </div>
          </div>
        </section>
      </div>
      <FloatButton type="primary" className="float-button-doc" tooltip={<div>Documents</div>} />
    </div>
  );
};
