import { DownloadOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import React from 'react';
import { utils, writeFileXLSX } from 'xlsx';

export const ExportFileExcel: React.FC<any> = ({ data }) => {
  const exportToCSV = (listData: any) => {
    console.log(listData);
    const ws = utils.json_to_sheet(listData);
    const wb = { Sheets: { data: ws }, SheetNames: ['data'] };
    writeFileXLSX(wb, '*.xlsx');
  };

  return (
    <Button
      disabled={true}
      className="h-full bg-slate-100"
      icon={<DownloadOutlined />}
      onClick={(e) => exportToCSV(data)}
    >
      <span className="ml-2 uppercase">Export Excel</span>
    </Button>
  );
};
