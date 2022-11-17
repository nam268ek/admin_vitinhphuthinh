import React from 'react';
import { useSelector } from 'react-redux';
import ImageDefault from '../../common/ImageDefault';
import NoContent from '../../common/NoContent';
import { RootState } from '../../redux/store/store';
import { formatMoney } from '../../services/general.service';

const OrderDetails: React.FC = () => {
  const { orders } = useSelector((state: RootState) => state.order);

  return (
    <>
      <figcaption>Order Detail</figcaption>
      <div className="ps-block__content order">
        {orders?.map((item: any, index: number) => (
          <div key={index}>
            <div className="row">
              <div className="col-8">
                <div className="content-left">
                  <div className="item">
                    <div className="i-img">
                      {item.img?.length > 0 ? (
                        <img src={item.img[0].secure_url} alt="product" />
                      ) : (
                        <ImageDefault />
                      )}
                    </div>
                  </div>
                  <div className="item">
                    <div className="i-content">
                      <h6>{item.title}</h6>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-4">
                <div className="content-right">
                  <div className="item">
                    <div className="i-price">
                      <span>{formatMoney.format(Number(item.price))}</span>
                    </div>
                    <div className="i-qty">
                      <p>
                        Số lượng: <span>{item.quantity}</span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {listOrder?.length - 1 !== index && <hr />}
          </div>
        ))}
        {listOrder?.length === 0 && <NoContent />}
      </div>
    </>
  );
};
export default OrderDetails;
