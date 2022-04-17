import React from "react";
import { IoSearchOutline } from "react-icons/io5";
import { FiFilter } from "react-icons/fi";
import { FaPlusCircle } from "react-icons/fa";
import { Table, Tag, Space, Button } from "antd";
import moment from "moment";
import { MdDeleteForever, MdModeEdit } from "react-icons/md";
import { Link } from "react-router-dom";
import SelectOption from "../common/SelectOption";
import Search from "./../Search/Search";

const Products: React.FC = () => {
  const columns = [
    {
      title: "ID",
      dataIndex: "key",
      key: "key",
      render: (text: string) => <span>{text}</span>,
    },
    {
      title: "Tên sản phẩm",
      dataIndex: "name",
      key: "name",
      render: (text: string) => <span className="name-product">{text}</span>,
    },
    {
      title: "SKU",
      dataIndex: "sku",
      key: "sku",
    },
    {
      title: "Giá",
      dataIndex: "price",
      key: "price",
      render: (text: string) => <span className="price-product">{text}</span>,
    },
    {
      title: "Danh mục",
      dataIndex: "category",
      key: "category",
    },
    {
      title: "Trạng thái",
      key: "tags",
      dataIndex: "tags",
      render: (tags: any[]) => (
        <>
          {tags.map((tag) => {
            let color =
              tag === "Kích hoạt"
                ? "green"
                : tag === "Tồn kho"
                ? "cyan"
                : "red";
            if (tag === "loser") {
              color = "volcano";
            }
            return (
              <Tag color={color} key={tag}>
                {tag}
              </Tag>
            );
          })}
        </>
      ),
    },
    {
      title: "Ngày cập nhật",
      dataIndex: "date",
      key: "date",
      render: (date: any) => (
        <span>{moment(date).format("DD/MM/YYYY").toString()}</span>
      ),
    },
    {
      title: "Lựa chọn",
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
          <h3>Sản phẩm</h3>
          <p>Danh sách sản phẩm</p>
        </div>
      </div>
      <section className="ps-items-listing">
        <div className="ps-section__actions">
          <Link className="ps-btn success" to="/products/create-product">
            <FaPlusCircle />
            <span>Thêm sản phẩm</span>
          </Link>
        </div>
        <div className="ps-section__header">
          <div className="ps-section__filter">
            <form className="ps-form--filter" action="index.html" method="get">
              <div className="ps-form__left">
                <div className="form-group">
                  <SelectOption className="select-category" placeholder="Lựa chọn danh mục"/>
                </div>
                <div className="form-group">
                  <SelectOption className="select-category" placeholder='Lựa chọn thương hiệu'/>
                </div>
                <div className="form-group">
                  <SelectOption className="select-category" placeholder='Trạng thái'/>
                </div>
              </div>
              <div className="ps-form__right">
                <Button type="primary" className="ps-btn-secondary">
                  <FiFilter />
                  <span>Filter</span>
                </Button>
              </div>
            </form>
          </div>
          <div className="ps-section__search">
            <form
              className="ps-form--search-simple"
              action="index.html"
              method="get"
            >
              <Search className="search-category" placeholder="Tìm kiếm sản phẩm..." />
              <button>
                <IoSearchOutline />
              </button>
            </form>
          </div>
        </div>
        <div className="ps-section__content">
          <div className="table-responsive">
            <Table columns={columns} dataSource={data} />
          </div>
        </div>
      </section>
    </div>
  );
};
export default Products;
