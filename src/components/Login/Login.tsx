/* eslint-disable curly */
import { Button, Form, Input, message } from 'antd';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { DURATION_TIMEOUT_SECONDS } from '../../constants/const';
import { getLoginService } from '../redux/Slices/AuthSlice';
import { RootState } from '../redux/store/store';

const Login: React.FC = () => {
  const { isLogin, loading } = useSelector((state: RootState) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (isLogin) {
      navigate('/products', { replace: true });
    }
  }, [dispatch, isLogin]);

  const onFinish = async (data: any) => {
    const { email, password } = data;
    try {
      await dispatch(getLoginService({ email, password })).unwrap();
    } catch (error: any) {
      message.error({ content: 'Login failed', duration: DURATION_TIMEOUT_SECONDS });
    }
  };

  return (
    <>
      <section className="login-background"></section>
      <section id="login">
        <div className="container mx-auto">
          <div className="flex justify-center">
            <div className="flex flex-col w-30">
              <p className="text-header">Vi tính Phú Thịnh</p>
              <div className="login-area account-wrapper">
                <Form onFinish={onFinish}>
                  <Form.Item
                    name="email"
                    className="mb-4"
                    rules={[
                      {
                        required: true,
                        type: 'email',
                        message: 'Require email',
                      },
                    ]}
                    validateTrigger={['onChange', 'onBlur']}
                  >
                    <Input placeholder="Email" />
                  </Form.Item>
                  <Form.Item
                    name="password"
                    rules={[
                      {
                        required: true,
                        type: 'string',
                        message: 'Require password',
                      },
                    ]}
                    validateTrigger={['onChange', 'onBlur']}
                  >
                    <Input placeholder="Password" type="password" />
                  </Form.Item>
                  <Form.Item className="m-0">
                    <Button className="w-full" type="primary" htmlType="submit" loading={loading}>
                      Đăng nhập
                    </Button>
                  </Form.Item>
                </Form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Login;
