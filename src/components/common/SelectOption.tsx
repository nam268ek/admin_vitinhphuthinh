import React from 'react';
import { Form, Select } from 'antd';
import { ISelectService } from '../../types/types';
import { useDispatch, useSelector } from 'react-redux';
// import { filterListProducts } from '../redux/Slices/ProductSlice';

export const SelectOption: React.FC<ISelectService> = ({
  className,
  isPayment,
  placeholder,
  defaultValue,
  isCategory,
  isBrand,
  isStatus,
  isDefault,
  disabled,
}) => {
  const [form] = Form.useForm<any>();
  const [selectedValues, setSelectedValues] = React.useState<any>([]);
  const dispatch = useDispatch();
  const { listAllCategory } = useSelector((state: any) => state.category);
  const { listAllProducts } = useSelector((state: any) => state.product);
  const { listDropDown } = useSelector((state: any) => state.primary);
  const { dataUpdate } = useSelector((state: any) => state.order);

  const { Option } = Select;
  const dataCategory = listAllCategory.map((item: any) => item.title);
  const dataBrand = listDropDown.length > 0 ? listDropDown[0]['dropdown']['list-brand'].map((brand: any) => brand.label) : [];
  const dataStatus = listDropDown.length > 0 ? listDropDown[0]['dropdown']['list-status'].map((brand: any) => brand.label) : [];
  const dataPayment = listDropDown.length > 0 ? listDropDown[0]['dropdown']['list-payment'].map((brand: any) => brand.label) : [];

  const handleChange = (e: any, select: any) => {
    setSelectedValues(e);
    //filter data for select
    if (select === 'category') {
      const data: any = listAllProducts.filter((item: any) => item.category[0] === e);
      // dispatch(filterListProducts(data));
    }
    if (select === 'brand') {
      const data: any = listAllProducts.filter((item: any) => item.brand === e);
      // dispatch(filterListProducts(data));
    }
    if (select === 'status') {
      const status = e === 'Active' ? true : false;
      const data: any = listAllProducts.filter((item: any) => item.status === status);
      // dispatch(filterListProducts(data));
    }
    if (select === 'payment') {
      console.log(form.getFieldValue('payment'));
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
        onChange={(e) => handleChange(e, 'category')}
        value={selectedValues}
      >
        {dataCategory?.map((item: any, index: any) => (
          <Option key={index} value={item}>
            {item}
          </Option>
        ))}
      </Select>
    );
  } else if (isBrand) {
    return (
      <Select className={className} placeholder={placeholder} onChange={(e) => handleChange(e, 'brand')} value={selectedValues}>
        {dataBrand?.map((item: any, index: any) => (
          <Option key={index} value={item}>
            {item}
          </Option>
        ))}
      </Select>
    );
  } else if (isStatus) {
    return (
      <Select className={className} placeholder={placeholder} onChange={(e) => handleChange(e, 'status')} value={selectedValues}>
        {dataStatus?.map((item: any, index: any) => (
          <Option key={index} value={item}>
            {item}
          </Option>
        ))}
      </Select>
    );
  } else if (isPayment) {
    return (
      <Form.Item name="payment" className={className} initialValue={dataUpdate[0] ? dataUpdate[0].priord.payment : ''}>
        <Select placeholder={placeholder} value={selectedValues} disabled={disabled}>
          {dataPayment?.map((item: any, index: any) => (
            <Option key={index} value={item}>
              {item}
            </Option>
          ))}
        </Select>
      </Form.Item>
    );
  } else {
    return (
      <Select
        placeholder={placeholder}
        className={className}
        onChange={(e) => handleChange(e, 'category')}
        value={selectedValues}
      ></Select>
    );
  }
};
