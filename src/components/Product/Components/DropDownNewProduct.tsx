import { Button, Form } from 'antd';
import { ChevronsRight } from 'lucide-react';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { setImageAction } from '../../redux/Slices/ImageSlice';
import { setDefaultProductAction } from '../../redux/Slices/ProductSlice';
import { RootState } from '../../redux/store/store';
import { SelectOptionV2 } from './../../common/SelectOptionV2';

export const DropDownNewProduct: React.FC = () => {
  const { categories } = useSelector((state: RootState) => state.category);
  const [options, setOptions] = React.useState<any>([]);

  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [form] = Form.useForm();

  useEffect(() => {
    handleOptions();
  }, [categories]);

  const buildTree = (arr: any[], parentId: string): any => {
    const tree: any[] = [];
    arr?.forEach((node: any) => {
      if (node.parent === parentId) {
        const children = buildTree(arr, node.id);
        const newNode: any = { key: node.id, label: node.name };
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
    const treeData = roots?.map((root: any) => {
      const children = buildTree(categories, root.id);
      const newNode: any = { key: root.id, label: root.name };
      if (children.length) {
        newNode.children = children;
      }
      return newNode;
    });
    console.log('treeData', treeData);
    setOptions(treeData);
  };

  const handleCreate = () => {
    dispatch(setImageAction([]));
    dispatch(setDefaultProductAction());
    const data = form.getFieldValue('category');
    if (data && data.length > 0) {
      const params = new URLSearchParams({ categoryId: data[data.length - 1] }).toString();
      navigate(`${location.pathname}/new?${params}`);
    }
  };

  return (
    <>
      <Form form={form} className="flex w-full">
        <SelectOptionV2
          name="category"
          options={options}
          className="w-full mx-3"
          placeholder="Select category"
          rules={[{ required: true, message: 'Please select category!' }]}
          validateTrigger={['onsubmit']}
          placement="bottomRight"
        />
        <Button htmlType="submit" onClick={handleCreate} className="btn-green flex items-center jus border-0">
          <span className="pb-[2px] mr-2">Thêm sản phẩm</span> <ChevronsRight size={20} />
        </Button>
      </Form>
    </>
  );
};
