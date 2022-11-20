import { DatePicker, Form, Input, Space } from 'antd';
import { RangePickerProps } from 'antd/es/date-picker';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import React from 'react';
import { MAX_LENGTH_TEXT } from '../../../constants/const';

export const FormInfoBasic: React.FC<any> = ({ onChange }) => {
  dayjs.extend(customParseFormat);
  const { RangePicker } = DatePicker;

  // eslint-disable-next-line arrow-body-style
  const disabledDate: RangePickerProps['disabledDate'] = (current) => {
    // Can not select days before today and today
    return current && current < dayjs().endOf('day');
  };

  const range = (start: number, end: number) => {
    const result = [];
    for (let i = start; i < end; i++) {
      result.push(i);
    }
    return result;
  };

  const disabledRangeTime: RangePickerProps['disabledTime'] = (_, type) => {
    if (type === 'start') {
      return {
        // disabledHours: () => range(0, 13),
        // disabledMinutes: () => range(30, 60),
      };
    }
    return {
      //   disabledHours: () => range(0, 60).splice(20, 4),
      //   disabledMinutes: () => range(0, 31),
    };
  };

  return (
    <div className="col-xl-12 col-lg-6 col-md-12 col-sm-12 col-12">
      <figure className="ps-block--form-box">
        <figcaption className="header-figcaption">Thông tin cơ bản</figcaption>
        <div className="ps-block__content">
          <div className="row">
            <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12">
              <div className="form-group m-0">
                <label>Tên chương trình khuyến mãi</label>
                <Form.Item
                  name="name"
                  rules={[
                    {
                      required: true,
                      message: 'Vui lòng nhập ten',
                    },
                  ]}
                >
                  <Input
                    maxLength={MAX_LENGTH_TEXT}
                    showCount
                    onChange={(e) => onChange(e, 'firstName')}
                  />
                </Form.Item>
              </div>
            </div>
            <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12">
              <div className="form-group">
                <label>Thời gian khuyến mãi</label>
                <Form.Item
                  name="lastName"
                  rules={[
                    {
                      required: true,
                      message: 'Vui lòng nhập',
                    },
                  ]}
                >
                  <Space direction="vertical" size={12} style={{ width: '100%' }}>
                    <RangePicker
                      style={{ width: '100%' }}
                      disabledDate={disabledDate}
                      disabledTime={disabledRangeTime}
                      showNow
                      showTime={{
                        showNow: true,
                        defaultValue: [dayjs('00:00', 'HH:mm'), dayjs('11:59', 'HH:mm')],
                        format: 'HH:mm',
                      }}
                      format="YYYY-MM-DD HH:mm"
                    />
                  </Space>
                </Form.Item>
              </div>
            </div>
          </div>
        </div>
      </figure>
    </div>
  );
};
