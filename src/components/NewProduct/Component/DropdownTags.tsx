import { Divider, Form, Select, Tag } from 'antd';
import { SelectProps } from 'antd/lib/select';
import type { CustomTagProps } from 'rc-select/lib/BaseSelect';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store/store';
import { convertListDropdown } from '../../services/general.service';
import { FormAddTag } from './FormAddTag';

const tagRender = (props: CustomTagProps) => {
  const { label, value, closable, onClose } = props;
  const onPreventMouseDown = (event: React.MouseEvent<HTMLSpanElement>) => {
    event.preventDefault();
  };
  return (
    <Tag
      onMouseDown={onPreventMouseDown}
      closable={closable}
      onClose={onClose}
      style={{ marginRight: 3, display: 'flex', alignItems: 'center' }}
    >
      {label}
    </Tag>
  );
};

export const DropDownTags: React.FC = () => {
  const { tags } = useSelector((state: RootState) => state.tag);
  const [listTags, setListTags] = useState<SelectProps['options']>([]);

  useEffect(() => {
    const list = convertListDropdown(tags);
    setListTags([...list]);
  }, [tags]);

  return (
    <Form.Item name="tags">
      <Select
        mode="multiple"
        allowClear
        showArrow
        style={{ width: '100%' }}
        placeholder="Tags name"
        options={listTags}
        optionFilterProp="label"
        tagRender={tagRender}
        dropdownRender={(menu) => (
          <>
            {menu}
            <Divider style={{ margin: '8px 0' }} />
            <FormAddTag />
          </>
        )}
      />
    </Form.Item>
  );
};
