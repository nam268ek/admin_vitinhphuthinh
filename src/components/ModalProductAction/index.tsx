/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import { Form, Modal, Select } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { SelectOptionV2 } from '../common/SelectOptionV2';
import { getListProductService, getUpdateManyProductService } from '../redux/Slices/ProductSlice';
import { RootState } from '../redux/store/store';
import { openMessage } from '../services/general.service';

export const ModalProductAction: React.FC<any> = ({ ids, handleCancel, isOpen, resetSelection }) => {
  const { products, loading } = useSelector((state: RootState) => state.product);
  const { brands } = useSelector((state: RootState) => state.brand);
  const [form] = Form.useForm();
  const dispatch = useDispatch();

  const handleOk = async () => {
    //
    const { isFeatured, status, nameBrand, category } = form.getFieldsValue();
    console.log('isFeatured', isFeatured, status, nameBrand, category);
    try {
      await dispatch(getUpdateManyProductService({ ids, isFeatured: isFeatured ? 'Y' : '' }));
      await dispatch(getListProductService()).unwrap();
      handleCancel();
      resetSelection();
    } catch (error) {
      openMessage(error);
    }
  };

  return (
    <Modal title="Cập nhật" width={800} open={isOpen} onOk={handleOk} confirmLoading={loading} onCancel={handleCancel}>
      <div>
        <Form form={form} layout="vertical" className="flex gap-4 mt-4">
          <Form.Item className="w-full" name="isFeatured" label="Sản phẩm nỗi bật">
            <Select
              options={[
                { value: 'Y', label: 'Yes' },
                { value: 'N', label: 'No' },
              ]}
            />
          </Form.Item>
          <Form.Item className="w-full" name="status" label="Trạng thái hiện thị">
            <Select
              options={[
                { value: true, label: 'Yes' },
                { value: false, label: 'No' },
              ]}
            />
          </Form.Item>
          <Form.Item className="w-full" name="nameBrand" label="Thương hiệu">
            <Select options={brands?.map((item) => ({ value: item.id, label: item.name }))} />
          </Form.Item>
          <Form.Item className="w-full" name="category" label="Danh mục">
            <SelectOptionV2 name="category" />
          </Form.Item>
        </Form>
      </div>
    </Modal>
  );
};
