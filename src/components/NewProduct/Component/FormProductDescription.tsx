import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import EditorText from '../../common/EditorText';
import { setChange } from '../../redux/Slices/ProductSlice';
import { RootState } from '../../redux/store/store';

export const FormProductDescription: React.FC = () => {
  const { isChange } = useSelector((state: RootState) => state.product);
  const childRef = React.useRef<any>(null);

  const dispatch = useDispatch();

  const onValuesChangeForm = () => {
    if (!isChange) {
      dispatch(setChange(true));
    }
  };

  return (
    <figure className="ps-block--form-box">
      <figcaption>Mô tả sản phẩm</figcaption>
      <EditorText
        ref={childRef}
        statusChangeEditor={onValuesChangeForm}
        // defaultValue={dataUpdate[0] ? dataUpdate[0].contentEditor : '<p></p>'}
      />
    </figure>
  );
};
