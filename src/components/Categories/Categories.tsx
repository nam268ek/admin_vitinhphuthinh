import React from "react";
import { IoAddCircle, IoSearchOutline } from "react-icons/io5";
import { FiFilter } from "react-icons/fi";
import { FaPlusCircle } from "react-icons/fa";
import { Table, Tag, Space, Input, Button, Form, InputNumber, Modal, FormInstance } from "antd";
import moment from "moment";
import { MdAddCircleOutline, MdDeleteForever, MdModeEdit } from "react-icons/md";
import { Link } from "react-router-dom";
import SelectOption from "./../common/SelectOption";
import { Controller, useForm } from "react-hook-form";
import { cloneDeep, isNumber } from "lodash";
import { convertListCategory, originalCategory } from "../Services/general.service";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import { GrAddCircle } from "react-icons/gr";
import ModalBox from "../common/ModalBox";
import { useDispatch, useSelector } from "react-redux";
import { createNewCategory, getListCategory, removeItemCategory } from "../redux/Slices/CategorySlice";
import { setIsLoading } from "../redux/Slices/PrimarySlice";

const Categories: React.FC = () => {
  const [enableSubmenu, setEnabledSubmenu] = React.useState<boolean>(false);
  const [listSubmenu, setListSubmenu] = React.useState<number>(0);
  const [isSubmit, setIsSubmit] = React.useState<boolean>(false);
  const [itemEdit, setItemEdit] = React.useState<any>([]);
  const [actionSubmit, setActionSubmit] = React.useState<any>({action: "create", id: ''});
  const dispatch = useDispatch();
  const { statusResponse, listAllCategory } = useSelector((state: any) => state.category);
  const [form] = Form.useForm();
  const maxLength: number = 100;
  const maxLengthTextArea: number = 500;

  const columns = [
    {
      title: "Vị trí",
      dataIndex: "index",
      key: "index",
    },
    {
      title: "Tên danh mục",
      dataIndex: "category",
      key: "category",
    },
    {
      title: "Link",
      dataIndex: "link",
      key: "link",
    },
    {
      title: "Ngày tạo",
      dataIndex: "created_at",
      key: "created_at",
      render: (text: String) => <span>{text}</span>,
    },
    {
      title: "Action",
      key: "action",
      render: (text: string, record: any) => (
        <Space size="middle">
          <Link to="" className="edit-item">
            <MdModeEdit size={20} onClick={(e) => handleEditCategory(record)} />
          </Link>
          <Link to="" className="remove-item">
            <MdDeleteForever size={20} onClick={(e) => handleRemoveCategory(record)} />
          </Link>
        </Space>
      ),
    },
  ];

  const handleRemoveCategory = async (record: any) => {
    const bodyRemoveCategory = cloneDeep(originalCategory);
    bodyRemoveCategory.action = "delete";
    bodyRemoveCategory.data._id = record.id;

    dispatch(setIsLoading(true));
    await dispatch(removeItemCategory(bodyRemoveCategory));
    await dispatch(getListCategory({ role: "" }));
    dispatch(setIsLoading(false));
  };

  const handleEditCategory = async (record: any) => {
    const item = listAllCategory.find((item: any) => item._id === record.id);
    if (item.submenu.length > 0) {
      setEnabledSubmenu(true);
    } else setEnabledSubmenu(false);

    setItemEdit([item]);
    setActionSubmit({action: "update", id: record.id});
  };

  const handleCancelUpdate = () => {
    setItemEdit([]);
    setEnabledSubmenu(!enableSubmenu);
    form.resetFields();
   setActionSubmit({action: "create", id: ''});
  }

  React.useEffect(() => {
    let data: any = [{ "submenu-child": "" }];
    form.setFieldsValue({
      listsubmenu: enableSubmenu ? data : [],
    });
  
}, [enableSubmenu, form]);

  React.useEffect(() => {
    if (itemEdit.length > 0) {
      const data = itemEdit[0].submenu.map((item: any) => {
        return { "submenu-child": item.title };
      });
      form.setFieldsValue({
        namecate: itemEdit[0].title,
        submenu: itemEdit[0].submenuTitle,
        index: itemEdit[0].index,
        listsubmenu: data,
      });
    }
  }, [itemEdit, form]);

  const handleEnableSubmenu = (add: any) => {
    // if (listSubmenu === 0) {
    //   add();
    //   setListSubmenu(1);
    // }
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

  const checkActionSubmit = () => {
    if (actionSubmit.action === "create") return actionSubmit.action;
    if(actionSubmit.action === "update") return actionSubmit.action;
  }

  const onFinish = async (data: any) => {
    if (isSubmit) {
      const bodyCategories = cloneDeep(originalCategory);
      bodyCategories.action = actionSubmit.action;
      bodyCategories.data.index = data.index;
      bodyCategories.data.title = data.namecate ? data.namecate : "";
      bodyCategories.data.submenuTitle = data.submenu;
      bodyCategories.data.icon = "BiCategoryAlt";
      bodyCategories.data.submenu = enableSubmenu ? mapListSubmenu(data["listsubmenu"], bodyCategories.data.title) : [];
      bodyCategories.data.link = data.namecate.trim().toLowerCase().split(" ").join("-");
      if(actionSubmit.action === 'update') {
        bodyCategories.data._id = actionSubmit.id;
      } 

      dispatch(setIsLoading(true));
      await dispatch(createNewCategory(bodyCategories));
      await dispatch(getListCategory({ role: "" }));
      dispatch(setIsLoading(false));
      form.resetFields();
      setEnabledSubmenu(false);

      if(actionSubmit.action === 'update') {
        setItemEdit([]);
      } 
    }
  };

  React.useEffect(() => {
    if (statusResponse.length > 0 && statusResponse[0].status === "success") {
      Modal.success({
        title: "Thông báo",
        content: `${statusResponse[0].message}`,
        okText: "Ok",
      });
    }
  }, [statusResponse]);

  React.useEffect(() => {
    dispatch(getListCategory({ role: "" }));
  }, [dispatch]);

  const dataSort = cloneDeep(listAllCategory).sort((a: { index: number }, b: { index: number }) => {
    return a.index - b.index;
  });
  
  const data = convertListCategory(dataSort ? dataSort : []);
  return (
    <>
      <div className="ps-main__wrapper">
        <div className="header--dashboard">
          <div className="header__left">
            <h3>Danh mục</h3>
            <p>Danh sách danh mục</p>
          </div>
        </div>
        <section className="ps-items-listing">
          <div className="ps-form__content">
            <Form onFinish={onFinish} form={form}>
              <figure className={itemEdit.length > 0 ? "ps-block--form-box ps-box-edit" : "ps-block--form-box"}>
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
                          <Input maxLength={maxLength} showCount placeholder="Nhập tên danh mục" />
                        </Form.Item>
                      </div>
                      {enableSubmenu && (
                        <div className="form-group">
                          <label>
                            Submenu<sup>*</sup>
                          </label>
                          <Form.Item name="submenu">
                            <Input maxLength={maxLength} showCount placeholder="Nhập tên submenu" />
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
                            {
                              pattern: /^[0-9]*$/,
                              message: "Chỉ được nhập số",
                            },
                          ]}
                          validateTrigger={["onChange", "onBlur"]}
                        >
                          <Input maxLength={2} showCount placeholder="Vị trí hiện thị" />
                        </Form.Item>
                      </div>

                      <Form.List name="listsubmenu">
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
                                        <Form.Item {...restField} name={[name, "submenu-child"]} preserve={false}>
                                          <Input maxLength={maxLength} showCount style={{ width: "100%" }} placeholder="Nhập tên submenu con" />
                                        </Form.Item>
                                      </div>

                                      <Button type="primary" className="ps-btn-green" onClick={() => add()}>
                                        <MdAddCircleOutline size={20} />
                                      </Button>
                                      <Button type="primary" className="ps-btn-red" onClick={() => handleRemoveSubmenu(remove, name, fields)}>
                                        <MdDeleteForever size={20} />
                                      </Button>
                                    </div>
                                  ))}
                                </>
                              )}
                              <div className="form-group">
                                <Form.Item>
                                  {itemEdit.length > 0 ? (
                                    <Space
                                      style={{
                                        width: "100%",
                                        justifyContent: "flex-end",
                                      }}
                                    >
                                      <Button
                                        // type={enableSubmenu ? "primary" : "default"}
                                        danger={enableSubmenu ? true : false}
                                        className="ps-btn-secondary"
                                        onClick={() => handleEnableSubmenu(add)}
                                      >
                                        <span>Submenu</span>
                                      </Button>
                                      <Button type="primary" className="ps-btn-secondary" htmlType="submit" onClick={(e) => setIsSubmit(true)}>
                                        <span>Update</span>
                                      </Button>
                                      <Button type="primary" danger className="ps-btn-secondary" onClick={handleCancelUpdate}>
                                        <span>Cancel</span>
                                      </Button>
                                    </Space>
                                  ) : (
                                    <Space
                                      style={{
                                        width: "100%",
                                        justifyContent: "flex-end",
                                      }}
                                    >
                                      <Button
                                        danger={enableSubmenu ? true : false}
                                        className="ps-btn-secondary"
                                        onClick={() => handleEnableSubmenu(add)}
                                      >
                                        <span>Submenu</span>
                                      </Button>
                                      <Button type="primary" className="ps-btn-secondary" htmlType="submit" onClick={(e) => setIsSubmit(true)}>
                                        <span>Submit</span>
                                      </Button>
                                    </Space>
                                  )}
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
          <div className={itemEdit.length > 0 ? "focus-edit" : "ps-section__content"}>
            <div className="table-responsive">
              <Table columns={columns} dataSource={data} />
            </div>
          </div>
        </section>
      </div>
    </>
  );
};
export default Categories;
