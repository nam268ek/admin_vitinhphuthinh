import { DownOutlined, SyncOutlined } from '@ant-design/icons';
import { Button, Dropdown, Menu, message, Space, Switch, Table, Tooltip } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { TableRowSelection } from 'antd/es/table/interface';
import moment from 'moment';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { NAME_ACTION } from '../../../constants/const';
import { DataTypeMarketing, DataTypeProduct } from '../../../types/types';
import { history } from '../../../utils/history';
import { getListMarketingsService } from '../../redux/Slices/MarketingSlice';
import {
  getDeleteListProductService,
  getListProductService,
  getUpdateProductService,
  setAction,
  setItemSelectedAction,
} from '../../redux/Slices/ProductSlice';
import { RootState } from '../../redux/store/store';
import { formatMoney, openMessage } from '../../services/general.service';

export const TableListCampaigns: React.FC = () => {
  const { loading, marketings } = useSelector((state: RootState) => state.marketing);
  const [selectedIds, setSelectedIds] = React.useState<string[]>([]);

  const dispatch = useDispatch();
  const location = useLocation();

  const hasSelected = selectedIds.length > 0 && marketings.length > 0;
  const onSelectChange = (newSelectedRowKeys: React.Key[], selectedRows: DataTypeMarketing[]) => {
    const ids = selectedRows.map((row) => row.id);
    setSelectedIds(ids);
  };

  const rowSelection: TableRowSelection<DataTypeMarketing> = {
    onChange: onSelectChange,
  };

  const handleActionDropdown = async (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
    key: number,
  ) => {
    switch (key) {
      case 1:
        await dispatch(getDeleteListProductService({ ids: selectedIds }));
        break;
      case 2:
        if (selectedIds.length === 1) {
          e.preventDefault();
          history.push(`${location.pathname}/${selectedIds[0]}`);
        } else {
          message.error('Vui lòng chỉ chọn 1 sản phẩm');
        }
        break;
    }
  };

  const menu = (
    <Menu
      items={[
        {
          label: (
            <Link to="" onClick={(e) => handleActionDropdown(e, 1)}>
              Xoá sản phẩm
            </Link>
          ),
          key: '0',
        },
        {
          label: (
            <Link to="" onClick={(e) => handleActionDropdown(e, 2)}>
              Chỉnh sửa sản phẩm
            </Link>
          ),
          key: '1',
        },
      ]}
    />
  );

  const columns: ColumnsType<DataTypeMarketing> = [
    {
      title: 'Tên chương trình',
      dataIndex: 'name',
      key: 'name',
      render: (text: string, record: any) => (
        <span className="name-product" onClick={(e) => handleUpdateProduct(e, record)}>
          {text}
        </span>
      ),
    },
    {
      title: 'Sản phẩm',
      dataIndex: 'quantitySelected',
      key: 'quantitySelected',
      render: (quantitySelected: number) => (
        <span className="price-product">{quantitySelected}</span>
      ),
    },
    {
      title: 'Trạng thái',
      key: 'status',
      dataIndex: 'status',
      render: (value: any, item: DataTypeMarketing) => (
        <Switch
          key={item.id}
          checked={value}
          checkedChildren="Yes"
          unCheckedChildren="No"
          onChange={(e) => changeStatusProduct(e, item)}
        />
      ),
    },
    {
      title: 'Thời Gian',
      dataIndex: 'updatedAt',
      key: 'updatedAt',
      render: (text: string, item: DataTypeMarketing) => (
        <span>{`${moment(item.startDate).format('DD/MM/YYYY, h:mm:ss A')} - ${moment(
          item.endDate,
        ).format('DD/MM/YYYY, h:mm:ss A')}`}</span>
      ),
    },
  ];

  const changeStatusProduct = async (checked: boolean, item: any) => {
    await dispatch(getUpdateProductService({ productId: item.id, status: checked }));
  };

  const handleUpdateProduct = async (
    e: React.MouseEvent<HTMLSpanElement, MouseEvent>,
    item: any,
  ) => {
    e.preventDefault();
    dispatch(setAction(NAME_ACTION.UPDATE_PRODUCT));

    const product = marketings?.filter((o) => o.id === item.id);
    dispatch(setItemSelectedAction(product));
    history.push(`${location.pathname}/${item.id}`);
  };

  const convertListMarketings = (list: any[]) => {
    return list.map((item: any, index: number) => {
      const { id, name, status, startDate, endDate, listProducts } = item;
      return {
        key: index + 1,
        id,
        name,
        status,
        startDate,
        endDate,
        quantitySelected: listProducts.length,
      };
    });
  };
  const data: DataTypeMarketing[] = convertListMarketings(marketings);

  const handleSyncData = async () => {
    const key = 'sync_data';
    try {
      message.loading({ content: 'Syncing...', key });
      await dispatch(getListMarketingsService()).unwrap();
      openMessage(undefined, key);
    } catch (error) {
      openMessage(error, key);
    }
  };

  return (
    <>
      <Space align="center" className="mb-2">
        <Dropdown.Button
          loading={loading}
          disabled={!hasSelected}
          overlay={menu}
          trigger={['click']}
          icon={<DownOutlined className="d-flex justify-content-center align-items-center" />}
        >
          <Space>{loading ? 'Processing...' : 'Action'}</Space>
        </Dropdown.Button>
        <Tooltip placement="right" title="Refresh & Sync data">
          <Button
            type="default"
            className="d-flex justify-content-center align-items-center"
            icon={<SyncOutlined spin={loading} />}
            onClick={handleSyncData}
          ></Button>
        </Tooltip>
      </Space>
      <Table
        rowKey={(record) => record.id}
        rowSelection={rowSelection}
        columns={columns}
        dataSource={data}
        loading={loading}
      />
    </>
  );
};