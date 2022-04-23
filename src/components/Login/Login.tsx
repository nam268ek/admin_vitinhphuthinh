import React from "react";
import { Link, Navigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { RequestLogin } from "../redux/Slices/LoginSlice";
import { setIsLoading } from "../redux/Slices/PrimarySlice";
import { originalRegister } from "../Services/general.service";
import { cloneDeep } from "lodash";
import { Alert } from "antd";

const Login: React.FC = () => {
  const dispatch = useDispatch();
  const { isLogin } = useSelector((state: any) => state.login);

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Vui lòng nhập đúng địng dạng email")
      .required("Vui lòng nhập email"),
    password: Yup.string().required("Vui lòng nhập password"),
  });

  const formOptions = { resolver: yupResolver(validationSchema) };
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm(formOptions);

  const onSubmit = handleSubmit((data: any) => {
    const bodyLogin: any = cloneDeep(originalRegister);
    bodyLogin.email = data.email;
    bodyLogin.password = data.password;
    dispatch(setIsLoading(true));
    dispatch(RequestLogin(bodyLogin));
    dispatch(setIsLoading(false));
  });

  return (
    <>
      {!isLogin ? (
        <section id="login">
          <div className="container">
            <div className="row">
              <div className="col-xl-6 col-lg-6 col-md-8 offset-xl-3 offset-lg-3 offset-md-2">
                <div className="links d-flex justify-content-center">
                  <Link to="/login" className="text-dark">
                    Đăng nhập
                  </Link>
                  {/* <Link to="/register" className="text-muted">Register</Link> */}
                </div>
                <div className="login-area account-wrapper">
                  <h6>Đăng nhập tài khoản</h6>
                  <form onSubmit={onSubmit}>
                    <div className="inputs-wrapper w-100">
                      <input
                        type="text"
                        className={`w-100 ${
                          errors.email ? "error-border" : ""
                        }`}
                        placeholder="Email"
                        {...register("email")}
                      />
                      {errors.email && (
                        <Alert
                          message={errors.email.message}
                          type="info"
                          showIcon
                        />
                      )}
                    </div>
                    <div className="inputs-wrapper w-100">
                      <input
                        type="password"
                        className={`w-100 ${
                          errors.password ? "error-border" : ""
                        }`}
                        placeholder="Password"
                        {...register("password")}
                      />
                      {errors.password && (
                        <Alert
                          message={errors.password.message}
                          type="info"
                          showIcon
                        />
                      )}
                    </div>
                    <div className="checkbox-input-wrapper d-flex">
                      <input type="checkbox" name="remember" id="remember" />
                      <label htmlFor="remember">Nhớ mật khẩu</label>
                    </div>
                    <div className="submit-btn login">
                      <input
                        type="submit"
                        className="w-100"
                        value="Đăng nhập"
                      />
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>
      ) : (
        <Navigate to="/" replace />
      )}
    </>
  );
};

export default Login;
