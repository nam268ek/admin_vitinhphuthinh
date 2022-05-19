import React from "react";
import { Form, Select } from "antd";
import { ISelectService } from "../../types/types";
import { useDispatch, useSelector } from "react-redux";
import { filterListProducts } from "../redux/Slices/productSlice";

const SelectOption: React.FC<ISelectService> = ({ className, placeholder, defaultValue, isCategory, isBrand, isStatus, isDefault }) => {
  const [form] = Form.useForm<any>();
  const [selectedValues, setSelectedValues] = React.useState<any>([]);
  const dispatch = useDispatch();
  const { listAllCategory } = useSelector((state: any) => state.category);
  const { listAllProducts } = useSelector((state: any) => state.product);
  const { Option } = Select;
  
  const dataCategory = listAllCategory.map((item: any) => item.title);
  const dataBrand = ["Dell", "Asus", "Lenovo", "HP", "Canon"];
  const dataStatus = ["Còn hàng", "Hết hàng"];

  const handleChange = (e: any, select: any) => {
    setSelectedValues(e);
    //filter data for select
    if (select === "category") {
      const data: any = listAllProducts.filter((item: any) => item.category[0] === e);
      dispatch(filterListProducts(data));
    }
    if (select === "brand") {
      const data: any = listAllProducts.filter((item: any) => item.brand === e);
      dispatch(filterListProducts(data));
    }
    if (select === "status") {
      const data: any = listAllProducts.filter((item: any) => item.status === e);
      dispatch(filterListProducts(data));
    }
  };

  React.useEffect(() => {
    setSelectedValues([]);
  }, [isDefault]);

  if (isCategory) {
    return (
      <Select
        className={className}
        placeholder={placeholder}
        onChange={(e) => handleChange(e, "category")}
        value={selectedValues}
      >
        {dataCategory.map((item: any, index: any) => (
          <Option key={index} value={item}>
            {item}
          </Option>
        ))}
      </Select>
    );
  } else if (isBrand) {
    return (
      <Select className={className} placeholder={placeholder} onChange={(e) => handleChange(e, "brand")} value={selectedValues}>
        {dataBrand.map((item, index) => (
          <Option key={index} value={item}>
            {item}
          </Option>
        ))}
      </Select>
    );
  } else if (isStatus) {
    return (
      <Select className={className} placeholder={placeholder} onChange={(e) => handleChange(e, "status")} value={selectedValues}>
        {dataStatus.map((item, index) => (
          <Option key={index} value={item}>
            {item}
          </Option>
        ))}
      </Select>
    );
  } else
    return <Select placeholder={placeholder} className={className} onChange={(e) => handleChange(e, "category")} value={selectedValues}></Select>;
};

export default SelectOption;
