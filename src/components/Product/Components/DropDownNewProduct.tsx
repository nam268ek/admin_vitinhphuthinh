import { DownOutlined } from '@ant-design/icons';
import { Button, Dropdown, MenuProps } from 'antd';
import { ItemType } from 'antd/es/menu/hooks/useItems';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { NAME_DROPDOWNS } from '../../../constants/const';
import { IDropdown } from '../../../types/types';
import { history } from '../../../utils/history';
import { setImageAction } from '../../redux/Slices/ImageSlice';
import {
  setDefaultProductAction,
  updateStateKeyProductAction,
} from '../../redux/Slices/ProductSlice';
import { RootState } from '../../redux/store/store';

export const DropDownNewProduct: React.FC = () => {
  const { dropdowns } = useSelector((state: RootState) => state.primary);
  const [options, setOptions] = useState<any[]>([]);

  const location = useLocation();
  const dispatch = useDispatch();

  const onClick: MenuProps['onClick'] = ({ key }) => {
    dispatch(updateStateKeyProductAction(key));
    dispatch(setImageAction([]));
    dispatch(setDefaultProductAction());
    history.push(`${location.pathname}/new/${key}`);
  };

  useEffect(() => {
    handleListDropdown();
  }, [dropdowns]);

  const handleListDropdown = () => {
    const list = dropdowns?.filter(
      (item: IDropdown) => item.name === NAME_DROPDOWNS.CATEGORY_PRODUCT,
    );
    const items = list[0]?.dropdowns?.map((o) => {
      return {
        label: o.label,
        key: o.value,
      };
    });
    if (list.length > 0) {
      setOptions(items);
    }
  };

  return (
    <Dropdown menu={{ items: options, onClick }} trigger={['click']}>
      <Button
        className="btn-green flex items-center border-0 h-full uppercase"
        style={{ height: '40px' }}
      >
        <DownOutlined size={12} />
        <span style={{ paddingLeft: '5px' }}>Thêm sản phẩm</span>
      </Button>
    </Dropdown>
  );
};
