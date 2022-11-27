import { Button, FloatButton } from 'antd';
import React from 'react';
import { FaPlusCircle } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { NAME_ACTION } from '../../constants/const';
import { setOrderAction } from '../redux/Slices/OrderSlice';
import { RootState } from '../redux/store/store';
import { Search } from '../Search/Search';
import { TableListPosts } from './Components/TableListPosts';

export const Newspapers: React.FC = () => {
  const { orders } = useSelector((state: RootState) => state.order);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleCreateOrder = () => {
    dispatch(setOrderAction(NAME_ACTION.CREATE_ORDER));
    navigate('/newspapers/new', { replace: true });
  };

  return (
    <div id="newspaper">
      <div className="ps-main__wrapper">
        <div className="header--dashboard">
          <div className="header__left">
            <h3>Bài đăng</h3>
            <p>Danh Sách bài đăng</p>
          </div>
        </div>
        <section className="ps-items-listing">
          <div className="ps-section__actions pb-2">
            <div className="width-left">
              <Search
                listItems={orders}
                flowName="orders"
                className="search-order"
                placeholder="Tìm kiếm đơn hàng..."
              />
            </div>
            <div className="width-right d-flex">
              <Button className="ps-btn success" onClick={handleCreateOrder}>
                <FaPlusCircle />
                <span>Tạo đơn hàng</span>
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
