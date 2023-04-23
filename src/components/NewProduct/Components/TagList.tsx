import { Button, Divider, Form, Input, Space, Tag } from 'antd';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ITag } from '../../../types/types';
import { getCreateTagService } from '../../redux/Slices/TagSlice';
import { RootState } from '../../redux/store/store';
import { handleErrorFields } from '../../services/general.service';

interface ITagListProps {
  handleChange: (value: string[], name: string) => void;
}

const { CheckableTag } = Tag;

const TagList: React.FC<ITagListProps> = ({ handleChange }) => {
  const { tags } = useSelector((state: RootState) => state.tag);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [tagsData, setTagsData] = useState<ITag[]>(tags);
  const dispatch = useDispatch();
  const [form] = Form.useForm();

  useEffect(() => {
    setTagsData(tags);
  }, [tags]);

  const handleSelectTag = (tag: ITag, checked: boolean) => {
    const nextSelectedTags = checked ? [...selectedTags, tag.id] : selectedTags.filter((t) => t !== tag.id);
    console.log('You are interested in: ', nextSelectedTags);
    handleChange(nextSelectedTags, 'tags');
    setSelectedTags(nextSelectedTags);
  };

  const handleSearch = (e: any) => {
    const value = e.target.value;
    if (value === '') {
      setTagsData(tags);
      return;
    }
    const filteredTags = tags.filter((tag) => tag.name.toLowerCase().includes(value.toLowerCase()));
    setTagsData(filteredTags);
  };

  const handleAddTag = async () => {
    const value = form.getFieldValue('name') as string;
    try {
      await dispatch(getCreateTagService({ name: value.trim() })).unwrap();
      form.setFieldsValue({
        name: '',
      });
    } catch (error) {
      handleErrorFields(form, error);
    }
  };

  return (
    <div className="flex flex-col items-end space-y-2 w-full">
      <Form.Item noStyle name="tags">
        <Space size={[0, 8]} wrap>
          {tagsData?.map((tag, index) => (
            <CheckableTag
              key={index}
              checked={selectedTags.includes(tag.id)}
              onChange={(checked) => handleSelectTag(tag, checked)}
            >
              {tag.name}
            </CheckableTag>
          ))}
        </Space>
      </Form.Item>
      <Divider />
      <Form form={form}>
        <Space.Compact>
          <Form.Item name="name">
            <Input style={{ width: '100%' }} onChange={handleSearch} placeholder="Tìm kiếm hoặc thêm tag" />
          </Form.Item>
          <Button type="primary" onClick={handleAddTag}>
            Thêm tag
          </Button>
        </Space.Compact>
      </Form>
    </div>
  );
};

export default TagList;
