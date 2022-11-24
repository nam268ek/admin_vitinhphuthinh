/* eslint-disable no-useless-computed-key */
import { Form, Input, InputNumber } from 'antd';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { NAME_DROPDOWNS } from '../../../constants/const';
import { IDropdown } from '../../../types/types';
import { SelectOptionV2 } from '../../common/SelectOptionV2';
import { RootState } from '../../redux/store/store';
import { formatMoney } from '../../services/general.service';

export const OrderSummary: React.FC<any> = ({ onChange, form }) => {
  const { dropdowns } = useSelector((state: RootState) => state.primary);
  const [options, setOptions] = React.useState<any[]>([]);

  useEffect(() => {
    handleListDropdown();
  }, [dropdowns]);

  const handleListDropdown = () => {
    const list = dropdowns?.filter(
      (item: IDropdown) => item.name === NAME_DROPDOWNS.PAYMENT_METHOD,
    );
    if (list.length > 0) {
      setOptions(list[0].dropdowns);
    }
  };

  return (
    <>
      <figcaption className="header-figcaption">Order Summary</figcaption>
      <div className="ps-block__content order-sum">
        <div className="row">
          <div className="col-6">
            <div className="form-group">
              <label htmlFor="">Phương thức thanh toán</label>
              <SelectOptionV2
                name="paymentMethod"
                placeholder="Phương thức thanh toán"
                className="select-category"
                options={options}
                onChange={onChange}
              />
            </div>
          </div>
          <div className="col-6">
            <div className="form-group">
              <label htmlFor="">Tạm tính</label>
              <Form.Item name="subTotalOrderValue">
                <InputNumber
                  disabled
                  formatter={(value: any) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, '.')}
                  parser={(value: any) => value.replace(/\$\s?|(.*)/g, '')}
                  className="input-number-end"
                  addonAfter="VNĐ"
                />
              </Form.Item>
            </div>
          </div>
          <div className="col-6">
            <div className="form-group">
              <label htmlFor="">Giảm giá</label>
              <Form.Item name="discount">
                <InputNumber
                  min={0}
                  max={1000000000}
                  formatter={(value: any) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                  parser={(value: any) => value.replace(/\$\s?|(,*)/g, '')}
                  style={{ width: '100%' }}
                  placeholder="Giảm giá..."
                  addonAfter="VNĐ"
                  onChange={(e) => onChange(e, 'discount')}
                />
              </Form.Item>
            </div>
          </div>
          <div className="col-6">
            <div className="form-group">
              <label htmlFor="">Phí Ship</label>
              <Form.Item name="deliveryCharges">
                <InputNumber
                  min={0}
                  max={1000000000}
                  formatter={(value: any) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                  parser={(value: any) => value.replace(/\$\s?|(,*)/g, '')}
                  placeholder="Phí Ship..."
                  addonAfter="VNĐ"
                  style={{ width: '100%' }}
                  onChange={(e) => onChange(e, 'deliveryCharges')}
                />
              </Form.Item>
            </div>
          </div>
          <div className="col-12">
            <div className="form-group">
              <Form.Item name="totalOrderValue">
                <InputNumber
                  className="input-number-end w-100"
                  addonBefore="Tổng hóa đơn:"
                  formatter={(value: any) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, '.')}
                  parser={(value: any) => value.replace(/\$\s?|(.*)/g, '')}
                  disabled
                  addonAfter="VNĐ"
                />
              </Form.Item>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
