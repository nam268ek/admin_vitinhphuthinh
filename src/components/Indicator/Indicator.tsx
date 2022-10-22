import { Space, Spin } from 'antd';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { RootState } from '../redux/store/store';

export const Indicator: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isLogin } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    if (isLogin) {
      navigate('/products', { replace: true });
    }
  }, [dispatch, isLogin]);

  useEffect(() => {
    const delay = setTimeout(() => {
      navigate('/login', { replace: true });
    }, 3000);
    return clearTimeout(delay);
  }, []);

  return (
    <div className="ps-loading">
      <Space size="middle">
        <Spin size="large" />
      </Space>
    </div>
  );
};
