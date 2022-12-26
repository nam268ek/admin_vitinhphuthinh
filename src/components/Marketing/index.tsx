import { PlusOutlined } from '@ant-design/icons';
import { Breadcrumb, Button, FloatButton, Layout, theme } from 'antd';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { NAME_ACTION } from '../../constants/const';
import { getListMarketingsService, setMarketingAction } from '../redux/Slices/MarketingSlice';
import { RootState } from '../redux/store/store';
import { Search } from '../Search/Search';
import { TableListCampaigns } from './Components/TableListCampaigns';

const { Header, Content } = Layout;

export const Marketings: React.FC = () => {
  const { products } = useSelector((state: RootState) => state.product);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getListMarketingsService()).unwrap();
  }, []);

  const handleCreateMarketing = () => {
    dispatch(setMarketingAction(NAME_ACTION.CREATE_MARKETINGS));
    navigate('/marketings/new', { replace: true });
  };

  return (
    <>
      <Header
        className="sticky top-0 z-1 w-full flex"
        style={{ background: colorBgContainer, paddingInline: '35px' }}
      >
        <p className="text-2xl m-0 flex items-center">Marketings</p>
      </Header>
      <Content className="my-0 mx-4">
        <Breadcrumb className="mx-0 my-2 px-5">
          <Breadcrumb.Item>Marketings</Breadcrumb.Item>
          <Breadcrumb.Item>List</Breadcrumb.Item>
        </Breadcrumb>
        <div style={{ background: colorBgContainer }} className="px-5 py-6 min-h-full">
          <div className="flex mb-2">
            <Search
              listItems={products}
              className="w-full"
              placeholder="Tìm kiếm chương trình..."
            />
            <Button
              className="flex items-center btn-green h-[40px] border-0 ml-2"
              icon={<PlusOutlined />}
              onClick={handleCreateMarketing}
            >
              <span className="uppercase">Tạo mới</span>
            </Button>
          </div>
          <TableListCampaigns />
        </div>
        <FloatButton type="primary" className="float-button-doc" tooltip={<div>Documents</div>} />
      </Content>
    </>
  );
};
