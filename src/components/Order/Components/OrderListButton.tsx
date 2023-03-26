import { DownOutlined, PlusOutlined, SyncOutlined } from '@ant-design/icons';
import { Button, Dropdown, message, Space, Tooltip } from 'antd';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { NAME_ACTION } from '../../../constants/const';
import { history } from '../../../utils/history';
import {
  getListOrderService,
  setOrderAction,
  getRemoveOrderService,
} from '../../redux/Slices/OrderSlice';
import { RootState } from '../../redux/store/store';
import { openMessage } from '../../services/general.service';
import { ModelStatus } from './ModelStatus';

export const OrderListButton: React.FC<any> = ({ selectedIds, setSelectedIds }) => {
  const { orders } = useSelector((state: RootState) => state.order);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const hasSelected = selectedIds.length > 0 && orders.length > 0;
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const handleActionDropdown = async (event: any) => {
    const { key } = event;
    switch (key) {
      case '1':
        await dispatch(getRemoveOrderService({ ids: selectedIds }));
        break;
      case '2':
        if (selectedIds.length === 1) {
          navigate(`${location.pathname}/${selectedIds[0]}`);
        } else {
          message.error('Vui lòng chỉ chọn 1 sản phẩm');
        }
        break;
      case 3:
        openModalStatusOrders();
        break;
    }
  };

  const items = [
    {
      label: 'Xoá đơn hàng',
      key: 1,
    },
    {
      label: 'Chỉnh sửa đơn hàng',
      key: 2,
    },
    {
      label: 'Update trạng thái',
      key: 3,
    },
  ];

  const openModalStatusOrders = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleSyncData = async () => {
    const key = 'sync_data';
    try {
      message.loading({ content: 'Syncing...', key });
      await dispatch(getListOrderService()).unwrap();
      openMessage(undefined, key);
    } catch (error) {
      openMessage(error, key);
    }
  };

  const menu = {
    items,
    onClick: (e: any) => handleActionDropdown(e),
  };

  const handleCreateOrder = () => {
    dispatch(setOrderAction(NAME_ACTION.CREATE_ORDER));
    navigate('/orders/new', { replace: true });
  };

  return (
    <div className="flex mb-4 justify-between">
      <ModelStatus
        setSelectedIds={setSelectedIds}
        listItemSelect={selectedIds}
        open={isModalOpen}
        setOpen={setIsModalOpen}
      />
      <p className="text-2xl m-0 flex items-center">Đơn hàng</p>
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
        <Button
          className="flex items-center btn-green border-0"
          icon={<PlusOutlined />}
          onClick={handleCreateOrder}
        >
          <span className="uppercase">Tạo đơn hàng</span>
        </Button>
      </Space>
    </div>
  );
};
