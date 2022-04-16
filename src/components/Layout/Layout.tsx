import React from "react";
import { IoSearchOutline } from "react-icons/io5";
import { FiFilter } from "react-icons/fi";
import { FaPlusCircle } from "react-icons/fa";
import { Table, Tag, Space, Input, Button } from "antd";
import moment from "moment";
import { MdDeleteForever, MdModeEdit } from "react-icons/md";
import { Link } from "react-router-dom";
import SelectOption from "./../common/SelectOption";
import ImageUpload from "../ImageUpload/ImageUpload";

const Layout: React.FC = () => {

  const onChange = (e: any) => {
    console.log("Change:", e.target.value);
  };
  const enterLoading = (index: any) => {};
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
      render: (date: any) => (
        <span>{moment(date).format("DD/MM/YYYY").toString()}</span>
      ),
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

  const data = [
    {
      key: "1",
      name: "Laptop Dell Inspiron 15 7000 Gaming Laptop",
      sku: "AB123456789-1",
      price: "10.000.000 ₫",
      category: "Laptop DELL",
      date: new Date(),
      tags: ["Kích hoạt", "Tồn kho"],
    },
    {
      key: "2",
      name: "Jim Green",
      sku: 42,
      price: "$1,121.00",
      category: "Electronics",
      address: "London No. 1 Lake Park",
      date: new Date(),

      tags: ["loser"],
    },
    {
      key: "3",
      name: "Joe Black",
      sku: 32,
      price: "$1,121.00",
      category: "Electronics",
      address: "Sidney No. 1 Lake Park",
      date: new Date(),

      tags: ["cool", "teacher"],
    },
    {
      key: "4",
      name: "John Brown",
      sku: 32,
      price: "$1,121.00",
      category: "Electronics",
      address: "New York No. 1 Lake Park",
      date: new Date(),
      tags: ["active", "Tồn kho"],
    },
    {
      key: "5",
      name: "Jim Green",
      sku: 42,
      price: "$1,121.00",
      category: "Electronics",
      address: "London No. 1 Lake Park",
      date: new Date(),

      tags: ["loser"],
    },
    {
      key: "6",
      name: "Joe Black",
      sku: 32,
      price: "$1,121.00",
      category: "Electronics",
      address: "Sidney No. 1 Lake Park",
      date: new Date(),

      tags: ["cool", "teacher"],
    },
    {
      key: "7",
      name: "John Brown",
      sku: 32,
      price: "$1,121.00",
      category: "Electronics",
      address: "New York No. 1 Lake Park",
      date: new Date(),
      tags: ["active", "Tồn kho"],
    },
    {
      key: "8",
      name: "Jim Green",
      sku: 42,
      price: "$1,121.00",
      category: "Electronics",
      address: "London No. 1 Lake Park",
      date: new Date(),

      tags: ["loser"],
    },
    {
      key: "9",
      name: "Joe Black",
      sku: 32,
      price: "$1,121.00",
      category: "Electronics",
      address: "Sidney No. 1 Lake Park",
      date: new Date(),

      tags: ["cool", "teacher"],
    },
    {
      key: "10",
      name: "John Brown",
      sku: 32,
      price: "$1,121.00",
      category: "Electronics",
      address: "New York No. 1 Lake Park",
      date: new Date(),
      tags: ["active", "Tồn kho"],
    },
    {
      key: "11",
      name: "Jim Green",
      sku: 42,
      price: "$1,121.00",
      category: "Electronics",
      address: "London No. 1 Lake Park",
      date: new Date(),

      tags: ["loser"],
    },
    {
      key: "12",
      name: "Joe Black",
      sku: 32,
      price: "$1,121.00",
      category: "Electronics",
      address: "Sidney No. 1 Lake Park",
      date: new Date(),

      tags: ["cool", "teacher"],
    },
    {
      key: "13",
      name: "John Brown",
      sku: 32,
      price: "$1,121.00",
      category: "Electronics",
      address: "New York No. 1 Lake Park",
      date: new Date(),
      tags: ["active", "Tồn kho"],
    },
    {
      key: "14",
      name: "Jim Green",
      sku: 42,
      price: "$1,121.00",
      category: "Electronics",
      address: "London No. 1 Lake Park",
      date: new Date(),

      tags: ["loser"],
    },
  ];
  return (
    <div className="ps-main__wrapper">
      <div className="header--dashboard">
        <div className="header__left">
          <h3>Layout</h3>
          <p>Danh sách layout</p>
        </div>
      </div>
      <section className="ps-items-listing">
        <div className="ps-form__content">
          <figure className="ps-block--form-box c-b-1">
            <figcaption>Layout 1</figcaption>
            <div className="ps-block__layout">
              <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12">
                <div className="form-group--left">
                  <div className="background-content c-h-1">
                    <label>Background 1</label>
                    <div className="form-group--nest">
                      <ImageUpload
                        styleClassName="upload-image-home"
                        maxNumberOfFiles={13}
                        multiple={false}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12">
                <div className="form-group--right">
                  <div className="background-content">
                    <label>Background 2</label>
                    <div className="form-group--nest">
                      <ImageUpload />
                    </div>
                  </div>
                  <div className="background-content">
                    <label>Background 3</label>
                    <div className="form-group--nest">
                      <ImageUpload />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </figure>
        </div>
        <div className="ps-form__content">
          <figure className="ps-block--form-box c-b-1">
            <figcaption>Layout 2</figcaption>
            <div className="ps-block__layout">
              <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12">
                <div className="form-group--left">
                  <div className="background-content">
                    <label>Background 1</label>
                    <div className="form-group--nest">
                      <ImageUpload
                        styleClassName="upload-image-home"
                        maxNumberOfFiles={13}
                        multiple={false}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12">
                <div className="form-group--right">
                  <div className="background-content">
                    <label>Background 2</label>
                    <div className="form-group--nest">
                      <ImageUpload />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </figure>
        </div>
        <div className="ps-form__content">
          <div className="ps-form__bottom">
            <Space style={{ width: "100%", justifyContent: "flex-end" }}>
              <Button
                type="primary"
                loading={false}
                onClick={() => enterLoading(0)}
                className="ant-btn-primary"
              >
                Back
              </Button>
              <Button
                type="primary"
                loading={false}
                onClick={() => enterLoading(0)}
                className="ant-btn-primary"
              >
                Submit
              </Button>
            </Space>
          </div>
        </div>
      </section>
    </div>
  );
};
export default Layout;
