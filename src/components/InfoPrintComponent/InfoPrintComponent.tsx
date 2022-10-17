import { Form, Input } from "antd";
import React from "react";

const InfoPrintComponent: React.FC<any> = ({ maxLength, defaultValue }) => {
  return (
    <div className="panel-body row">
      <div>
        <table className="tbl-info-product">
          <tbody>
            <tr>
              <th className="attribute-label">Model:</th>
              <td className="attribute-value ">
                <Form.Item name="model" initialValue={defaultValue.model || ""}>
                  <Input maxLength={maxLength} showCount width={"100%"} />
                </Form.Item>
              </td>
            </tr>
            <tr>
              <th className="attribute-label">Màu sắc: </th>
              <td className="attribute-value highlight">
                <Form.Item name="color" initialValue={defaultValue.color || ""}>
                  <Input maxLength={maxLength} showCount width={"100%"} />
                </Form.Item>
              </td>
            </tr>
            <tr>
              <th className="attribute-label">Nhà sản xuất:</th>
              <td className="attribute-value highlight">
                <Form.Item name="nsx" initialValue={defaultValue.nsx}>
                  <Input maxLength={maxLength} showCount width={"100%" || ""} />
                </Form.Item>
              </td>
            </tr>
            <tr>
              <th className="attribute-label">Xuất xứ:</th>
              <td className="attribute-value highlight">
                <Form.Item name="in_country" initialValue={defaultValue.inCountry || ""}>
                  <Input maxLength={maxLength} showCount width={"100%"} />
                </Form.Item>
              </td>
            </tr>
            <tr>
              <th className="attribute-label">Thời gian bảo hành:</th>
              <td className="attribute-value ">
                <Form.Item name="time_warranty" initialValue={defaultValue.timeWarranty || ""}>
                  <Input maxLength={maxLength} showCount width={"100%"} />
                </Form.Item>
              </td>
            </tr>
            <tr>
              <th className="attribute-label">Địa điểm bảo hành:</th>
              <td className="attribute-value highlight">
                <Form.Item name="location_warranty" initialValue={defaultValue.locationWarranty || ""}>
                  <Input maxLength={maxLength} showCount width={"100%"} />
                </Form.Item>
              </td>
            </tr>
            <tr>
              <th className="attribute-label">Loại máy in:</th>
              <td className="attribute-value ">
                <Form.Item name="category_printer" initialValue={defaultValue.categoryPrinter || ""}>
                  <Input maxLength={maxLength} showCount width={"100%"} />
                </Form.Item>
              </td>
            </tr>
            <tr>
              <th className="attribute-label">Chức năng:</th>
              <td className="attribute-value ">
                <Form.Item name="function" initialValue={defaultValue.function || ""}>
                  <Input maxLength={maxLength} showCount width={"100%"} />
                </Form.Item>
              </td>
            </tr>
            <tr>
              <th className="attribute-label">Độ phân giải:</th>
              <td className="attribute-value ">
                <Form.Item name="pixel" initialValue={defaultValue.pixel || ""}>
                  <Input maxLength={maxLength} showCount width={"100%"} />
                </Form.Item>
              </td>
            </tr>
            <tr>
              <th className="attribute-label">Tốc độ in trắng đen:</th>
              <td className="attribute-value highlight">
                <Form.Item name="speed_print_black_white" initialValue={defaultValue.speedPrintBlackWhite || ""}>
                  <Input maxLength={maxLength} showCount width={"100%"} />
                </Form.Item>
              </td>
            </tr>
            <tr>
              <th className="attribute-label">Tốc độ in màu :</th>
              <td className="attribute-value ">
                <Form.Item name="speed_print_color" initialValue={defaultValue.speedPrintColor || ""}>
                  <Input maxLength={maxLength} showCount width={"100%"} />
                </Form.Item>
              </td>
            </tr>
            <tr>
              <th className="attribute-label">In 2 mặt tự động:</th>
              <td className="attribute-value ">
                <Form.Item name="auto_print" initialValue={defaultValue.autoPrint || ""}>
                  <Input maxLength={maxLength} showCount width={"100%"} />
                </Form.Item>
              </td>
            </tr>
            <tr>
              <th className="attribute-label">Loại mực in :</th>
              <td className="attribute-value highlight">
                <Form.Item name="category_ink" initialValue={defaultValue.categoryInk || ""}>
                  <Input maxLength={maxLength} showCount width={"100%"} />
                </Form.Item>
              </td>
            </tr>
            <tr>
              <th className="attribute-label">Bộ nhớ tích hợp:</th>
              <td className="attribute-value highlight">
                <Form.Item name="memory" initialValue={defaultValue.memory || ""}>
                  <Input maxLength={maxLength} showCount width={"100%"} />
                </Form.Item>
              </td>
            </tr>
            <tr>
              <th className="attribute-label">Khổ giấy:</th>
              <td className="attribute-value highlight">
                <Form.Item name="paper_size" initialValue={defaultValue.paperSize || ""}>
                  <Input maxLength={maxLength} showCount width={"100%"} />
                </Form.Item>
              </td>
            </tr>
            <tr>
              <th className="attribute-label">Khay đựng giấy:</th>
              <td className="attribute-value highlight">
                <Form.Item name="paper_tray" initialValue={defaultValue.paperTray || ""}>
                  <Input maxLength={maxLength} showCount width={"100%"} />
                </Form.Item>
              </td>
            </tr>
            <tr>
              <th className="attribute-label">Kết nối USB:</th>
              <td className="attribute-value highlight">
                <Form.Item name="usb_connect" initialValue={defaultValue.usbConnect || ""}>
                  <Input maxLength={maxLength} showCount width={"100%"} />
                </Form.Item>
              </td>
            </tr>
            <tr>
              <th className="attribute-label">Kết nối mạng:</th>
              <td className="attribute-value highlight">
                <Form.Item name="internet_connect" initialValue={defaultValue.internetConnect || ""}>
                  <Input maxLength={maxLength} showCount width={"100%"} />
                </Form.Item>
              </td>
            </tr>
            <tr>
              <th className="attribute-label">In từ thiết bị di động:</th>
              <td className="attribute-value highlight">
                <Form.Item name="print_to_mobile" initialValue={defaultValue.printToMobile || ""}>
                  <Input maxLength={maxLength} showCount width={"100%"} />
                </Form.Item>
              </td>
            </tr>
            <tr>
              <th className="attribute-label">Khối lượng sản phẩm (kg):</th>
              <td className="attribute-value highlight">
                <Form.Item name="weigth" initialValue={defaultValue.weigth || ""}>
                  <Input maxLength={maxLength} showCount width={"100%"} />
                </Form.Item>
              </td>
            </tr>
            <tr>
              <th className="attribute-label">Kích thước sản phẩm:</th>
              <td className="attribute-value highlight">
                <Form.Item name="size" initialValue={defaultValue.size || ""}>
                  <Input maxLength={maxLength} showCount width={"100%"} />
                </Form.Item>
              </td>
            </tr>
            <tr>
              <th className="attribute-label">Kích thước thùng:</th>
              <td className="attribute-value highlight">
                <Form.Item name="size_box" initialValue={defaultValue.sizeBox || ""}>
                  <Input maxLength={maxLength} showCount width={"100%"} />
                </Form.Item>
              </td>
            </tr>
            <tr>
              <th className="attribute-label">Khối lượng thùng (kg):</th>
              <td className="attribute-value highlight">
                <Form.Item name="weigth_box" initialValue={defaultValue.weigthBox || ""}>
                  <Input maxLength={maxLength} showCount width={"100%"} />
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
