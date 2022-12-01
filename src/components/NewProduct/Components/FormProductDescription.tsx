import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import EditorText from '../../common/EditorText';
import { setChange } from '../../redux/Slices/ProductSlice';
import { RootState } from '../../redux/store/store';

export const FormProductDescription: React.FC<any> = ({ childRef, defaultValue }) => {
  const { isChange } = useSelector((state: RootState) => state.product);
  const dispatch = useDispatch();

  const onValuesChangeForm = () => {
    if (!isChange) {
      dispatch(setChange(true));
    }
  };

  return (
    <figure>
      <figcaption className="rounded-t-md font-semibold text-base bg-blue-200 px-6 py-3">
        Mô tả sản phẩm
      </figcaption>
      <EditorText
        ref={childRef}
        statusChangeEditor={onValuesChangeForm}
        defaultValue={defaultValue}
      />
    </figure>
  );
};
