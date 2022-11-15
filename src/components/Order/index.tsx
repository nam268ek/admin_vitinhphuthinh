import React from 'react';
import { FaPlusCircle } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import ModalBox from '../common/ModalBox';
import { getListOrderService } from '../redux/Slices/OrderSlice';
import { openMessage } from '../services/general.service';
import { TableListOrders } from './Components/TableListOrders';

const Orders: React.FC = () => {
  const childRef = React.useRef<any>(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  React.useEffect(() => {
    try {
      dispatch(getListOrderService()).unwrap();
    } catch (error) {
      openMessage(error);
    }
  }, []);

  return (
    <div className="ps-main__wrapper">
      <div className="header--dashboard">
        <div className="header__left">
          <h3>Đơn hàng</h3>
          <p>Danh Sách đơn hàng</p>
        </div>
      </div>
      <section className="ps-items-listing">
        <div className="ps-section__actions pb-2">
          <Link className="ps-btn success" to="/orders/create-order">
            <FaPlusCircle />
            <span>Tạo đơn hàng</span>
          </Link>
        </div>
        <div className="ps-section__content">
          <div className="table-responsive">
            <TableListOrders />
          </div>
        </div>
      </section>
    </div>
  );
};
export default Orders;
