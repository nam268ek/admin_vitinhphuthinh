import React from 'react';
import { Alert } from 'antd';

const Notify: React.FC = () => {
  const timeOut = () => {
    setTimeout(() => {
      window.location.href = '/login';
    }, 3000);
  };
  return (
    <>
      <Alert message="Error: You must login !!!" type="error" showIcon />
      {timeOut()}
    </>
  );
};

export default Notify;
