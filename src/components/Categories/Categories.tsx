import React from "react";
import { IoAddCircle, IoSearchOutline } from "react-icons/io5";
import { FiFilter } from "react-icons/fi";
import { FaPlusCircle } from "react-icons/fa";
import {
  Table,
  Tag,
  Space,
  Input,
  Button,
  Form,
  InputNumber,
  Modal,
} from "antd";
import moment from "moment";
import {
  MdAddCircleOutline,
  MdDeleteForever,
  MdModeEdit,
} from "react-icons/md";
import { Link } from "react-router-dom";
import SelectOption from "./../common/SelectOption";
import { Controller, useForm } from "react-hook-form";
import { cloneDeep } from "lodash";
import { originalCategory } from "../Services/general.service";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import { GrAddCircle } from "react-icons/gr";
import ModalBox from "../common/ModalBox";

const Categories: React.FC = () => {
  const [enableSubmenu, setEnabledSubmenu] = React.useState<boolean>(false);
  const [listSubmenu, setListSubmenu] = React.useState<number>(0);
  const [form] = Form.useForm<{ namecate: string }>();
  const nameValue = Form.useWatch("namecate", form);

  const {
    register,
    setValue,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<any>();

  const maxLength: number = 100;
  const maxLengthTextArea: number = 500;

  const columns = [
    {
      title: "Tên danh mục",
      dataIndex: "category",
      key: "category",
    },
    {
      title: "Link",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Ngày tạo",
      dataIndex: "date",
      key: "date",
      // render: (date: any) => (
      //   <span>{moment(date).format("DD/MM/YYYY").toString()}</span>
      // ),
      render: (text: String) => <span>{text}</span>,
    },
    {
      title: "Action",
      key: "action",
      render: (text: string, record: any) => (
        <Space size="middle">
          <Link to="" className="edit-item">
            <MdModeEdit size={20} />
          </Link>
          <Link to="" className="remove-item">
            <MdDeleteForever size={20} />
          </Link>
        </Space>
      ),
    },
  ];

  // const onSubmit = handleSubmit((data: any) => {
  //   const bodyCategories = cloneDeep(originalCategory);
  //   bodyCategories.action = "create";
  //   bodyCategories.data.title = data.namecate ? data.namecate : "";
  //   bodyCategories.data.icon = "BiCategoryAlt";
  //   console.log(data);
  // });

  const handleEnableSubmenu = (add: any) => {
    if (listSubmenu === 0) {
      add();
      setListSubmenu(1);
    }
    setEnabledSubmenu(!enableSubmenu);
  };

  const handleRemoveSubmenu = (remove: any, name: any, listField: any) => {
    if (listField.length > 1) {
      remove(name);
    }
  };

  //remove accents
  const removeAccents = (str: string) => {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  };

  const mapListSubmenu = (listField: any, catemain: any) => {
    const nameCategories = removeAccents(catemain);
    const nameCateRemoveAccent = nameCategories.trim().toLowerCase().split(" ").join("_");
    
    return listField.map((item: any, index: number) => {
      return {
        id: index + 1,
        title: item["submenu-child"] ? item["submenu-child"] : "",
        category: nameCateRemoveAccent,
      };
    });
  };

  const onFinish = (data: any) => {
    const bodyCategories = cloneDeep(originalCategory);
    bodyCategories.action = "create";
    bodyCategories.data.title = data.namecate ? data.namecate : "";
    bodyCategories.data.icon = "BiCategoryAlt";
    bodyCategories.data.submenu = enableSubmenu
      ? mapListSubmenu(data["list-submenu"], bodyCategories.data.title)
      : [];

    if (Number.isInteger(parseInt(data.index)) && parseInt(data.index) > 0) {
      bodyCategories.data.index = data.index;
    } else {
      Modal.info({
        title: "Thông báo",
        icon: <ExclamationCircleOutlined />,
        content: (
          <p>
            <span
              style={{ color: "red", fontWeight: "bold", marginRight: "10px" }}
            >
              Index:
            </span>
            Vui lòng chỉ nhập số, lớn hơn hoặc bằng 0.
          </p>
        ),
        okText: "Ok",
      });
    }
    console.log(bodyCategories);
  };

  return (
    <div className="ps-main__wrapper">
      <div className="header--dashboard">
        <div className="header__left">
          <h3>Danh mục</h3>
          <p>Danh sách danh mục</p>
        </div>
      </div>
      <section className="ps-items-listing">
        <div className="ps-form__content">
          <Form onFinish={onFinish}>
            {/* <form onSubmit={onSubmit}> */}
            <figure className="ps-block--form-box">
              <figcaption>Thêm Danh mục</figcaption>
              <div className="ps-block__content">
                <div className="row">
                  <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12">
                    <div className="form-group">
                      <label>
                        Tên danh mục<sup>*</sup>
                      </label>
                      <Form.Item
                        name="namecate"
                        rules={[
                          {
                            required: true,
                            message: "Vui lòng nhập tên danh mục",
                          },
                        ]}
                        validateTrigger={["onChange", "onBlur"]}
                      >
                        <Input
                          maxLength={maxLength}
                          showCount
                          placeholder="Nhập tên danh mục"
                        />
                      </Form.Item>
                    </div>
                    {enableSubmenu && (
                      <div className="form-group">
                        <label>
                          Submenu<sup>*</sup>
                        </label>
                        <Form.Item name="submenu">
                          <Input
                            maxLength={maxLength}
                            showCount
                            placeholder="Nhập tên submenu"
                          />
                        </Form.Item>
                      </div>
                    )}
                  </div>
                  <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12">
                    <div className="form-group">
                      <label>
                        Index<sup>*</sup>
                      </label>
                      <Form.Item
                        name="index"
                        rules={[
                          {
                            required: true,
                            message: "Vui lòng nhập vị trí",
                          },
                        ]}
                        validateTrigger={["onChange", "onBlur"]}
                      >
                        <Input
                          maxLength={2}
                          showCount
                          placeholder="Vị trí hiện thị"
                        />
                      </Form.Item>
                    </div>

                    <Form.List name="list-submenu">
                      {(fields, { add, remove }) => (
                        <>
                          <div className="form-group">
                            {enableSubmenu && (
                              <>
                                <label>
                                  Tên submenu con<sup>*</sup>
                                </label>
                                {fields.map(({ key, name, ...restField }) => (
                                  <div key={key} className="submenu-child">
                                    <div style={{ width: "100%" }}>
                                      <Form.Item
                                        {...restField}
                                        name={[name, "submenu-child"]}
                                        preserve={false}
                                      >
                                        <Input
                                          maxLength={maxLength}
                                          showCount
                                          style={{ width: "100%" }}
                                          placeholder="Nhập tên submenu con"
                                        />
                                      </Form.Item>
                                    </div>

                                    <Button
                                      type="primary"
                                      className="ps-btn-green"
                                      onClick={() => add()}
                                    >
                                      <MdAddCircleOutline size={20} />
                                    </Button>
                                    <Button
                                      type="primary"
                                      className="ps-btn-red"
                                      onClick={() =>
                                        handleRemoveSubmenu(
                                          remove,
                                          name,
                                          fields
                                        )
                                      }
                                    >
                                      <MdDeleteForever size={20} />
                                    </Button>
                                  </div>
                                ))}
                              </>
                            )}
                            <div className="form-group">
                              <Form.Item>
                                <Space
                                  style={{
                                    width: "100%",
                                    justifyContent: "flex-end",
                                  }}
                                >
                                  <Button
                                    type={enableSubmenu ? "primary" : "default"}
                                    danger={enableSubmenu ? true : false}
                                    className="ps-btn-secondary"
                                    onClick={() => handleEnableSubmenu(add)}
                                  >
                                    <span>Submenu</span>
                                  </Button>
                                  <Button
                                    type="primary"
                                    className="ps-btn-secondary"
                                    htmlType="submit"
                                  >
                                    <span>Submit</span>
                                  </Button>
                                </Space>
                              </Form.Item>
                            </div>
                          </div>
                        </>
                      )}
                    </Form.List>
                  </div>
                </div>
              </div>
            </figure>
          </Form>
        </div>
        <div className="ps-section__content">
          <div className="table-responsive">
            <Table columns={columns} dataSource={[]} />
          </div>
        </div>
      </section>
    </div>
  );
};
export default Categories;
