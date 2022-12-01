import React from 'react';
import { Form, Input } from 'antd';

const ConfigInfo: React.FC<any> = ({ onChange }) => {
  const { TextArea } = Input;

  return (
    <div className="panel-body row">
      <div>
        <table className="tbl-info-product">
          <tbody>
            <tr>
              <th className="attribute-label">Mã sản phẩm / Model </th>
              <td className="attribute-value ">
                <Form.Item noStyle name="model">
                  <Input width={'100%'} onChange={(e) => onChange(e, 'model')} />
                </Form.Item>
              </td>
            </tr>
            <tr>
              <th className="attribute-label">Bộ Vi Xử Lý / CPU </th>
              <td className="attribute-value highlight">
                <Form.Item noStyle name="cpu">
                  <Input width={'100%'} onChange={(e) => onChange(e, 'cpu')} />
                </Form.Item>
              </td>
            </tr>
            <tr>
              <th className="attribute-label">Bộ Nhớ Trong / RAM </th>
              <td className="attribute-value highlight">
                <Form.Item noStyle name="ram">
                  <Input width={'100%' || ''} onChange={(e) => onChange(e, 'ram')} />
                </Form.Item>
              </td>
            </tr>
            <tr>
              <th className="attribute-label">Ổ Cứng (HDD/SDD)</th>
              <td className="attribute-value highlight">
                <Form.Item noStyle name="hardDrive">
                  <Input width={'100%'} onChange={(e) => onChange(e, 'hardDrive')} />
                </Form.Item>
              </td>
            </tr>
            <tr>
              <th className="attribute-label">Màn hình / LCD </th>
              <td className="attribute-value ">
                <Form.Item noStyle name="monitor">
                  <Input width={'100%'} onChange={(e) => onChange(e, 'monitor')} />
                </Form.Item>
              </td>
            </tr>
            <tr>
              <th className="attribute-label">Chip Đồ Họa / VGA </th>
              <td className="attribute-value highlight">
                <Form.Item noStyle name="vgaCard">
                  <Input width={'100%'} onChange={(e) => onChange(e, 'vgaCard')} />
                </Form.Item>
              </td>
            </tr>
            <tr>
              <th className="attribute-label">Kết Nối / Network </th>
              <td className="attribute-value ">
                <Form.Item noStyle name="network">
                  <Input width={'100%'} onChange={(e) => onChange(e, 'network')} />
                </Form.Item>
              </td>
            </tr>
            <tr>
              <th className="attribute-label">Giao Tiếp Mở Rộng </th>
              <td className="attribute-value ">
                <Form.Item noStyle name="extend">
                  <TextArea onChange={(e) => onChange(e, 'extend')} />
                </Form.Item>
              </td>
            </tr>
            <tr>
              <th className="attribute-label">Dung Lượng Pin </th>
              <td className="attribute-value ">
                <Form.Item noStyle name="battery">
                  <Input width={'100%'} onChange={(e) => onChange(e, 'battery')} />
                </Form.Item>
              </td>
            </tr>
            <tr>
              <th className="attribute-label">Hệ Điều Hành / Operating System</th>
              <td className="attribute-value highlight">
                <Form.Item noStyle name="os">
                  <Input width={'100%'} onChange={(e) => onChange(e, 'os')} />
                </Form.Item>
              </td>
            </tr>
            <tr>
              <th className="attribute-label">Trọng Lượng / Weight </th>
              <td className="attribute-value ">
                <Form.Item noStyle name="weight">
                  <Input width={'100%'} onChange={(e) => onChange(e, 'weight')} />
                </Form.Item>
              </td>
            </tr>
            <tr>
              <th className="attribute-label">Màu Sắc </th>
              <td className="attribute-value ">
                <Form.Item noStyle name="color">
                  <Input width={'100%'} onChange={(e) => onChange(e, 'color')} />
                </Form.Item>
              </td>
            </tr>
            <tr>
              <th className="attribute-label">Xuất Xứ / Bảo Hành </th>
              <td className="attribute-value highlight">
                <Form.Item noStyle name="warranty">
                  <Input width={'100%'} onChange={(e) => onChange(e, 'warranty')} />
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
