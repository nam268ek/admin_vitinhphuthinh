import { Form, Input } from 'antd';
import React from 'react';
import { MAX_LENGTH_TEXT } from '../../../constants/const';

export const FormMeta: React.FC = () => {
  return (
    <figure className="ps-block--form-box">
      <figcaption>Meta</figcaption>
      <div className="ps-block__content">
        <div className="form-group form-group--select">
          <label>
            Thương hiệu<sup>*</sup>
          </label>
          <div className="form-group__content">
            {/* <SelectAddItem
          defaultValue={dataUpdate[0] ? dataUpdate[0].brand : ""}
          listItem={listDropDown}
        /> */}
          </div>
        </div>
        <div className="form-group">
          <label>Tags</label>
          <Form.Item name="tags">
            <Input maxLength={MAX_LENGTH_TEXT} showCount />
          </Form.Item>
        </div>
      </div>
    </figure>
  );
};
