/* eslint-disable curly */
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import ConfigInfo from '../../ConfigInfo/ConfigInfo';
import InfoPrintComponent from '../../InfoPrintComponent/InfoPrintComponent';
import { RootState } from '../../redux/store/store';

export const FormProductSpecs: React.FC<any> = ({ onChange }) => {
  const { keyProduct } = useSelector((state: RootState) => state.product);
  const [content, setContent] = useState<any>(<></>);

  useEffect(() => {
    setContent(handleShowSpecs());
  }, [keyProduct]);

  const handleShowSpecs = () => {
    if (keyProduct === 'Computer - Laptop') return <ConfigInfo onChange={onChange} />;
    else if (keyProduct === 'Printer') return <InfoPrintComponent onChange={onChange} />;
    else return <></>;
  };

  return (
    <figure className="ps-block--form-box">
      <figcaption>Thông tin cấu hình</figcaption>
      <div className="ps-block__content">{content}</div>
    </figure>
  );
};
