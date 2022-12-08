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

  const handleSyncData = async () => {
    const key = 'sync_data';
    try {
      message.loading({ content: 'Syncing...', key });
      await dispatch(getListProductService()).unwrap();
      openMessage(undefined, key);
    } catch (error) {
      openMessage(error, key);
    }
  };

  const menu = {
    items,
    onClick: (e: any) => handleActionDropdown(e),
  };

  return (
    <div className="flex mb-4 justify-between">
      <p className="text-2xl m-0 flex items-center">Sản phẩm</p>
      <Space align="end">
        <Dropdown.Button
          disabled={!hasSelected}
          menu={menu}
          trigger={['click']}
          icon={<DownOutlined />}
        >
          Action
        </Dropdown.Button>
        <Tooltip placement="right" title="Refresh & Sync data">
          <Button type="default" icon={<SyncOutlined />} onClick={handleSyncData}></Button>
        </Tooltip>
        <div className="flex">
          <ExcelBotton products={products} />
          <DropDownNewProduct />
        </div>
      </Space>
    </div>
  );
};
