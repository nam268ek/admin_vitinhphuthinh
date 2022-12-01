import { Form, Input } from 'antd';
import { FormInstance } from 'rc-field-form/lib/interface';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { MAX_LENGTH_TEXT, NAME_DROPDOWNS, UPLOAD_KEY } from '../../../constants/const';
import { IDropdown } from '../../../types/types';
import { SelectOptionV2 } from '../../common/SelectOptionV2';
import { ImageUploadV2 } from '../../ImageUpload/ImageUploadV2';
import { DropDownTags } from '../../NewProduct/Components/DropdownTags';
import { TreeCategory } from '../../NewProduct/Components/TreeCategory';
import { RootState } from '../../redux/store/store';
import { convertViToEn } from '../../services/general.service';
import { FormSelectStatusPost } from './FormSelectStatusPost';

export const FormBlogBasic: React.FC<{ onChange: any; form: FormInstance }> = ({
  onChange,
  form,
}) => {
  const { dropdowns } = useSelector((state: RootState) => state.primary);
  const [options, setOptions] = useState<any[]>([]);
  useEffect(() => {
    handleListDropdown();
  }, [dropdowns]);

  const handleListDropdown = () => {
    const list = dropdowns?.filter(
      (item: IDropdown) => item.name === NAME_DROPDOWNS.POST_STATUS_OPTIONS,
    );
    if (list.length > 0) {
      setOptions(list[0].dropdowns);
    }
  };

  const onChangeName = (event: any, key: string) => {
    const value = event.target.value;
    const slug = convertViToEn(value);
    form.setFieldsValue({ urlSlug: slug });

    onChange(event, key);
    onChange('urlSlug', key);
  };

  return (
    <figure>
      <figcaption className="rounded-t-md font-semibold text-base bg-blue-200 px-6 py-3">
        Thông tin cơ bản
      </figcaption>
      <div className="rounded-b-md px-6 py-4 border border-solid border-gray-200 border-t-0">
        <div className="grid grid-cols-2 grid-flow-col gap-4">
          <div>
            <div className="mb-5">
              <label className="mb-3 text-sm font-normal">
                Tên bài đăng<sup className="text-red-600 ml-1">*</sup>
              </label>
              <Form.Item
                name="name"
                hasFeedback
                rules={[
                  {
                    required: true,
                    message: 'Field not empty',
                  },
                ]}
              >
                <Input
                  maxLength={MAX_LENGTH_TEXT}
                  placeholder="Post name"
                  onChange={(e) => onChangeName(e, 'name')}
                />
              </Form.Item>
            </div>
            <div className="mb-5">
              <label className="mb-3 text-sm font-normal">
                Post url slug<sup className="text-red-600 ml-1">*</sup>
              </label>
              <Form.Item
                name="urlSlug"
                hasFeedback
                rules={[
                  {
                    required: true,
                    message: 'Field not empty',
                  },
                ]}
                validateTrigger={['onChange', 'onBlur']}
              >
                <Input
                  maxLength={MAX_LENGTH_TEXT}
                  placeholder="Post url"
                  onChange={(e) => onChange(e, 'name')}
                />
              </Form.Item>
            </div>
            <div className="grid grid-cols-2 grid-flow-col gap-4">
              <div className="mb-5">
                <label className="mb-3 text-sm font-normal">
                  Danh mục<sup className="text-red-600 ml-1">*</sup>
                </label>
                <TreeCategory handleChange={onChange} />
              </div>
              <div className="mb-5">
                <label className="mb-3 text-sm font-normal">
                  Status<sup className="text-red-600 ml-1">*</sup>
                </label>
                <FormSelectStatusPost onChange={onChange} />
              </div>
            </div>
          </div>
          <div>
            <div className="h-[9.7rem]">
              <label className="mb-3 text-sm font-normal">
                Hình ảnh<sup className="text-red-600 ml-1">*</sup>
              </label>
              <ImageUploadV2 maxFiles={1} keyUpload={UPLOAD_KEY.IMAGE_BLOG} />
            </div>
            <div className="mb-5">
              <label className="mb-3 text-sm font-normal">Tags</label>
              <DropDownTags handleChange={onChange} />
            </div>
          </div>
        </div>
      </div>
    </figure>
  );
};
