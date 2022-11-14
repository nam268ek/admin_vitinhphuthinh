import React from 'react';
import { MdOutlineImportExport } from 'react-icons/md';
import { writeFileXLSX, utils } from 'xlsx';
import { Button } from 'antd';

export const ExportFileExcel: React.FC<any> = ({ data }) => {
  const exportToCSV = (listData: any) => {
    console.log(listData);
    const ws = utils.json_to_sheet(listData);
    const wb = { Sheets: { data: ws }, SheetNames: ['data'] };
    writeFileXLSX(wb, '*.xlsx');
  };

  return (
    <Button
      // disabled={data ? false : true}
      disabled={true}
      type="dashed"
      ghost
      className={data ? 'c-btn-gray mr-10 d-flex align-items-center' : 'mr-10 disabled'}
      onClick={(e) => exportToCSV(data)}
    >
      <MdOutlineImportExport size={18} />
      <span style={{ paddingLeft: '5px' }}>Export Excel</span>
    </Button>
  );
};
