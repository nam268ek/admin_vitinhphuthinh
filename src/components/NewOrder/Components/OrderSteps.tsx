import { Steps } from 'antd';
import React from 'react';

export const OrderSteps: React.FC<any> = ({ current, onChange }) => {
  return (
    <Steps
      current={current}
      onChange={onChange}
      items={[
        {
          title: 'Thêm sản phẩm',
          description: 'Thêm sản phẩm vào giỏ hàng',
        },
        {
          title: 'Khách hàng',
          description: 'Thông tin khách hàng',
        },
        {
          title: 'Xác nhận đơn hàng',
          description: 'Mô tả đơn hàng',
        },
      ]}
    />
  );
};
