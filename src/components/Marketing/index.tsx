import { Button, FloatButton } from 'antd';
import React from 'react';
import { FaPlusCircle } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { NAME_ACTION } from '../../constants/const';
import { setMarketingAction } from '../redux/Slices/MarketingSlice';
import { RootState } from '../redux/store/store';
import { Search } from '../Search/Search';
import { TableListCampaigns } from './Components/TableListCampaigns';
import { PlusOutlined } from '@ant-design/icons';

export const Marketings: React.FC = () => {
  const { products } = useSelector((state: RootState) => state.product);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleCreateMarketing = () => {
    dispatch(setMarketingAction(NAME_ACTION.CREATE_MARKETINGS));
    navigate('/marketings/new', { replace: true });
  };

  return (
    <div id="marketing">
      <div className="ps-main__wrapper">
        <div className="header--dashboard">
          <div className="header__left">
            <h3 className="text-4xl">Marketings</h3>
            <p>Danh sách chương trình</p>
          </div>
        </div>
        <section>
          <div className="grid grid-flow-col grid-cols-2 gap-2 mb-2">
            <div className="col-span-2">
              <Search listItems={products} className="w-full" />
            </div>
            <div className="col-span-1">
              <Button
                className="flex items-center btn-green h-full border-0"
                icon={<PlusOutlined />}
                onClick={handleCreateMarketing}
              >
                <span className="uppercase">Tạo mới</span>
              </Button>
            </div>
          </div>
          <div className="ps-section__header pb-1">
            <div className="ps-section__filter"></div>
          </div>
          <div className="ps-section__content">
            <div className="table-responsive">
              <TableListCampaigns />
            </div>
          </div>
        </section>
        <FloatButton type="primary" className="float-button-doc" tooltip={<div>Documents</div>} />
      </div>
    </div>
  );
};
