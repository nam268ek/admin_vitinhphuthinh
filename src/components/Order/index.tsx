import { PlusOutlined } from '@ant-design/icons';
import { Button, FloatButton } from 'antd';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { NAME_ACTION } from '../../constants/const';
import { setOrderAction } from '../redux/Slices/OrderSlice';
import { RootState } from '../redux/store/store';
import { Search } from '../Search/Search';
import { TableListOrders } from './Components/TableListOrders';

export const Orders: React.FC = () => {
  const { orders } = useSelector((state: RootState) => state.order);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleCreateOrder = () => {
    dispatch(setOrderAction(NAME_ACTION.CREATE_ORDER));
    navigate('/orders/new', { replace: true });
  };

  return (
    <div id="order">
      <div className="ps-main__wrapper">
        <div className="header--dashboard">
          <div className="header__left">
            <h3 className="text-3xl font-normal">Đơn hàng</h3>
            <p>Danh Sách đơn hàng</p>
          </div>
        </div>
        <section>
          <div className="grid grid-flow-col grid-cols-2 gap-2 mb-2">
            <div className="col-span-2">
              <Search
                listItems={orders}
                flowName="orders"
                className="w-full"
                placeholder="Tìm kiếm đơn hàng..."
              />
            </div>
            <div className="col-span-1">
              <Button
                className="flex items-center btn-green h-full border-0"
                icon={<PlusOutlined />}
                onClick={handleCreateOrder}
              >
                <span className="uppercase">Tạo đơn hàng</span>
              </Button>
            </div>
          </div>
          <div className="ps-section__content">
            <div className="table-responsive">
              <TableListOrders />
            </div>
          </div>
        </section>
      </div>
      <FloatButton type="primary" className="float-button-doc" tooltip={<div>Documents</div>} />
    </div>
  );
};
