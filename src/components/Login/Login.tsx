/* eslint-disable curly */
import { Button, Form, Input, message } from 'antd';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { DURATION_TIMEOUT_SECONDS } from '../../constants/const';
import { getLoginService } from '../redux/Slices/AuthSlice';
import { RootState } from '../redux/store/store';

const Login: React.FC = () => {
  const { isLogin } = useSelector((state: RootState) => state.auth);

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
      message.error({ content: error.message, duration: DURATION_TIMEOUT_SECONDS });
    }
  };

  return (
    <section id="login">
      <div className="container">
        <div className="row justify-content-center">
          <div className="d-flex flex-column w-30">
            <div className="links d-flex justify-content-center">
              <p className="h3 fw-bold">Đăng nhập</p>
            </div>
            <div className="login-area account-wrapper">
              <Form onFinish={onFinish}>
                <Form.Item
                  name="email"
                  className="mb-4"
                  rules={[
                    {
                      required: true,
                      type: 'email',
                      message: 'Please enter your email address',
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
                      message: 'Please enter your password',
                    },
                  ]}
                  validateTrigger={['onChange', 'onBlur']}
                >
                  <Input placeholder="Password" type="password" />
                </Form.Item>
                <Form.Item className="m-0">
                  <Button style={{ width: '100%' }} type="primary" htmlType="submit">
                    Login
                  </Button>
                </Form.Item>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
