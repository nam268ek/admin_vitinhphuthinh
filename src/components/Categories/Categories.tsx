import React from "react";
import { IoSearchOutline } from "react-icons/io5";
import { FiFilter } from "react-icons/fi";
import { FaPlusCircle } from "react-icons/fa";
import { Table, Tag, Space, Input } from "antd";
import moment from "moment";
import { MdDeleteForever, MdModeEdit } from "react-icons/md";
import { Link } from "react-router-dom";
import SelectOption from './../common/SelectOption';

const Categories: React.FC = () => {
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
          <h3>Danh mục</h3>
          <p>Danh sách danh mục</p>
        </div>
      </div>
      <section className="ps-items-listing">
        <div className="ps-form__content">
          <figure className="ps-block--form-box">
            <figcaption>Thêm Danh mục</figcaption>
            <div className="ps-block__content">
              <div className="form-group">
                <label>
                  Tên danh mục<sup>*</sup>
                </label>
                <Input showCount maxLength={maxLength} onChange={onChange} />
              </div>
              <div className="form-group">
                <label>
                  Link<sup>*</sup>
                </label>
                <Input showCount maxLength={maxLength} onChange={onChange} />
              </div>
              <div className="form-group form-group--select">
                <label>Danh mục con<sup>*</sup></label>
                <div className="form-group__content">
                <SelectOption />
                </div>
              </div>
            </div>
          </figure>
        </div>
        <div className="ps-section__header">
          <div className="ps-section__filter">
            <form className="ps-form--filter" action="index.html" method="get">
              <div className="ps-form__left">
                <div className="form-group">
                  <div className="ant-select ps-ant-dropdown ant-select-single ant-select-show-arrow">
                    <div className="ant-select-selector">
                      <span className="ant-select-selection-search">
                        <input
                          type="search"
                          //   autocomplete="off"
                          className="ant-select-selection-search-input"
                          //   style="opacity: 0"
                          role="combobox"
                          aria-haspopup="listbox"
                          aria-owns="rc_select_0_list"
                          aria-autocomplete="list"
                          aria-controls="rc_select_0_list"
                          aria-activedescendant="rc_select_0_list_0"
                          value=""
                          //   readonly=""
                          unselectable="on"
                          id="rc_select_0"
                        />
                      </span>
                      <span className="ant-select-selection-placeholder">
                        Select Category
                      </span>
                    </div>
                    <span
                      className="ant-select-arrow"
                      //   style="user-select: none; -webkit-user-select: none"
                      unselectable="on"
                      aria-hidden="true"
                    >
                      <span
                        role="img"
                        aria-label="down"
                        className="anticon anticon-down ant-select-suffix"
                      >
                        <svg
                          viewBox="64 64 896 896"
                          focusable="false"
                          data-icon="down"
                          width="1em"
                          height="1em"
                          fill="currentColor"
                          aria-hidden="true"
                        >
                          <path d="M884 256h-75c-5.1 0-9.9 2.5-12.9 6.6L512 654.2 227.9 262.6c-3-4.1-7.8-6.6-12.9-6.6h-75c-6.5 0-10.3 7.4-6.5 12.7l352.6 486.1c12.8 17.6 39 17.6 51.7 0l352.6-486.1c3.9-5.3.1-12.7-6.4-12.7z"></path>
                        </svg>
                      </span>
                    </span>
                  </div>
                </div>
                <div className="form-group">
                  <div className="ant-select ps-ant-dropdown ant-select-single ant-select-show-arrow">
                    <div className="ant-select-selector">
                      <span className="ant-select-selection-search">
                        <input
                          type="search"
                          //   autocomplete="off"
                          className="ant-select-selection-search-input"
                          //   style="opacity: 0"
                          role="combobox"
                          aria-haspopup="listbox"
                          aria-owns="rc_select_1_list"
                          aria-autocomplete="list"
                          aria-controls="rc_select_1_list"
                          aria-activedescendant="rc_select_1_list_0"
                          value=""
                          //   readonly=""
                          unselectable="on"
                          id="rc_select_1"
                        />
                      </span>
                      <span className="ant-select-selection-placeholder">
                        Select Category
                      </span>
                    </div>
                    <span
                      className="ant-select-arrow"
                      //   style="user-select: none; -webkit-user-select: none"
                      unselectable="on"
                      aria-hidden="true"
                    >
                      <span
                        role="img"
                        aria-label="down"
                        className="anticon anticon-down ant-select-suffix"
                      >
                        <svg
                          viewBox="64 64 896 896"
                          focusable="false"
                          data-icon="down"
                          width="1em"
                          height="1em"
                          fill="currentColor"
                          aria-hidden="true"
                        >
                          <path d="M884 256h-75c-5.1 0-9.9 2.5-12.9 6.6L512 654.2 227.9 262.6c-3-4.1-7.8-6.6-12.9-6.6h-75c-6.5 0-10.3 7.4-6.5 12.7l352.6 486.1c12.8 17.6 39 17.6 51.7 0l352.6-486.1c3.9-5.3.1-12.7-6.4-12.7z"></path>
                        </svg>
                      </span>
                    </span>
                  </div>
                </div>
                <div className="form-group">
                  <div className="ant-select ps-ant-dropdown ant-select-single ant-select-show-arrow">
                    <div className="ant-select-selector">
                      <span className="ant-select-selection-search">
                        <input
                          type="search"
                          //   autocomplete="off"
                          className="ant-select-selection-search-input"
                          //   style="opacity: 0"
                          role="combobox"
                          aria-haspopup="listbox"
                          aria-owns="rc_select_2_list"
                          aria-autocomplete="list"
                          aria-controls="rc_select_2_list"
                          aria-activedescendant="rc_select_2_list_0"
                          value=""
                          //   readonly=""
                          unselectable="on"
                          id="rc_select_2"
                        />
                      </span>
                      <span className="ant-select-selection-placeholder">
                        Status
                      </span>
                    </div>
                    <span
                      className="ant-select-arrow"
                      //   style="user-select: none; -webkit-user-select: none"
                      unselectable="on"
                      aria-hidden="true"
                    >
                      <span
                        role="img"
                        aria-label="down"
                        className="anticon anticon-down ant-select-suffix"
                      >
                        <svg
                          viewBox="64 64 896 896"
                          focusable="false"
                          data-icon="down"
                          width="1em"
                          height="1em"
                          fill="currentColor"
                          aria-hidden="true"
                        >
                          <path d="M884 256h-75c-5.1 0-9.9 2.5-12.9 6.6L512 654.2 227.9 262.6c-3-4.1-7.8-6.6-12.9-6.6h-75c-6.5 0-10.3 7.4-6.5 12.7l352.6 486.1c12.8 17.6 39 17.6 51.7 0l352.6-486.1c3.9-5.3.1-12.7-6.4-12.7z"></path>
                        </svg>
                      </span>
                    </span>
                  </div>
                </div>
              </div>
              <div className="ps-form__right">
                <button className="ps-btn ps-btn--gray">
                  <FiFilter />
                  <span>Filter</span>
                </button>
              </div>
            </form>
          </div>
          <div className="ps-section__search">
            <form
              className="ps-form--search-simple"
              action="index.html"
              method="get"
            >
              <input
                type="text"
                className="form-control"
                placeholder="Search product"
              />
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
export default Categories;
