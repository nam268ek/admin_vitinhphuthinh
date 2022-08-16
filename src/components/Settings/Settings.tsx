import { Empty, Form, Modal } from "antd";
import { cloneDeep } from "lodash";
import React from "react";
import { AiOutlineCodeSandbox } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import ImageUploadSingle from "../ImageUpload/ImageUploadSingle";
import InfoFooter from "../InfoFooter/InfoFooter";
import LogoLayout from "../LogoLayout/LogoLayout";
import Policy from "../Policy/Policy";
import { getContentFooter, getContentFooterEditor, updateContentFooter } from "../redux/Slices/FooterSlice";
import { originalContentFooter } from "../Services/general.service";
import { Dropdown, Menu, Space } from "antd";
import { Link } from "react-router-dom";

const Settings: React.FC = () => {
  const [numberFunc, setNumberFunc] = React.useState<number>(1);
  const [loading, setLoading] = React.useState<boolean>(false);
  const [contentJsx, setContentJsx] = React.useState<JSX.Element>(
    <div className="d-flex justify-content-center w-100">
      <Empty />
    </div>
  );
  const { dataUpdate, dataUpdatePolicy } = useSelector((state: any) => state.footer);
  const [form] = Form.useForm();
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(getContentFooter({ role: "user" }));
    dispatch(getContentFooterEditor({ role: "user" }));
  }, []);

  React.useEffect(() => {
    showContentFunction();
  }, [numberFunc]);

  const handleOpenModel = (stt: number) => {
    setNumberFunc(stt);
  };

  const onFinish = async (data: any) => {
    console.log("data", data);
    const bodyContentFooter = cloneDeep(originalContentFooter);
    bodyContentFooter.action = "update";
    bodyContentFooter.data = {
      addrshop: data.addrshop || "",
      email: data.email || "",
      fblink: data.fblink || "",
      hotline: data.hotline || "",
      zalolink: data.zalolink || "",
    };
    setLoading(true);
    await dispatch(updateContentFooter(bodyContentFooter));
    setLoading(false);
  };

  const showContentFunction = (name?: string, title?: string) => {
    if (numberFunc === 1) {
      setContentJsx(<LogoLayout />);
    }
    if (numberFunc === 2) {
      setContentJsx(<InfoFooter loading={loading} form={form} onFinish={onFinish} dataUpdate={dataUpdate} />);
      // return <InfoFooter form={form} onFinish={onFinish} dataUpdate={dataUpdate} />;
    }
    if (numberFunc === 3 && name && name !== "" && title && title !== "") {
      setContentJsx(<Policy name={name} title={title} dataUpdatePolicy={dataUpdatePolicy} />);
      // return <Policy name={name} title={title} />;
    }
  };

  const handleOpenPolicy = (name: string, title: string) => {
    showContentFunction(name, title);
  };

  const menu = (
    <Menu
      items={[
        {
          label: (
            <Link to="" onClick={() => handleOpenPolicy("polship", "Chính sách vận chuyển")}>
              Chính sách vận chuyển
            </Link>
          ),
          key: "0",
        },
        {
          type: "divider",
        },
        {
          label: (
            <Link to="" onClick={() => handleOpenPolicy("polreturn", "Chính sách đổi trả")}>
              Chính sách đổi trả
            </Link>
          ),
          key: "1",
        },
        {
          type: "divider",
        },
        {
          label: (
            <Link to="" onClick={() => handleOpenPolicy("polwan", "Chính sách bảo hành")}>
              Chính sách bảo hành
            </Link>
          ),
          key: "2",
        },
        {
          type: "divider",
        },
        {
          label: (
            <Link to="" onClick={() => handleOpenPolicy("polquality", "Cam kết chất lượng")}>
              Cam kết chất lượng
            </Link>
          ),
          key: "3",
        },
        {
          type: "divider",
        },
        {
          label: (
            <Link to="" onClick={() => handleOpenPolicy("poluse", "Điều khoản sử dụng")}>
              Điều khoản sử dụng
            </Link>
          ),
          key: "4",
        },
        {
          type: "divider",
        },
        {
          label: (
            <Link to="" onClick={() => handleOpenPolicy("polbuy", "Chính sách mua hàng")}>
              Chính sách mua hàng
            </Link>
          ),
          key: "5",
        },
        {
          type: "divider",
        },
        {
          label: (
            <Link to="" onClick={() => handleOpenPolicy("polprot", "Chính sách bảo mật")}>
              Chính sách bảo mật
            </Link>
          ),
          key: "6",
        },
        {
          type: "divider",
        },
        {
          label: (
            <Link to="" onClick={() => handleOpenPolicy("polinsta", "Chính sách trả góp")}>
              Chính sách trả góp
            </Link>
          ),
          key: "7",
        },
        {
          type: "divider",
        },
      ]}
    />
  );

  return (
    <div className="ps-main__wrapper">
      <div className="header--dashboard">
        <div className="header__left">
          <h3>Setting</h3>
          <p>Danh sách thiết lập</p>
        </div>
      </div>
      <section className="ps-items-listing">
        <div className="row">
          <div className="col-xl-3 col-lg-6 col-md-12 col-sm-12 col-12">
            <div className="container-block br-0">
              <div
                className={
                  numberFunc === 1
                    ? "container-block__title bru5 justify-content-start align-items-baseline active"
                    : "container-block__title bru5 justify-content-start align-items-baseline"
                }
                onClick={() => handleOpenModel(1)}
              >
                <span className="pr-10">
                  <AiOutlineCodeSandbox />
                </span>
                <h2>Logo</h2>
              </div>
            </div>
            <div className="container-block br-0">
              <div
                className={
                  numberFunc === 2
                    ? "container-block__title bru5 justify-content-start align-items-baseline active"
                    : "container-block__title bru5 justify-content-start align-items-baseline"
                }
                onClick={() => handleOpenModel(2)}
              >
                <span className="pr-10">
                  <AiOutlineCodeSandbox />
                </span>
                <h2>Footer</h2>
              </div>
            </div>
            <div className="container-block br-0">
              <Dropdown overlay={menu} trigger={["click"]}>
                <div
                  className={
                    numberFunc === 3
                      ? "container-block__title bru5 justify-content-start align-items-baseline active"
                      : "container-block__title bru5 justify-content-start align-items-baseline"
                  }
                  onClick={() => handleOpenModel(3)}
                >
                  <span className="pr-10">
                    <AiOutlineCodeSandbox />
                  </span>
                  <h2>Chính sách</h2>
                </div>
              </Dropdown>
            </div>
          </div>
          <div className="col-xl-9 col-lg-6 col-md-12 col-sm-12 col-12">
            <div className="container-block br-0">
              <div className="container-block__title w-100">{contentJsx}</div>
            </div>
          </div>
        </div>
      </section>

      {/* <Form>{showContentFunction()}</Form> */}
    </div>
  );
};
export default Settings;
