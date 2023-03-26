/* eslint-disable curly */
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import EditorText from '../../common/EditorText';
import { RootState } from '../../redux/store/store';

interface FormProductDescProps {
  childRef: any;
  productId: string | undefined;
  onChange: (data: any, key: string) => void;
}

export const FormProductDescription: React.FC<FormProductDescProps> = ({
  childRef,
  productId,
  onChange,
}) => {
  const { products } = useSelector((state: RootState) => state.product);
  const [defaultValue, setDefaultValue] = useState<string>('');

  useEffect(() => {
    handleLoadDescUpdate(productId);
  }, [productId]);

  const handleLoadDescUpdate = (id: string | undefined) => {
    if (!id) return;

    const product = products?.filter((p) => p.id === id);
    if (product.length > 0 && Object.hasOwn(product[0], 'productInformation')) {
      const { content } = product[0].productInformation;
      content && content.length > 0 && setDefaultValue(content);
    }
  };
  return (
    <figure>
      <figcaption className="rounded-t-md font-semibold text-base bg-blue-200 px-6 py-3">
        Mô tả sản phẩm
      </figcaption>
      <div
        id="c-product-info"
        className="rounded-b-md border border-solid border-gray-200 border-t-0"
      >
        <EditorText name="content" ref={childRef} defaultValue={defaultValue} onChange={onChange} />
      </div>
    </figure>
  );
};
