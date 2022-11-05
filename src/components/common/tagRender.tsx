import { Tag } from 'antd';
import type { CustomTagProps } from 'rc-select/lib/BaseSelect';

export const tagRender = (props: CustomTagProps) => {
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
