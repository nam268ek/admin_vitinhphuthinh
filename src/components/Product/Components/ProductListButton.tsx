import { DownOutlined, SyncOutlined } from '@ant-design/icons';
import { Button, Dropdown, message, Space, Tooltip } from 'antd';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { history } from '../../../utils/history';
import {
  getDeleteListProductService,
  getListProductService,
} from '../../redux/Slices/ProductSlice';
import { RootState } from '../../redux/store/store';
import { openMessage } from '../../services/general.service';
import { DropDownNewProduct } from './DropDownNewProduct';
import { ExcelBotton } from './ExcelBotton';

export const ProductListButton: React.FC<any> = ({ selectedIds }) => {
  const { products } = useSelector((state: RootState) => state.product);

  const dispatch = useDispatch();

  const hasSelected = selectedIds.length > 0 && products.length > 0;

  const handleActionDropdown = async (event: any) => {
    const { key } = event;
    switch (key) {
      case '1':
        await dispatch(getDeleteListProductService({ ids: selectedIds }));
        break;
      case '2':
        if (selectedIds.length === 1) {
          history.push(`${location.pathname}/${selectedIds[0]}`);
        } else {
          message.error('Vui lòng chỉ chọn 1 sản phẩm');
        }
        break;
    }
  };

  const items = [
    {
      label: 'Xoá sản phẩm',
      key: 1,
    },
    {
      label: ' Chỉnh sửa sản phẩm',
      key: 2,
    },
  ];

  const menu = {
    items,
    onClick: (e: any) => handleActionDropdown(e),
  };

  return (
    <div className="flex mb-4 justify-between">
      <p className="text-2xl m-0 flex items-center">Sản phẩm</p>
      <Space align="center">
        {selectedIds?.length > 0 && (
          <p className="flex items-center m-0 text-gray-600">
            Đã chọn {selectedIds?.length}/{products?.length} sản phẩm
          </p>
        )}
        <Dropdown disabled={!hasSelected} menu={menu} trigger={['click']}>
          <Button icon={<DownOutlined />}>Action</Button>
        </Dropdown>
        <div className="flex">
          {/* <ExcelBotton products={products} /> */}
          <DropDownNewProduct />
        </div>
      </Space>
    </div>
  );
};
