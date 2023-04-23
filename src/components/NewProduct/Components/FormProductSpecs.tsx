/* eslint-disable curly */
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { CATEGORY_KEY } from '../../../constants/const';
import ConfigInfo from '../../ConfigInfo/ConfigInfo';
import InfoPrintComponent from '../../InfoPrintComponent/InfoPrintComponent';
import { RootState } from '../../redux/store/store';
import SpecsCameraComponent from '../../SpecsCameraComponent';
import SpecsRouterWifiComponent from '../../SpecsRouterWifiComponent';
import SpecsStorageDeviceComponent from '../../SpecsStorageDeviceComponent';
import SpecsRamComponent from '../../SpecsStorageDeviceComponent/SpecsRamComponent';

export const FormProductSpecs: React.FC<any> = ({ onChange }) => {
  const [content, setContent] = useState<any | undefined>(<></>);
  const { categories } = useSelector((state: RootState) => state.category);
  const { products } = useSelector((state: RootState) => state.product);
  const { categoryId, productId } = Object.fromEntries(new URLSearchParams(window.location.search));

  useEffect(() => {
    let categoryName;
    if (categoryId) {
      categoryName = categories.find((item: any) => item.id === categoryId)?.category;
      const JsxContent = handleShowSpecs(categoryName as CATEGORY_KEY);
      setContent(JsxContent);
    }
    if (productId) {
      categoryName = products.find((item: any) => item.id === productId)?.category?.category;
    }
    const JsxContent = handleShowSpecs(categoryName as CATEGORY_KEY);
    setContent(JsxContent);
  }, [categoryId]);

  const handleShowSpecs = (name: CATEGORY_KEY) => {
    switch (name) {
      case CATEGORY_KEY.LAPTOP:
        return <ConfigInfo onChange={onChange} />;
      case CATEGORY_KEY.PRINTER:
        return <InfoPrintComponent onChange={onChange} />;
      case CATEGORY_KEY.CAMERA:
        return <SpecsCameraComponent onChange={onChange} />;
      case CATEGORY_KEY.NETWORK_DEVICE:
        return <SpecsRouterWifiComponent onChange={onChange} />;
      case CATEGORY_KEY.STORAGE_DEVICE:
        return <SpecsStorageDeviceComponent onChange={onChange} />;
      case CATEGORY_KEY.PC_LAPTOP_ACCESSORIES:
        return <SpecsRamComponent onChange={onChange} />;
      default:
        return undefined;
    }
  };

  return (
    <>
      {content && (
        <figure>
          <figcaption className="rounded-t-md font-semibold text-base bg-blue-200 px-6 py-3">Thông tin cấu hình</figcaption>
          <div className="rounded-b-md px-6 py-4 border border-solid border-gray-200 border-t-0">{content}</div>
        </figure>
      )}
    </>
  );
};
