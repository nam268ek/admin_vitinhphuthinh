import React from 'react';
import EditorText from '../../common/EditorText';

export const FormPostDetails: React.FC<any> = ({ childRef, defaultValue }) => {
  return (
    <figure>
      <figcaption className="rounded-t-md font-semibold text-base bg-blue-200 px-6 py-3">
        Post Details
      </figcaption>
      <EditorText ref={childRef} defaultValue={defaultValue} />
    </figure>
  );
};
