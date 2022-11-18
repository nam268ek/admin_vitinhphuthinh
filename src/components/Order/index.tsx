import { Button } from 'antd';
import React from 'react';
import { FaPlusCircle } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getListOrderService } from '../redux/Slices/OrderSlice';
import { RootState } from '../redux/store/store';
import { Search } from '../Search/Search';
import { openMessage } from '../services/general.service';
import { TableListOrders } from './Components/TableListOrders';

export const Orders: React.FC = () => {
  const { orders } = useSelector((state: RootState) => state.order);
  const childRef = React.useRef<any>(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // React.useEffect(() => {
  //   try {
  //     dispatch(getListOrderService()).unwrap();
  //   } catch (error) {
  //     openMessage(error);
  //   }
  // }, []);

  const handleCreateOrder = () => {
    navigate('/orders/new', { replace: true });
  };

  return (
    <div id="order">
      <div className="ps-main__wrapper">
        <div className="header--dashboard">
          <div className="header__left">
            <h3>Đơn hàng</h3>
            <p>Danh Sách đơn hàng</p>
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
              <TableListOrders />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};
