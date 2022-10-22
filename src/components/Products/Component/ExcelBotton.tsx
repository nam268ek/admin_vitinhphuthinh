import React from 'react';
import { IPropsProducts } from '../../../types/types';
import { UploadFileExcel } from '../../common/UploadFIleExcel';
import { ExportFileExcel } from '../../ExportFileExcel/ExportFileExcel';

export const ExcelBotton: React.FC<IPropsProducts> = ({ products }) => {
  return (
    <>
      <ExportFileExcel data={products} />
      <UploadFileExcel />
    </>
  );
};
