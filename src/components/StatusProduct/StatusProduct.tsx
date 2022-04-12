import React from "react";
import { Select } from "antd";

const StatusProduct: React.FC = () => {
  const { Option } = Select;
  const provinceData: any = ["Activate", "Deactivate"];
  const cityData: any = {
    Activate: ["Tồn kho", "Hết hàng"],
    Deactivate: ["Tồn kho", "Hết hàng"],
  };
  const [cities, setCities] = React.useState(cityData[provinceData[0]]);
  const [secondCity, setSecondCity] = React.useState(
    cityData[provinceData[0]][0]
  );

  const handleProvinceChange = (value: any) => {
    setCities(cityData[value]);
    setSecondCity(cityData[value][0]);
  };

  const onSecondCityChange = (value: any) => {
    setSecondCity(value);
  };

  return (
    <>
      <Select
        defaultValue={provinceData[0]}
        style={{ width: "100%" }}
        onChange={handleProvinceChange}
      >
        {provinceData.map((province: any) => (
          <Option key={province}>{province}</Option>
        ))}
      </Select>
      <Select
       style={{ width: "100%" }}
        value={secondCity}
        onChange={onSecondCityChange}
      >
        {cities.map((city: any) => (
          <Option key={city}>{city}</Option>
        ))}
      </Select>
    </>
  );
};

export default StatusProduct;
