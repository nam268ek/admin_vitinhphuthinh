/* eslint-disable import/no-unresolved */
import { Button, Form, Input, Switch } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import { Plus } from 'lucide-react';
import { FormInstance } from 'rc-field-form/lib/interface';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ListImages } from 'src/components/NewProduct/Components/ListImages';
import TagList from 'src/components/NewProduct/Components/TagList';
import { SelectOptionV2 } from 'src/components/common/SelectOptionV2';
import { getListImageService } from 'src/components/redux/Slices/ImageSlice';
import { RootState } from 'src/components/redux/store/store';
import { MAX_LENGTH_TEXT, UPLOAD_KEY } from '../../../constants/const';
import { ImageUploadV2 } from '../../ImageUpload/ImageUploadV2';
import { convertViToEn, openMessage } from '../../services/general.service';

export const FormBlogBasic: React.FC<{ onChange: any; onChangeUpdate: any; form: FormInstance<any> }> = ({
  form,
  onChange,
  onChangeUpdate,
}) => {
  const { loading } = useSelector((state: RootState) => state.image);
  const { dataError } = useSelector((state: RootState) => state.post);
  const { errors } = dataError;

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const dispatch = useDispatch();

  const openSelectImages = async () => {
    try {
      await dispatch(getListImageService()).unwrap();
      setIsModalOpen(!isModalOpen);
    } catch (error) {
      openMessage(error);
    }
  };

  const onChangeName = (event: any, key: string) => {
    const value = event.target.value;
    const slug = convertViToEn(value);
    form.setFieldsValue({ urlSlug: slug });

    if (key === 'namePost') {
      onChange(event, key);
    }
    onChange(slug, 'urlSlug');
  };

  return (
    <figure>
      <figcaption className="rounded-t-md font-semibold text-base bg-blue-200 px-6 py-3 flex items-center justify-between">
        <span>Thông tin cơ bản</span>
        <Button
          type="primary"
          size="small"
          className="font-medium flex items-center"
          icon={<Plus className="mr-1" size={18} />}
          onClick={openSelectImages}
          loading={loading}
        >
          Thư viện
        </Button>
        <ListImages maxSelect={1} open={isModalOpen} setOpen={setIsModalOpen} onChange={onChange} />
      </figcaption>
      <div className="rounded-b-md px-6 py-4 border border-solid border-gray-200 border-t-0">
        <div className="grid grid-cols-2 grid-flow-col gap-4">
          <div>
            <div className="mb-5">
              <label className="mb-3 text-sm font-medium">
                Tên bài đăng<sup className="text-red-600 ml-1">*</sup>
              </label>
              <Form.Item name="namePost">
                <Input maxLength={MAX_LENGTH_TEXT} placeholder="Post name" onChange={(e) => onChangeName(e, 'namePost')} />
              </Form.Item>
            </div>
            <div className="mb-5">
              <label className="mb-3 text-sm font-medium">
                Post url slug<sup className="text-red-600 ml-1">*</sup>
              </label>
              <Form.Item name="urlSlug">
                <Input maxLength={MAX_LENGTH_TEXT} placeholder="Post url" onChange={(e) => onChange(e, 'urlSlug')} />
              </Form.Item>
            </div>
            <div className="mb-5">
              <label className="mb-3 text-sm font-medium">
                Tóm tắt<sup className="text-red-600 ml-1">*</sup>
              </label>
              <Form.Item name="summary">
                <TextArea
                  rows={4}
                  maxLength={MAX_LENGTH_TEXT}
                  placeholder="Tóm tắt bài viết"
                  onChange={(e) => onChange(e, 'summary')}
                />
              </Form.Item>
            </div>
            <div className="flex gap-5">
              <div className="w-full mb-5">
                <label className="mb-3 text-sm font-medium">
                  Danh mục<sup className="text-red-600 ml-1">*</sup>
                </label>
                <SelectOptionV2
                  name="category"
                  error={{ status: errors?.category ? 'error' : undefined, message: errors?.category || undefined }}
                  className="w-full"
                  placeholder="Select category"
                />
              </div>
              <div className="mb-5 flex gap-8">
                <div className="flex flex-col items-center">
                  <label className="mb-3 text-sm font-medium">
                    Status<sup className="text-red-600 ml-1">*</sup>
                  </label>
                  <Form.Item noStyle name="status" valuePropName="checked">
                    <Switch checkedChildren="ON" unCheckedChildren="OFF" onChange={(e) => onChange(e ? 'Y' : 'N', 'status')} />
                  </Form.Item>
                </div>
              </div>
            </div>
          </div>
          <div>
            <div className="h-[9.7rem]">
              <label className="mb-3 text-sm font-medium">
                Hình ảnh<sup className="text-red-600 ml-1">*</sup>
              </label>
              <div className="">
                <ImageUploadV2 name="images" maxFiles={1} keyUpload={UPLOAD_KEY.IMAGE_BLOG} onChange={onChange} />
                {errors?.['images'] && <span className="text-red-500">{errors['images']}</span>}
              </div>
            </div>
            <div className="mb-5">
              <label className="inline-block mb-3 text-sm font-medium">Tags</label>
              <TagList onChangeUpdate={onChangeUpdate} />
            </div>
          </div>
        </div>
      </div>
    </figure>
  );
};
