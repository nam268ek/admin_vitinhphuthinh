import { Form, Input } from 'antd';
import React from 'react';
import { MAX_LENGTH_TEXT, UPLOAD_KEY } from '../../../constants/const';
import { ImageUploadV2 } from '../../ImageUpload/ImageUploadV2';
import { DropDownTags } from '../../NewProduct/Components/DropdownTags';
import { TreeCategory } from '../../NewProduct/Components/TreeCategory';

export const FormBlogBasic: React.FC<any> = ({ onChange }) => {
  return (
    <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
      <figure className="ps-block--form-box">
        <figcaption>Thông tin cơ bản</figcaption>
        <div className="ps-block__content">
          <div className="row">
            <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12">
              <div className="form-group">
                <label>
                  Tên bài đăng<sup>*</sup>
                </label>
                <Form.Item
                  name="name"
                  rules={[
                    {
                      required: true,
                      message: 'required',
                    },
                  ]}
                >
                  <Input
                    maxLength={MAX_LENGTH_TEXT}
                    showCount
                    placeholder="blog name"
                    onChange={(e) => onChange(e, 'name')}
                  />
                </Form.Item>
              </div>
              <div className="form-group">
                <label>
                  Blog url slug<sup>*</sup>
                </label>
                <Form.Item
                  name="name"
                  rules={[
                    {
                      required: true,
                      message: 'required',
                    },
                  ]}
                >
                  <Input
                    maxLength={MAX_LENGTH_TEXT}
                    showCount
                    placeholder="blog url"
                    onChange={(e) => onChange(e, 'name')}
                  />
                </Form.Item>
              </div>
              <div className="form-group">
                <label>
                  Danh mục<sup>*</sup>
                </label>
                <TreeCategory handleChange={onChange} />
              </div>
            </div>
            <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12">
              <div className="form-group h-150">
                <label>
                  Hình ảnh<sup>*</sup>
                </label>
                <div className="form-group--nest">
                  <ImageUploadV2 maxFiles={1} keyUpload={UPLOAD_KEY.IMAGE_BLOG} />
                </div>
              </div>
              <div className="form-group">
                <label>Tags</label>
                <DropDownTags handleChange={onChange} />
              </div>
            </div>
          </div>
        </div>
      </figure>
    </div>
  );
};
