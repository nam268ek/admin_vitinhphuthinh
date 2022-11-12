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
                <Form.Item name="model">
                  <Input showCount width={'100%'} onChange={(e) => onChange(e, 'model')} />
                </Form.Item>
              </td>
            </tr>
            <tr>
              <th className="attribute-label">Bộ Vi Xử Lý / CPU </th>
              <td className="attribute-value highlight">
                <Form.Item name="cpu">
                  <Input showCount width={'100%'} onChange={(e) => onChange(e, 'cpu')} />
                </Form.Item>
              </td>
            </tr>
            <tr>
              <th className="attribute-label">Bộ Nhớ Trong / RAM </th>
              <td className="attribute-value highlight">
                <Form.Item name="ram">
                  <Input showCount width={'100%' || ''} onChange={(e) => onChange(e, 'ram')} />
                </Form.Item>
              </td>
            </tr>
            <tr>
              <th className="attribute-label">Ổ Cứng (HDD/SDD)</th>
              <td className="attribute-value highlight">
                <Form.Item name="hardDrive">
                  <Input showCount width={'100%'} onChange={(e) => onChange(e, 'hardDrive')} />
                </Form.Item>
              </td>
            </tr>
            <tr>
              <th className="attribute-label">Màn hình / LCD </th>
              <td className="attribute-value ">
                <Form.Item name="monitor">
                  <Input showCount width={'100%'} onChange={(e) => onChange(e, 'monitor')} />
                </Form.Item>
              </td>
            </tr>
            <tr>
              <th className="attribute-label">Chip Đồ Họa / VGA </th>
              <td className="attribute-value highlight">
                <Form.Item name="vgaCard">
                  <Input showCount width={'100%'} onChange={(e) => onChange(e, 'vgaCard')} />
                </Form.Item>
              </td>
            </tr>
            <tr>
              <th className="attribute-label">Kết Nối / Network </th>
              <td className="attribute-value ">
                <Form.Item name="network">
                  <Input showCount width={'100%'} onChange={(e) => onChange(e, 'network')} />
                </Form.Item>
              </td>
            </tr>
            <tr>
              <th className="attribute-label">Giao Tiếp Mở Rộng </th>
              <td className="attribute-value ">
                <Form.Item name="extend">
                  <TextArea showCount onChange={(e) => onChange(e, 'extend')} />
                </Form.Item>
              </td>
            </tr>
            <tr>
              <th className="attribute-label">Dung Lượng Pin </th>
              <td className="attribute-value ">
                <Form.Item name="battery">
                  <Input showCount width={'100%'} onChange={(e) => onChange(e, 'battery')} />
                </Form.Item>
              </td>
            </tr>
            <tr>
              <th className="attribute-label">Hệ Điều Hành / Operating System</th>
              <td className="attribute-value highlight">
                <Form.Item name="os">
                  <Input showCount width={'100%'} onChange={(e) => onChange(e, 'os')} />
                </Form.Item>
              </td>
            </tr>
            <tr>
              <th className="attribute-label">Trọng Lượng / Weight </th>
              <td className="attribute-value ">
                <Form.Item name="weight">
                  <Input showCount width={'100%'} onChange={(e) => onChange(e, 'weight')} />
                </Form.Item>
              </td>
            </tr>
            <tr>
              <th className="attribute-label">Màu Sắc </th>
              <td className="attribute-value ">
                <Form.Item name="color">
                  <Input showCount width={'100%'} onChange={(e) => onChange(e, 'color')} />
                </Form.Item>
              </td>
            </tr>
            <tr>
              <th className="attribute-label">Xuất Xứ / Bảo Hành </th>
              <td className="attribute-value highlight">
                <Form.Item name="warranty">
                  <Input showCount width={'100%'} onChange={(e) => onChange(e, 'warranty')} />
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
