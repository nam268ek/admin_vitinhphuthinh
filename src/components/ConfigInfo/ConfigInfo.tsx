import React from "react";
import { Input } from "antd";

const ConfigInfo: React.FC = () => {
  const { TextArea } = Input;
  const maxLength: number = 100;
  const maxLengthTextArea: number = 500;
  const onChange = (e: any) => {
    console.log("Change:", e.target.value);
  };

  return (
    <div className="panel-body row">
      <div>
        <table className="tbl-info-product">
          <tbody>
            <tr>
              <th className="attribute-label">Mã sản phẩm / Model </th>
              <td className="attribute-value ">
                <Input
                  showCount
                  maxLength={maxLength}
                  width={"100%"}
                  onChange={onChange}
                />
              </td>
            </tr>
            <tr>
              <th className="attribute-label">Bộ Vi Xử Lý / CPU </th>
              <td className="attribute-value highlight">
                <Input showCount maxLength={maxLength} onChange={onChange} />
              </td>
            </tr>
            <tr>
              <th className="attribute-label">Bộ Nhớ Trong / RAM </th>
              <td className="attribute-value highlight">
                <Input showCount maxLength={maxLength} onChange={onChange} />
              </td>
            </tr>
            <tr>
              <th className="attribute-label">Ổ Cứng / HDD </th>
              <td className="attribute-value highlight">
                <Input showCount maxLength={maxLength} onChange={onChange} />
              </td>
            </tr>
            <tr>
              <th className="attribute-label">Màn hình / LCD </th>
              <td className="attribute-value ">
                <Input showCount maxLength={maxLength} onChange={onChange} />
              </td>
            </tr>
            <tr>
              <th className="attribute-label">Chip Đồ Họa / VGA </th>
              <td className="attribute-value highlight">
                <Input showCount maxLength={maxLength} onChange={onChange} />
              </td>
            </tr>
            <tr>
              <th className="attribute-label">Kết Nối / Network </th>
              <td className="attribute-value ">
                <Input showCount maxLength={maxLength} onChange={onChange} />
              </td>
            </tr>
            <tr>
              <th className="attribute-label">Giao Tiếp Mở Rộng </th>
              <td className="attribute-value ">
                <TextArea
                  showCount
                  maxLength={maxLengthTextArea}
                  onChange={onChange}
                />
              </td>
            </tr>
            <tr>
              <th className="attribute-label">Dung Lượng Pin </th>
              <td className="attribute-value ">
                <Input showCount maxLength={maxLength} onChange={onChange} />
              </td>
            </tr>
            <tr>
              <th className="attribute-label">
                Hệ Điều Hành / Operating System{" "}
              </th>
              <td className="attribute-value highlight">
                <Input showCount maxLength={maxLength} onChange={onChange} />
              </td>
            </tr>
            <tr>
              <th className="attribute-label">Trọng Lượng / Weight </th>
              <td className="attribute-value ">
                <Input showCount maxLength={maxLength} onChange={onChange} />
              </td>
            </tr>
            <tr>
              <th className="attribute-label">Màu Sắc </th>
              <td className="attribute-value ">
                <Input showCount maxLength={maxLength} onChange={onChange} />
              </td>
            </tr>
            <tr>
              <th className="attribute-label">Xuất Xứ / Bảo Hành </th>
              <td className="attribute-value highlight">
                <Input showCount maxLength={maxLength} onChange={onChange} />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default ConfigInfo;
