import { DatePicker, Form, Input, Space } from 'antd';
import { RangePickerProps } from 'antd/es/date-picker';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import React from 'react';
import { MAX_LENGTH_TEXT } from '../../../constants/const';
import 'dayjs/locale/vi';
import locale from 'antd/es/date-picker/locale/vi_VN';

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

  const handleSelectDateTime = (dates: any, dateStrings: [string, string]) => {
    console.log(dates);
    console.log(dateStrings);
  };

  return (
    <figure>
      <figcaption className="rounded-t-md font-semibold text-base bg-blue-200 px-6 py-3">
        Thông tin cơ bản
      </figcaption>
      <div className="rounded-b-md px-6 py-4 border border-solid border-gray-200 border-t-0">
        <div className="grid grid-cols-2 grid-flow-col gap-4">
          <div className=" m-0">
            <label className="mb-3 text-sm font-normal">
              Tên chương trình khuyến mãi<sup className="text-red-600 ml-1">*</sup>
            </label>
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
          <div className="m-0">
            <label className="mb-3 text-sm font-normal">
              Thời gian khuyến mãi<sup className="text-red-600 ml-1">*</sup>
            </label>
            <Form.Item
              name="dateTime"
              rules={[
                {
                  required: true,
                  message: 'Vui lòng nhập',
                },
              ]}
            >
              <Space direction="vertical" size={12} style={{ width: '100%' }}>
                <RangePicker
                  locale={locale}
                  style={{ width: '100%' }}
                  disabledDate={disabledDate}
                  disabledTime={disabledRangeTime}
                  showNow
                  onChange={handleSelectDateTime}
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
    </figure>
  );
};
