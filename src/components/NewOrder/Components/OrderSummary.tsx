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
    const list = dropdowns?.filter((item: IDropdown) => item.name === NAME_DROPDOWNS.PAYMENT_METHOD);
    if (list.length > 0) {
      setOptions(list[0].dropdowns);
    }
  };

  return (
    <>
      <div className="flex items-baseline justify-between px-3 py-4 bg-gray-100 mb-3 rounded-md border-x border-y border-solid border-gray-200">
        <p className="m-0 text-sm">Tổng quan đơn hàng</p>
      </div>
      <div className="flex items-baseline justify-between px-3 py-4 bg-gray-100 mb-3 rounded-md border-x border-y border-solid border-gray-200">
        <div className="grid grid-rows-2 grid-flow-row grid-cols-2 gap-3">
          <div className="mb-3">
            <label className="mb-3 text-sm font-normal">
              Phương thức thanh toán<sup className="text-red-600 ml-1">*</sup>
            </label>
            <SelectOptionV2
              name="paymentMethod"
              placeholder="Phương thức thanh toán"
              className="w-full m-0"
              options={options}
              // handleOnChange={onChange}
              rules={[{ require: true, message: 'Field required' }]}
            />
          </div>
          <div className="mb-3">
            <label className="mb-3 text-sm font-normal">Tạm tính</label>
            <Form.Item noStyle name="subTotalOrderValue">
              <InputNumber
                disabled
                formatter={(value: any) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, '.')}
                parser={(value: any) => value.replace(/\$\s?|(.*)/g, '')}
                className="input-number-end w-full"
                addonAfter="VNĐ"
              />
            </Form.Item>
          </div>
          <div className="mb-3">
            <label className="mb-3 text-sm font-normal">Giảm giá</label>
            <Form.Item noStyle name="discount">
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
          <div className="mb-3">
            <label className="mb-3 text-sm font-normal">Phí Ship</label>
            <Form.Item noStyle name="deliveryCharges">
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
          <div className="col-span-2">
            <div className="mb-3 pt-2">
              <Form.Item noStyle name="totalOrderValue">
                <InputNumber
                  className="input-number-end w-full"
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
