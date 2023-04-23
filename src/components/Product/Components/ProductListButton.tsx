import { Checkbox } from 'antd';
import { Edit, Trash } from 'lucide-react';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { ModalProductAction } from '../../ModalProductAction';
import { getDeleteListProductService } from '../../redux/Slices/ProductSlice';
import { RootState } from '../../redux/store/store';
import { DropDownNewProduct } from './DropDownNewProduct';

export const ProductListButton: React.FC<any> = ({ selectedIds, resetSelection }) => {
  const { products } = useSelector((state: RootState) => state.product);
  const [open, setOpen] = useState<boolean>(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const hasSelected = selectedIds.length > 0 && products.length > 0;

  const handleAction = async (type: 'edit' | 'delete') => {
    switch (type) {
      case 'delete':
        await dispatch(getDeleteListProductService({ ids: selectedIds }));
        resetSelection();
        break;
      case 'edit':
        if (selectedIds.length > 0) {
          setOpen(true);
        }
        break;
    }
  };

  const handleCancelModal = () => {
    setOpen(false);
  };

  const handleUnchecked = () => {
    resetSelection();
  };

  return (
    <>
      <ModalProductAction resetSelection={resetSelection} ids={selectedIds} handleCancel={handleCancelModal} isOpen={open} />
      {!hasSelected ? (
        <div className="flex mb-4 justify-between">
          <p className="text-2xl m-0 flex items-center w-full">Sản phẩm</p>
          <div className="flex justify-end w-full">
            <div className="flex w-full">
              <DropDownNewProduct />
            </div>
          </div>
        </div>
      ) : (
        <div className="flex mb-4 justify-between bg-[#111827] bg-opacity-90 py-1 px-2 rounded-lg">
          <div className="flex items-center space-x-3">
            <div>
              <Checkbox className="c-checkbox" defaultChecked onChange={handleUnchecked} />
            </div>
            <div>
              <p className="flex items-center m-0 text-gray-100 text-base font-medium">{selectedIds?.length} sản phẩm đã chọn</p>
            </div>
          </div>
          <div className="flex gap-2">
            <span
              title="Sửa sản phẩm"
              onClick={() => handleAction('edit')}
              className="flex p-2 rounded-lg hover:bg-gray-100 hover:bg-opacity-20 hover:cursor-pointer transition duration-300 ease-in-out"
            >
              <Edit color="white" size={20} />
            </span>
            <span
              title="Xóa sản phẩm"
              onClick={() => handleAction('delete')}
              className="flex p-2 rounded-lg hover:bg-gray-100 hover:bg-opacity-20 hover:cursor-pointer transition duration-300 ease-in-out"
            >
              <Trash color="white" size={20} />
            </span>
          </div>
        </div>
      )}
    </>
  );
};
