/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Cascader, Form } from 'antd';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { ISelectOption } from '../../types/types';
import { RootState } from '../redux/store/store';

export const SelectOptionV2: React.FC<ISelectOption> = ({
  // options,
  name,
  error,
  className,
  placeholder,
  placement,
}) => {
  const [options, setOptions] = React.useState<any>([]);
  const { categories } = useSelector((state: RootState) => state.category);

  useEffect(() => {
    handleOptions();
  }, [categories]);

  const buildTree = (arr: any[], parentId: string): any => {
    const tree: any[] = [];
    arr?.forEach((node: any) => {
      if (node.parent === parentId) {
        const children = buildTree(arr, node.id);
        const newNode: any = { value: node.id, key: node.category, label: node.name };
        if (children.length) {
          newNode.children = children;
        }
        tree.push(newNode);
      }
    });
    return tree;
  };

  const handleOptions = () => {
    const roots = categories?.filter((node: any) => !node.parent);
    const treeData = roots?.map((root: any) => ({
      value: root.id,
      label: root.name,
      key: root.category,
      children: buildTree(categories, root.id),
    }));
    setOptions(treeData);
  };

  return (
    <>
      <Form.Item name={name} noStyle>
        <Cascader
          status={error?.status}
          options={options}
          className={className}
          placement={placement}
          placeholder={placeholder}
          changeOnSelect
        />
      </Form.Item>
      {error?.message && <span className="text-red-500">{error?.message}</span>}
    </>
  );
};
