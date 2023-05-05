/* eslint-disable curly */
import { Button, Divider, Form, Input, Space, Tag } from 'antd';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ITag } from '../../../types/types';
import { getCreateTagService } from '../../redux/Slices/TagSlice';
import { RootState } from '../../redux/store/store';
import { handleErrorFields } from '../../services/general.service';
import { useParams } from 'react-router-dom';
import { Empty } from 'antd';

interface ITagListProps {
  onChangeUpdate: (value: string, name: string, st: 'add' | 'remove') => void;
}

const { CheckableTag } = Tag;

const TagList: React.FC<ITagListProps> = ({ onChangeUpdate }) => {
  const { tags } = useSelector((state: RootState) => state.tag);
  const { products, errors } = useSelector((state: RootState) => state.product);
  const { posts } = useSelector((state: RootState) => state.post);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [tagsData, setTagsData] = useState<ITag[]>(tags);
  const dispatch = useDispatch();
  const [form] = Form.useForm();

  const { productId } = Object.fromEntries(new URLSearchParams(window.location.search));
  const { postId } = useParams();

  useEffect(() => {
    setTagsData(tags);
  }, [tags]);

  useEffect(() => {
    if (productId) {
      handleLoadTagProductUpdate(productId);
    }
    if (postId) {
      handleLoadTagPostUpdate(postId);
    }
  }, [productId, postId]);

  const handleLoadTagPostUpdate = (id: string | undefined) => {
    if (!id) return;

    const post = posts?.find((p) => p.id === id);
    if (post) {
      setSelectedTags(post?.tags.map((t: ITag) => t.id));
    }
  };

  const handleLoadTagProductUpdate = (id: string | undefined) => {
    if (!id) return;

    const product = products?.find((p) => p.id === id);
    if (product) {
      setSelectedTags(product?.tags.map((t: ITag) => t.id));
    }
  };

  const handleSelectTag = (tag: ITag, checked: boolean) => {
    const nextSelectedTags = checked ? [...selectedTags, tag.id] : selectedTags.filter((t) => t !== tag.id);
    console.log('You are interested in: ', nextSelectedTags);
    onChangeUpdate(tag.id, 'tags', checked ? 'add' : 'remove');
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
      await dispatch(getCreateTagService({ name: value?.trim() })).unwrap();
      form.setFieldsValue({
        name: '',
      });
    } catch (error) {
      handleErrorFields(form, error);
    }
  };

  return (
    <div className="flex flex-col items-end space-y-2 w-full">
      {tagsData.length > 0 ? (
        <div className="w-full max-h-28 min-h-[7rem] border border-solid border-zinc-200 rounded-md overflow-auto">
          <div className="flex flex-wrap gap-y-2 p-2">
            {tagsData?.map((tag, index) => (
              <CheckableTag
                className="font-medium"
                key={index}
                checked={selectedTags.includes(tag.id)}
                onChange={(checked) => handleSelectTag(tag, checked)}
              >
                {tag.name}
              </CheckableTag>
            ))}
          </div>
        </div>
      ) : (
        <div className="flex w-full items-center justify-center min-h-[7rem] border border-solid border-zinc-200 rounded-md">
          <Empty className="m-0" image={Empty.PRESENTED_IMAGE_SIMPLE} />
        </div>
      )}
      <Form form={form} className="w-full flex justify-between">
        {errors['tags'] && <span className="text-red-500 ml-2 w-1/2">{errors['tags']}</span>}
        <Space.Compact className="w-full mt-2">
          <Form.Item noStyle name="name">
            <Input style={{ width: '100%' }} onChange={handleSearch} placeholder="Tìm kiếm hoặc thêm tag" />
          </Form.Item>
          <Button type="primary" className="font-medium" onClick={handleAddTag}>
            Thêm tag
          </Button>
        </Space.Compact>
      </Form>
    </div>
  );
};

export default TagList;
