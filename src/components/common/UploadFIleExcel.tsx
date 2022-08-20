import { UploadOutlined } from "@ant-design/icons";
import type { UploadProps } from "antd";
import { Button, message, Upload } from "antd";
import { cloneDeep } from "lodash";
import React, { useCallback, useEffect, useMemo } from "react";
import { IoAddSharp } from "react-icons/io5";
import { useDispatch } from "react-redux";
import { read, utils } from "xlsx";
import { history } from "../../utils/history";
import { setIsLoading } from "../redux/Slices/PrimarySlice";
import { reqUploadListProducts } from "../redux/Slices/productSlice";
import { originalProduct } from "./../Services/general.service";

const UploadFileExcel: React.FC<any> = ({ setLoadingTb }) => {
  const [listFile, setListFile] = React.useState<any[]>([]);
  const dispatch = useDispatch();
  const SheetJSFT = [
    "xlsx",
    "xlsb",
    "xlsm",
    "xls",
    "xml",
    "csv",
    "txt",
    "ods",
    "fods",
    "uos",
    "sylk",
    "dif",
    "dbf",
    "prn",
    "qpw",
    "123",
    "wb*",
    "wq*",
    "html",
    "htm",
  ]
    .map((x) => {
      return "." + x;
    })
    .join(",");
  /* generate an array of column objects */
  const make_cols = (refstr: any) => {
    let o = [],
      C = utils.decode_range(refstr).e.c + 1;
    for (var i = 0; i < C; ++i) o[i] = { name: utils.encode_col(i), key: i };
    return o;
  };

  const handleFileChange = (file: any) => {
    // /* Boilerplate to set up FileReader */
    // const reader = new FileReader();
    // const rABS = !!reader.readAsBinaryString;
    // reader.onload = (e: any) => {
    //   /* Parse data */
    //   const bstr = e.target.result;
    //   const wb = read(bstr, { type: rABS ? "binary" : "array" });
    //   /* Get first worksheet */
    //   const wsname = wb.SheetNames[0];
    //   const ws = wb.Sheets[wsname];
    //   // console.log(rABS, wb);
    //   /* Convert array of arrays */
    //   const data = utils.sheet_to_json(ws, { header: 1 });
    //   /* Update state */
    //   setListFile(data);
    //   // console.log({ data: data, cols: make_cols(ws["!ref"]) });
    // };
    // if (rABS) reader.readAsBinaryString(file.fileList[0].originFileObj);
    // else reader.readAsArrayBuffer(file.fileList[0].originFileObj);
  };

  // useEffect(() => {
  //   const handleProcessData = async () => {
  //   if (listFile.length > 0) {
  //     const data = listFile.filter((item: any) => item.length > 0);
  //     if (data.length > 0) {
  //       let newData: any[] = [];
  //       for (let i = 0; i < data.length - 1; i++) {
  //         const mergeData = data[i + 1].reduce((result: any, field: any, index: any) => {
  //           result[data[0][index]] = field;
  //           return result;
  //         }, {});
  //         newData.push(mergeData);
  //       }
  //       const dataListProducts = newData.map((item: any) => {
  //         return {
  //           status: item.status || true,
  //           img: [],
  //           title: item.title || "",
  //           price: item.pricesale || 0,
  //           pricesale: item.pricesale || 0,
  //           label: ((item.previousPrice - item.pricesale) / item.previousPrice) * 100 || 0,
  //           brand: item.brand || "",
  //           contsum: item.contsum || "",
  //           category: [item.category] || [""],
  //           hasDiscount: false,
  //           isNew: false,
  //           count: item.count || 0,
  //           sku: item.sku || "",
  //           isInCart: false,
  //           previousPrice: item.previousPrice || 0,
  //           contentEditor: "",
  //           contentInfo: {
  //             model: item.model || "",
  //             cpu: item.cpu || "",
  //             ram: item.ram || "",
  //             harddrive: item.harddrive || "",
  //             monitor: item.monitor || "",
  //             vgacard: item.vgacard || "",
  //             network: item.network || "",
  //             extend: item.extend || "",
  //             battery: item.battery || "",
  //             os: item.os || "",
  //             weight: item.weight || "",
  //             color: item.color || "",
  //             warranty: item.warranty || "",
  //           },
  //         };
  //       });
  //       const bodyDataImportProducts = cloneDeep(originalProduct);
  //       bodyDataImportProducts.action = "import";
  //       bodyDataImportProducts.data = dataListProducts;
  //       setLoadingTb(true);
  //       const res = await dispatch(reqUploadListProducts(bodyDataImportProducts));
  //       setLoadingTb(false);
  //       if (res.payload.code === 200) {
  //         message.success("Upload file excel success");
  //       } else {
  //         message.error("Upload file excel failed");
  //       }
  //     }
  //   }
  // };
  //   handleProcessData();
  // }, [listFile]);

  const reqUploadExcel = async (info: any) => {
    history.push("/categories");
    /* Boilerplate to set up FileReader */
    const reader = new FileReader();
    const rABS = !!reader.readAsBinaryString;
    reader.onload = async (e: any) => {
      /* Parse data */
      const bstr = e.target.result;
      const wb = read(bstr, { type: rABS ? "binary" : "array" });
      /* Get first worksheet */
      const wsname = wb.SheetNames[0];
      const ws = wb.Sheets[wsname];
      /* Convert array of arrays */
      const dataRead = utils.sheet_to_json(ws, { header: 1 });
      /* handle req data */
      if (dataRead.length > 0) {
        const data: any[] = dataRead.filter((item: any) => item.length > 0);
        if (data.length > 0) {
          let newData: any[] = [];
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
              title: item.title || "",
              price: item.pricesale || 0,
              pricesale: item.pricesale || 0,
              label: ((item.previousPrice - item.pricesale) / item.previousPrice) * 100 || 0,
              brand: item.brand || "",
              contsum: item.contsum || "",
              category: [item.category] || [""],
              hasDiscount: false,
              isNew: false,
              count: item.count || 0,
              sku: item.sku || "",
              isInCart: false,
              previousPrice: item.previousPrice || 0,
              contentEditor: "",
              contentInfo: {
                model: item.model || "",
                cpu: item.cpu || "",
                ram: item.ram || "",
                harddrive: item.harddrive || "",
                monitor: item.monitor || "",
                vgacard: item.vgacard || "",
                network: item.network || "",
                extend: item.extend || "",
                battery: item.battery || "",
                os: item.os || "",
                weight: item.weight || "",
                color: item.color || "",
                warranty: item.warranty || "",
              },
            };
          });
          const bodyDataImportProducts = cloneDeep(originalProduct);
          bodyDataImportProducts.action = "import";
          bodyDataImportProducts.data = dataListProducts;
          setLoadingTb(true);
          const res = await dispatch(reqUploadListProducts(bodyDataImportProducts));
          setLoadingTb(false);
          if (res.payload.code === 200) {
            message.success("Upload file excel success");
          } else {
            message.error("Upload file excel failed");
          }
        }
      }
    };
    if (rABS) reader.readAsBinaryString(info.file);
    else reader.readAsArrayBuffer(info.file);
  };

  return (
    <Upload customRequest={reqUploadExcel} onChange={handleFileChange} accept={SheetJSFT} showUploadList={true}>
      <IoAddSharp size={20} />
      <span>Import Excel</span>
    </Upload>
  );
};

export default UploadFileExcel;
