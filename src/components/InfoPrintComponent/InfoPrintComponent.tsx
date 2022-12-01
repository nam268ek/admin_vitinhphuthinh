import { Form, Input } from 'antd';
import React from 'react';

const InfoPrintComponent: React.FC<any> = ({ onChange }) => {
  return (
    <div className="panel-body row">
      <div>
        <table className="tbl-info-product">
          <tbody>
            <tr>
              <th className="attribute-label">Model:</th>
              <td className="attribute-value ">
                <Form.Item noStyle name="model">
                  <Input width={'100%'} onChange={(e) => onChange(e, 'model')} />
                </Form.Item>
              </td>
            </tr>
            <tr>
              <th className="attribute-label">Màu sắc: </th>
              <td className="attribute-value highlight">
                <Form.Item noStyle name="color">
                  <Input width={'100%'} onChange={(e) => onChange(e, 'color')} />
                </Form.Item>
              </td>
            </tr>
            <tr>
              <th className="attribute-label">Nhà sản xuất:</th>
              <td className="attribute-value highlight">
                <Form.Item noStyle name="nsx">
                  <Input width={'100%' || ''} onChange={(e) => onChange(e, 'nsx')} />
                </Form.Item>
              </td>
            </tr>
            <tr>
              <th className="attribute-label">Xuất xứ:</th>
              <td className="attribute-value highlight">
                <Form.Item noStyle name="in_country">
                  <Input width={'100%'} onChange={(e) => onChange(e, 'in_country')} />
                </Form.Item>
              </td>
            </tr>
            <tr>
              <th className="attribute-label">Thời gian bảo hành:</th>
              <td className="attribute-value ">
                <Form.Item noStyle name="time_warranty">
                  <Input width={'100%'} onChange={(e) => onChange(e, 'time_warranty')} />
                </Form.Item>
              </td>
            </tr>
            <tr>
              <th className="attribute-label">Địa điểm bảo hành:</th>
              <td className="attribute-value highlight">
                <Form.Item noStyle name="location_warranty">
                  <Input width={'100%'} onChange={(e) => onChange(e, 'location_warranty')} />
                </Form.Item>
              </td>
            </tr>
            <tr>
              <th className="attribute-label">Loại máy in:</th>
              <td className="attribute-value ">
                <Form.Item noStyle name="category_printer">
                  <Input width={'100%'} onChange={(e) => onChange(e, 'category_printer')} />
                </Form.Item>
              </td>
            </tr>
            <tr>
              <th className="attribute-label">Chức năng:</th>
              <td className="attribute-value ">
                <Form.Item noStyle name="function">
                  <Input width={'100%'} onChange={(e) => onChange(e, 'function')} />
                </Form.Item>
              </td>
            </tr>
            <tr>
              <th className="attribute-label">Độ phân giải:</th>
              <td className="attribute-value ">
                <Form.Item noStyle name="pixel">
                  <Input width={'100%'} onChange={(e) => onChange(e, 'pixel')} />
                </Form.Item>
              </td>
            </tr>
            <tr>
              <th className="attribute-label">Tốc độ in trắng đen:</th>
              <td className="attribute-value highlight">
                <Form.Item noStyle name="speed_print_black_white">
                  <Input width={'100%'} onChange={(e) => onChange(e, 'speed_print_black_white')} />
                </Form.Item>
              </td>
            </tr>
            <tr>
              <th className="attribute-label">Tốc độ in màu :</th>
              <td className="attribute-value ">
                <Form.Item noStyle name="speed_print_color">
                  <Input width={'100%'} onChange={(e) => onChange(e, 'speed_print_color')} />
                </Form.Item>
              </td>
            </tr>
            <tr>
              <th className="attribute-label">In 2 mặt tự động:</th>
              <td className="attribute-value ">
                <Form.Item noStyle name="auto_print">
                  <Input width={'100%'} onChange={(e) => onChange(e, 'auto_print')} />
                </Form.Item>
              </td>
            </tr>
            <tr>
              <th className="attribute-label">Loại mực in :</th>
              <td className="attribute-value highlight">
                <Form.Item noStyle name="category_ink">
                  <Input width={'100%'} onChange={(e) => onChange(e, 'category_ink')} />
                </Form.Item>
              </td>
            </tr>
            <tr>
              <th className="attribute-label">Bộ nhớ tích hợp:</th>
              <td className="attribute-value highlight">
                <Form.Item noStyle name="memory">
                  <Input width={'100%'} onChange={(e) => onChange(e, 'memory')} />
                </Form.Item>
              </td>
            </tr>
            <tr>
              <th className="attribute-label">Khổ giấy:</th>
              <td className="attribute-value highlight">
                <Form.Item noStyle name="paper_size">
                  <Input width={'100%'} onChange={(e) => onChange(e, 'paper_size')} />
                </Form.Item>
              </td>
            </tr>
            <tr>
              <th className="attribute-label">Khay đựng giấy:</th>
              <td className="attribute-value highlight">
                <Form.Item noStyle name="paper_tray">
                  <Input width={'100%'} onChange={(e) => onChange(e, 'paper_tray')} />
                </Form.Item>
              </td>
            </tr>
            <tr>
              <th className="attribute-label">Kết nối USB:</th>
              <td className="attribute-value highlight">
                <Form.Item noStyle name="usb_connect">
                  <Input width={'100%'} onChange={(e) => onChange(e, 'usb_connect')} />
                </Form.Item>
              </td>
            </tr>
            <tr>
              <th className="attribute-label">Kết nối mạng:</th>
              <td className="attribute-value highlight">
                <Form.Item noStyle name="internet_connect">
                  <Input width={'100%'} onChange={(e) => onChange(e, 'internet_connect')} />
                </Form.Item>
              </td>
            </tr>
            <tr>
              <th className="attribute-label">In từ thiết bị di động:</th>
              <td className="attribute-value highlight">
                <Form.Item noStyle name="print_to_mobile">
                  <Input width={'100%'} onChange={(e) => onChange(e, 'print_to_mobile')} />
                </Form.Item>
              </td>
            </tr>
            <tr>
              <th className="attribute-label">Khối lượng sản phẩm (kg):</th>
              <td className="attribute-value highlight">
                <Form.Item noStyle name="weigth">
                  <Input width={'100%'} onChange={(e) => onChange(e, 'weigth')} />
                </Form.Item>
              </td>
            </tr>
            <tr>
              <th className="attribute-label">Kích thước sản phẩm:</th>
              <td className="attribute-value highlight">
                <Form.Item noStyle name="size">
                  <Input width={'100%'} onChange={(e) => onChange(e, 'size')} />
                </Form.Item>
              </td>
            </tr>
            <tr>
              <th className="attribute-label">Kích thước thùng:</th>
              <td className="attribute-value highlight">
                <Form.Item noStyle name="size_box">
                  <Input width={'100%'} onChange={(e) => onChange(e, 'size_box')} />
                </Form.Item>
              </td>
            </tr>
            <tr>
              <th className="attribute-label">Khối lượng thùng (kg):</th>
              <td className="attribute-value highlight">
                <Form.Item noStyle name="weigth_box">
                  <Input width={'100%'} onChange={(e) => onChange(e, 'weigth_box')} />
                </Form.Item>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default InfoPrintComponent;
