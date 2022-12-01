import React from 'react';
import { IPropsProducts } from '../../../types/types';
import { UploadFileExcel } from '../../common/UploadFIleExcel';
import { ExportFileExcel } from '../../ExportFileExcel/ExportFileExcel';

export const ExcelBotton: React.FC<IPropsProducts> = ({ products }) => {
  return (
    <div className="flex gap-2">
      <ExportFileExcel data={products} />
      <UploadFileExcel />
    </div>
  );
};
