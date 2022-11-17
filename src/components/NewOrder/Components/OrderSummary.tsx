/* eslint-disable no-useless-computed-key */
import { Form, Input, InputNumber } from 'antd';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { IDropdown } from '../../../types/types';
import { SelectOptionV2 } from '../../common/SelectOptionV2';
import { RootState } from '../../redux/store/store';

export const OrderSummary: React.FC<any> = ({ form, onChange }) => {
  const { dropdowns } = useSelector((state: RootState) => state.primary);
  const [options, setOptions] = React.useState<any[]>([]);

  useEffect(() => {
    handleListDropdown();
  }, [dropdowns]);

  const handleListDropdown = () => {
    const list = dropdowns?.filter((item: IDropdown) => item.name === 'payment-method');
    if (list.length > 0) {
      setOptions(list[0].dropdowns);
    }
  };

  return (
    <>
      <figcaption>Order Summary</figcaption>
      <div className="ps-block__content order-sum">
        <div className="row">
          <div className="col-6">
            <div className="form-group">
              <SelectOptionV2
                name="paymentMethod"
                placeholder="Phương thức thanh toán"
                className="select-category"
                options={options}
              />
            </div>
          </div>
          <div className="col-6">
            <div className="row">
              <div className="col-6">
                <p className="title-price">Tạm tính</p>
              </div>
              <div className="col-6"></div>
              <Form.Item name="subTotalOrderValue">
                <Input disabled />
              </Form.Item>
            </div>
            <div className="row">
              <div className="i-sub">
                <Form.Item name="discount">
                  <InputNumber
                    min={0}
                    max={1000000000}
                    addonBefore="Giảm giá"
                    formatter={(value: any) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                    parser={(value: any) => value.replace(/\$\s?|(,*)/g, '')}
                    style={{ width: '100%' }}
                    placeholder="Giảm giá..."
                    onChange={(e) => onChange(e, 'discount')}
                  />
                </Form.Item>
              </div>
            </div>
            <div className="row">
              <div className="i-sub">
                <Form.Item name="deliveryCharges">
                  <InputNumber
                    min={0}
                    max={1000000000}
                    addonBefore="Phí Ship."
                    formatter={(value: any) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                    parser={(value: any) => value.replace(/\$\s?|(,*)/g, '')}
                    placeholder="Phí Ship..."
                    style={{ width: '100%' }}
                    onChange={(e) => onChange(e, 'deliveryCharges')}
                  />
                </Form.Item>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="line-dashed">
            <hr className="c-hr" />
          </div>
        </div>
        <div className="row">
          <div className="col-6">
            <p className="title-price">Tổng</p>
          </div>
          <div className="col-6">
            <div className="o-price">
              <Form.Item name="totalOrderValue">
                <Input disabled />
              </Form.Item>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
