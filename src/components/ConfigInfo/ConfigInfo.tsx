import React from "react";
import { Input } from "antd";
import { Controller } from "react-hook-form";

const ConfigInfo: React.FC<any> = ({
  onSubmit,
  setValue,
  control,
  maxLength,
  maxLengthTextArea,
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
                <Controller
                  name="model"
                  defaultValue=""
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      maxLength={maxLength}
                      showCount
                      width={"100%"}
                      onChange={(e) => {
                        setValue(field.name, e.target.value);
                      }}
                    />
                  )}
                />
              </td>
            </tr>
            <tr>
              <th className="attribute-label">Bộ Vi Xử Lý / CPU </th>
              <td className="attribute-value highlight">
                <Controller
                  name="cpu"
                  defaultValue=""
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      maxLength={maxLength}
                      showCount
                      width={"100%"}
                      onChange={(e) => {
                        setValue(field.name, e.target.value);
                      }}
                    />
                  )}
                />
              </td>
            </tr>
            <tr>
              <th className="attribute-label">Bộ Nhớ Trong / RAM </th>
              <td className="attribute-value highlight">
                <Controller
                  name="ram"
                  defaultValue=""
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      maxLength={maxLength}
                      showCount
                      width={"100%"}
                      onChange={(e) => {
                        setValue(field.name, e.target.value);
                      }}
                    />
                  )}
                />
              </td>
            </tr>
            <tr>
              <th className="attribute-label">Ổ Cứng (HDD/SDD)</th>
              <td className="attribute-value highlight">
                <Controller
                  name="harddrive"
                  defaultValue=""
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      maxLength={maxLength}
                      showCount
                      width={"100%"}
                      onChange={(e) => {
                        setValue(field.name, e.target.value);
                      }}
                    />
                  )}
                />
              </td>
            </tr>
            <tr>
              <th className="attribute-label">Màn hình / LCD </th>
              <td className="attribute-value ">
                <Controller
                  name="monitor"
                  defaultValue=""
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      maxLength={maxLength}
                      showCount
                      width={"100%"}
                      onChange={(e) => {
                        setValue(field.name, e.target.value);
                      }}
                    />
                  )}
                />
              </td>
            </tr>
            <tr>
              <th className="attribute-label">Chip Đồ Họa / VGA </th>
              <td className="attribute-value highlight">
                <Controller
                  name="vgacard"
                  defaultValue=""
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      maxLength={maxLength}
                      showCount
                      width={"100%"}
                      onChange={(e) => {
                        setValue(field.name, e.target.value);
                      }}
                    />
                  )}
                />
              </td>
            </tr>
            <tr>
              <th className="attribute-label">Kết Nối / Network </th>
              <td className="attribute-value ">
                <Controller
                  name="network"
                  defaultValue=""
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      maxLength={maxLength}
                      showCount
                      width={"100%"}
                      onChange={(e) => {
                        setValue(field.name, e.target.value);
                      }}
                    />
                  )}
                />
              </td>
            </tr>
            <tr>
              <th className="attribute-label">Giao Tiếp Mở Rộng </th>
              <td className="attribute-value ">
                <Controller
                  name="extend"
                  defaultValue=""
                  control={control}
                  render={({ field }) => (
                    <TextArea
                      {...field}
                      maxLength={maxLengthTextArea}
                      showCount
                      onChange={(e) => {
                        setValue(field.name, e.target.value);
                      }}
                    />
                  )}
                />
              </td>
            </tr>
            <tr>
              <th className="attribute-label">Dung Lượng Pin </th>
              <td className="attribute-value ">
                <Controller
                  name="battery"
                  defaultValue=""
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      maxLength={maxLength}
                      showCount
                      width={"100%"}
                      onChange={(e) => {
                        setValue(field.name, e.target.value);
                      }}
                    />
                  )}
                />
              </td>
            </tr>
            <tr>
              <th className="attribute-label">
                Hệ Điều Hành / Operating System
              </th>
              <td className="attribute-value highlight">
                <Controller
                  name="os"
                  defaultValue=""
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      maxLength={maxLength}
                      showCount
                      width={"100%"}
                      onChange={(e) => {
                        setValue(field.name, e.target.value);
                      }}
                    />
                  )}
                />
              </td>
            </tr>
            <tr>
              <th className="attribute-label">Trọng Lượng / Weight </th>
              <td className="attribute-value ">
                <Controller
                  name="weight"
                  defaultValue=""
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      maxLength={maxLength}
                      showCount
                      width={"100%"}
                      onChange={(e) => {
                        setValue(field.name, e.target.value);
                      }}
                    />
                  )}
                />
              </td>
            </tr>
            <tr>
              <th className="attribute-label">Màu Sắc </th>
              <td className="attribute-value ">
                <Controller
                  name="color"
                  defaultValue=""
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      maxLength={maxLength}
                      showCount
                      width={"100%"}
                      onChange={(e) => {
                        setValue(field.name, e.target.value);
                      }}
                    />
                  )}
                />
              </td>
            </tr>
            <tr>
              <th className="attribute-label">Xuất Xứ / Bảo Hành </th>
              <td className="attribute-value highlight">
                <Controller
                  name="warranty"
                  defaultValue=""
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      maxLength={maxLength}
                      showCount
                      width={"100%"}
                      onChange={(e) => {
                        setValue(field.name, e.target.value);
                      }}
                    />
                  )}
                />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default ConfigInfo;
