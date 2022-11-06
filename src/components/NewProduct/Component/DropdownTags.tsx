import { Divider, Form, Select } from 'antd';
import { SelectProps } from 'antd/lib/select';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { tagRender } from '../../common/tagRender';
import { RootState } from '../../redux/store/store';
import { convertListDropdown } from '../../services/general.service';
import { FormAddTag } from './FormAddTag';

export const DropDownTags: React.FC<any> = ({ handleChange }) => {
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
        onChange={(e) => handleChange(e, 'tags')}
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
