import React from "react";
import { IoSearchOutline } from "react-icons/io5";
import { FiFilter } from "react-icons/fi";
import { FaPlusCircle } from "react-icons/fa";
import { Table, Tag, Space, Input, Button } from "antd";
import moment from "moment";
import { MdDeleteForever, MdModeEdit } from "react-icons/md";
import { Link } from "react-router-dom";
import SelectOption from "./../common/SelectOption";
import { Controller, useForm } from "react-hook-form";
import { cloneDeep } from "lodash";
import { originalCategory } from "../Services/general.service";

const Categories: React.FC = () => {
  const {
    register,
    setValue,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<any>();

  const maxLength: number = 100;
  const maxLengthTextArea: number = 500;
  const onChange = (e: any) => {
    console.log("Change:", e.target.value);
  };
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

  const onSubmit = handleSubmit((data: any) => {
    const bodyCategories = cloneDeep(originalCategory);
    bodyCategories.action = "create";
    bodyCategories.data.title = data.namecate;
    bodyCategories.data.icon = 'BiCategoryAlt';
    console.log(data);
  });
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
          <form onSubmit={onSubmit}>
            <figure className="ps-block--form-box">
              <figcaption>Thêm Danh mục</figcaption>
              <div className="ps-block__content">
                <div className="form-group">
                  <label>
                    Tên danh mục<sup>*</sup>
                  </label>
                  <Controller
                    name="namecate"
                    defaultValue=""
                    control={control}
                    render={({ field }) => (
                      <Input
                        {...field}
                        maxLength={maxLength}
                        showCount
                        placeholder="Nhập tên danh mục"
                        onChange={(e) => {
                          setValue(field.name, e.target.value);
                        }}
                      />
                    )}
                  />
                </div>
                <div className="form-group">
                  <label>
                    Link<sup>*</sup>
                  </label>
                  <Controller
                    name="link"
                    defaultValue=""
                    control={control}
                    render={({ field }) => (
                      <Input
                        {...field}
                        maxLength={maxLength}
                        showCount
                        placeholder="laptop-dell"
                        onChange={(e) => {
                          setValue(field.name, e.target.value);
                        }}
                      />
                    )}
                  />
                </div>
                <div className="form-group form-group--select">
                  <label>
                    Danh mục con<sup>*</sup>
                  </label>
                  <div className="form-group__content">
                    <div className="form-group w-100">
                      <SelectOption
                        className="select-category"
                        placeholder="Lựa chọn danh mục"
                        isCategory={true}
                      />
                    </div>
                    <div className="form-group">
                      <Button
                        type="primary"
                        className="ps-btn-secondary"
                        htmlType="submit"
                      >
                        <span>Submit</span>
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </figure>
          </form>
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
