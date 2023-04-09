/* eslint-disable curly */
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import EditorText from '../../common/EditorText';
import { RootState } from '../../redux/store/store';

export const FormPostDetails: React.FC<any> = ({ childRef, postId, onChange }) => {
  const { posts } = useSelector((state: RootState) => state.post);
  const [defaultValue, setDefaultValue] = useState<string>('');

  useEffect(() => {
    handleLoadPostUpdate(postId);
  }, [postId]);

  const handleLoadPostUpdate = (id: string | undefined) => {
    if (!id) return;

    const post = posts?.filter((p) => p.id === id);
    if (post.length > 0) {
      const { content } = post[0];
      setDefaultValue(content);
    }
  };
  return (
    <figure id="post-detail">
      <figcaption className="rounded-t-md font-semibold text-base bg-blue-200 px-6 py-3">Post Details</figcaption>
      <div className="rounded-b-md border border-solid border-gray-200 border-t-0">
        <EditorText name="content" ref={childRef} defaultValue={defaultValue} onChange={onChange} />
      </div>
    </figure>
  );
};
