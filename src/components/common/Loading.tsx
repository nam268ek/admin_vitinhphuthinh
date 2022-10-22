import React from 'react';
import { Spin, Space } from 'antd';

const Loading: React.FC = () => {
  return (
    <>
      <div className="ps-loading">
        <Space size="middle">
          <Spin size="large" />
        </Space>
      </div>
    </>
  );
};

export default Loading;
