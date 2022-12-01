/* eslint-disable curly */
import { Button, Upload } from 'antd';
import React, { useEffect } from 'react';
import { IoAddSharp } from 'react-icons/io5';
import { useDispatch } from 'react-redux';
import { read, utils } from 'xlsx';
import { UploadOutlined } from '@ant-design/icons';

export const UploadFileExcel: React.FC = () => {
  const [countUpload, setCountUpload] = React.useState<number>(0);
  const dispatch = useDispatch();
  const SheetJSFT = ['xlsx', 'xlsm', 'xls', 'xml', 'csv']
    .map((x) => {
      return '.' + x;
    })
    .join(',');

  useEffect(() => {
    // dispatch(getAllProducts({ role: "user" }));
  }, [countUpload]);

  const reqUploadExcel = async (info: any) => {
    const { onSuccess, onError } = info;
    /* Boilerplate to set up FileReader */
    const reader = new FileReader();
    const rABS = !!reader.readAsBinaryString;
    reader.onload = async (e: any) => {
      /* Parse data */
      const bstr = e.target.result;
      const wb = read(bstr, { type: rABS ? 'binary' : 'array' });
      /* Get first worksheet */
      const wsname = wb.SheetNames[0];
      const ws = wb.Sheets[wsname];
      /* Convert array of arrays */
      const dataRead = utils.sheet_to_json(ws, { header: 1 });
      /* handle req data */
      if (dataRead.length > 0) {
        const data: any[] = dataRead.filter((item: any) => item.length > 0);
        if (data.length > 0) {
          const newData = [];
          for (let i = 0; i < data.length - 1; i++) {
            const mergeData = data[i + 1].reduce((result: any, field: any, index: any) => {
              result[data[0][index]] = field;
              return result;
            }, {});
            newData.push(mergeData);
          }
          const dataListProducts = newData.map((item: any) => {
            return {
              status: item.status || true,
              img: [],
              title: item.title || '',
              price: item.pricesale || 0,
              pricesale: item.pricesale || 0,
              label: ((item.previousPrice - item.pricesale) / item.previousPrice) * 100 || 0,
              brand: item.brand || '',
              contsum: item.contsum || '',
              category: [item.category] || [''],
              hasDiscount: false,
              isNew: false,
              count: item.count || 0,
              sku: item.sku || '',
              isInCart: false,
              previousPrice: item.previousPrice || 0,
              contentEditor: '',
              contentInfo: {
                model: item.model || '',
                cpu: item.cpu || '',
                ram: item.ram || '',
                harddrive: item.harddrive || '',
                monitor: item.monitor || '',
                vgacard: item.vgacard || '',
                network: item.network || '',
                extend: item.extend || '',
                battery: item.battery || '',
                os: item.os || '',
                weight: item.weight || '',
                color: item.color || '',
                warranty: item.warranty || '',
              },
            };
          });
          // const bodyDataImportProducts = cloneDeep(originalProduct);
          // bodyDataImportProducts.action = "import";
          // bodyDataImportProducts.data = dataListProducts;
          // const res = await dispatch(reqUploadListProducts(bodyDataImportProducts));
          // if (res.payload.code === 200) {
          //   message.success("Upload file excel success", 3);
          //   onSuccess();
          //   setCountUpload(countUpload + 1);
          // } else {
          //   message.error("Upload file excel failed", 3);
          //   onError();
          // }
        }
      }
    };
    if (rABS) reader.readAsBinaryString(info.file);
    else reader.readAsArrayBuffer(info.file);
  };

  return (
    <Upload disabled customRequest={reqUploadExcel} accept={SheetJSFT} showUploadList={false}>
      <Button
        disabled={true}
        icon={<UploadOutlined />}
        className="bg-slate-100 h-10 mr-2 flex items-center"
      >
        <span className="ml-2 uppercase">Import Excel</span>
      </Button>
    </Upload>
  );
};
