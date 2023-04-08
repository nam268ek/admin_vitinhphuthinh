import { DownOutlined } from '@ant-design/icons';
import { Button, Dropdown } from 'antd';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getDeleteListProductService } from '../../redux/Slices/ProductSlice';
import { RootState } from '../../redux/store/store';
import { DropDownNewProduct } from './DropDownNewProduct';
import { ModalProductAction } from '../../ModalProductAction';

export const ProductListButton: React.FC<any> = ({ selectedIds, resetSelection }) => {
  const { products } = useSelector((state: RootState) => state.product);
  const [open, setOpen] = useState<boolean>(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const hasSelected = selectedIds.length > 0 && products.length > 0;

  const handleActionDropdown = async (event: any) => {
    const { key } = event;
    switch (key) {
      case '1':
        await dispatch(getDeleteListProductService({ ids: selectedIds }));
        break;
      case '2':
        if (selectedIds.length > 0) {
          setOpen(true);
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

  const handleCancelModal = () => {
    setOpen(false);
  };

  return (
    <>
      <ModalProductAction resetSelection={resetSelection} ids={selectedIds} handleCancel={handleCancelModal} isOpen={open} />
      <div className="flex mb-4 justify-between">
        <p className="text-2xl m-0 flex items-center w-full">Sản phẩm</p>
        <div className="flex justify-end w-full">
          {selectedIds?.length > 0 && (
            <p className="flex items-center m-0 text-gray-600">
              Đã chọn {selectedIds?.length}/{products?.length} sản phẩm
            </p>
          )}
          <Dropdown disabled={!hasSelected} menu={menu} trigger={['click']}>
            <Button icon={<DownOutlined />}>Action</Button>
          </Dropdown>
          <div className="flex w-full">
            <DropDownNewProduct />
          </div>
        </div>
      </div>
    </>
  );
};
