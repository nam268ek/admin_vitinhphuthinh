import React from "react";
import UploadFileExcel from "../../common/UploadFIleExcel";
import ExportFileExcel from "../../ExportFileExcel/ExportFileExcel";
import { IPropsProducts } from "../interfaces/product.interface";

export const ExcelBotton: React.FC<IPropsProducts> = ({ products }) => {
  return (
    <>
      <ExportFileExcel data={products} />
      <UploadFileExcel />
    </>
  );
};
