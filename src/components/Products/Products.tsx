import React from "react";
import { IoSearchOutline } from "react-icons/io5";
import { FiFilter } from "react-icons/fi";
import { FaPlusCircle } from "react-icons/fa";
import { Table, Tag, Space, Button, message } from "antd";
import moment from "moment";
import { MdDeleteForever, MdModeEdit } from "react-icons/md";
import { Link } from "react-router-dom";
import SelectOption from "../common/SelectOption";
import Search from "./../Search/Search";
import { useSelector, useDispatch } from "react-redux";
import { getAllProducts } from "../redux/Slices/productSlice";
import { originalProduct } from "../Services/general.service";
import { cloneDeep } from "lodash";
import { setIsLoading } from "../redux/Slices/PrimarySlice";

const Products: React.FC = () => {
  const dispatch = useDispatch();
  const { listAllProducts } = useSelector((state: any) => state.product);

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
          {tags.map((tag, index) => {
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
              <Tag color={color} key={index}>
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
      // render: (date: any) => (
      //   <span>{moment(date).format("DD/MM/YYYY").toString()}</span>
      // ),
      render: (text: string) => <span>{text}</span>,
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

  const convertListProducts = (list: any[]) => {
    return list.map((item: any, index: number) => {
      return {
        key: index + 1,
        id: item._id,
        name: item.title || "",
        sku: item.sku || "",
        price: item.price || 0,
        category: item.category || "",
        tags: [item.tags ? item.tags : "Kích hoạt"],
        date: item.created_at || "",
      };
    });
  };

  React.useEffect(() => {
    const handleGetProducts = async () => {
      if (listAllProducts.length === 0) {
        let product = cloneDeep(originalProduct);
        product.role = "";
        dispatch(setIsLoading(true));
        await dispatch(getAllProducts(product));
        dispatch(setIsLoading(false));
      }
    };
    handleGetProducts();
  }, [dispatch]);

  // React.useEffect(() => {
  //   if (
  //     statusResponse &&
  //     statusResponse.status === "success" &&
  //     statusResponse.code === 200
  //   ) {
  //     message.success(statusResponse.message);
  //   } else {
  //     message.error(statusResponse.message);
  //   }
  // }, []);

  const data = convertListProducts(listAllProducts ? listAllProducts : []);

  // if (listAllProducts.length === 0) {
  //   let product = cloneDeep(originalProduct);
  //   product.role = "";
  //   dispatch(getAllProducts(product));
  // } else {
  //   let data = convertListProducts(listAllProducts);
  //   setListProducts(data);
  // }
  console.log("a");

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
                  <SelectOption
                    className="select-category"
                    placeholder="Lựa chọn danh mục"
                  />
                </div>
                <div className="form-group">
                  <SelectOption
                    className="select-category"
                    placeholder="Lựa chọn thương hiệu"
                  />
                </div>
                <div className="form-group">
                  <SelectOption
                    className="select-category"
                    placeholder="Trạng thái"
                  />
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
              <Search
                className="search-category"
                placeholder="Tìm kiếm sản phẩm..."
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
export default Products;
