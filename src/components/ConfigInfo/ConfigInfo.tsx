import React from 'react';
import { Form, Input } from 'antd';
import { Controller } from 'react-hook-form';

const ConfigInfo: React.FC<any> = ({
  onSubmit,
  setValue,
  control,
  maxLength,
  maxLengthTextArea,
  defaultValue,
}) => {
  const { TextArea } = Input;

  return (
    <div className="panel-body row">
      <div>
        <table className="tbl-info-product">
          <tbody>
            <tr>
              <th className="attribute-label">Mã sản phẩm / Model </th>
              <td className="attribute-value ">
                <Form.Item name="model" initialValue={defaultValue.model || ''}>
                  <Input maxLength={maxLength} showCount width={'100%'} />
                </Form.Item>
              </td>
            </tr>
            <tr>
              <th className="attribute-label">Bộ Vi Xử Lý / CPU </th>
              <td className="attribute-value highlight">
                <Form.Item name="cpu" initialValue={defaultValue.cpu || ''}>
                  <Input maxLength={maxLength} showCount width={'100%'} />
                </Form.Item>
              </td>
            </tr>
            <tr>
              <th className="attribute-label">Bộ Nhớ Trong / RAM </th>
              <td className="attribute-value highlight">
                <Form.Item name="ram" initialValue={defaultValue.ram}>
                  <Input maxLength={maxLength} showCount width={'100%' || ''} />
                </Form.Item>
              </td>
            </tr>
            <tr>
              <th className="attribute-label">Ổ Cứng (HDD/SDD)</th>
              <td className="attribute-value highlight">
                <Form.Item name="harddrive" initialValue={defaultValue.harddrive || ''}>
                  <Input maxLength={maxLength} showCount width={'100%'} />
                </Form.Item>
              </td>
            </tr>
            <tr>
              <th className="attribute-label">Màn hình / LCD </th>
              <td className="attribute-value ">
                <Form.Item name="monitor" initialValue={defaultValue.monitor || ''}>
                  <Input maxLength={maxLength} showCount width={'100%'} />
                </Form.Item>
              </td>
            </tr>
            <tr>
              <th className="attribute-label">Chip Đồ Họa / VGA </th>
              <td className="attribute-value highlight">
                <Form.Item name="vgacard" initialValue={defaultValue.vgacard || ''}>
                  <Input maxLength={maxLength} showCount width={'100%'} />
                </Form.Item>
              </td>
            </tr>
            <tr>
              <th className="attribute-label">Kết Nối / Network </th>
              <td className="attribute-value ">
                <Form.Item name="network" initialValue={defaultValue.network || ''}>
                  <Input maxLength={maxLength} showCount width={'100%'} />
                </Form.Item>
              </td>
            </tr>
            <tr>
              <th className="attribute-label">Giao Tiếp Mở Rộng </th>
              <td className="attribute-value ">
                <Form.Item name="extend" initialValue={defaultValue.extend || ''}>
                  <TextArea maxLength={maxLengthTextArea} showCount />
                </Form.Item>
              </td>
            </tr>
            <tr>
              <th className="attribute-label">Dung Lượng Pin </th>
              <td className="attribute-value ">
                <Form.Item name="battery" initialValue={defaultValue.battery || ''}>
                  <Input maxLength={maxLength} showCount width={'100%'} />
                </Form.Item>
              </td>
            </tr>
            <tr>
              <th className="attribute-label">Hệ Điều Hành / Operating System</th>
              <td className="attribute-value highlight">
                <Form.Item name="os" initialValue={defaultValue.os || ''}>
                  <Input maxLength={maxLength} showCount width={'100%'} />
                </Form.Item>
              </td>
            </tr>
            <tr>
              <th className="attribute-label">Trọng Lượng / Weight </th>
              <td className="attribute-value ">
                <Form.Item name="weight" initialValue={defaultValue.weight || ''}>
                  <Input maxLength={maxLength} showCount width={'100%'} />
                </Form.Item>
              </td>
            </tr>
            <tr>
              <th className="attribute-label">Màu Sắc </th>
              <td className="attribute-value ">
                <Form.Item name="color" initialValue={defaultValue.color || ''}>
                  <Input maxLength={maxLength} showCount width={'100%'} />
                </Form.Item>
              </td>
            </tr>
            <tr>
              <th className="attribute-label">Xuất Xứ / Bảo Hành </th>
              <td className="attribute-value highlight">
                <Form.Item name="warranty" initialValue={defaultValue.warranty || ''}>
                  <Input maxLength={maxLength} showCount width={'100%'} />
                </Form.Item>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default ConfigInfo;
