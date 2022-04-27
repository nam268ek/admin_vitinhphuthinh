import React from "react";
import { Select } from "antd";
import { ISelectService } from "../../types/types";
import { useDispatch, useSelector } from "react-redux";
import { filterListProducts } from "../redux/Slices/productSlice";

const SelectOption: React.FC<ISelectService> = ({
  className,
  placeholder,
  defaultValue,
  isCategory,
  isBrand,
  isStatus,
}) => {
  const dispatch = useDispatch();
  const { listAllProducts } = useSelector((state: any) => state.product);
  const { Option } = Select;
  const dataCategory = [
    "Laptop Dell",
    "Laptop Asus",
    "Laptop Lenovo",
    "Máy in",
    "jack",
    "Yiminghe",
    "lucy",
  ];
  const dataBrand = ["Dell", "Asus", "Lenovo", "HP", "Canon"];
  const dataStatus = ["Còn hàng", "Hết hàng"];

  const handleChange = (e: any, select: any) => {
    //filter data for select
    if (select === "category") {
      const data: any = listAllProducts.filter(
        (item: any) => item.category === e
      );
      dispatch(filterListProducts(data));
    }
    if (select === "brand") {
      const data: any = listAllProducts.filter((item: any) => item.brand === e);
      dispatch(filterListProducts(data));
    }
    if (select === "status") {
      const data: any = listAllProducts.filter(
        (item: any) => item.status === e
      );
      dispatch(filterListProducts(data));
    }
  };

  if (isCategory) {
    return (
      <Select
        className={className}
        placeholder={placeholder}
        onChange={(e) => handleChange(e, "category")}
      >
        {dataCategory.map((item, index) => (
          <Option key={index} value={item}>
            {item}
          </Option>
        ))}
      </Select>
    );
  } else if (isBrand) {
    return (
      <Select
        className={className}
        placeholder={placeholder}
        onChange={(e) => handleChange(e, "brand")}
      >
        {dataBrand.map((item, index) => (
          <Option key={index} value={item}>
            {item}
          </Option>
        ))}
      </Select>
    );
  } else if (isStatus) {
    return (
      <Select
        className={className}
        placeholder={placeholder}
        onChange={(e) => handleChange(e, "status")}
      >
        {dataStatus.map((item, index) => (
          <Option key={index} value={item}>
            {item}
          </Option>
        ))}
      </Select>
    );
  } else
    return (
      <Select
        placeholder={placeholder}
        className={className}
        onChange={(e) => handleChange(e, "category")}
      ></Select>
    );
};

export default SelectOption;
