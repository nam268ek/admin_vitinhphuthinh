import React from "react";
import { IoSearchOutline } from "react-icons/io5";
import { BiRefresh } from "react-icons/bi";
import { FaPlusCircle } from "react-icons/fa";
import { Table, Tag, Space, Button, message, Modal } from "antd";
import moment from "moment";
import { MdDeleteForever, MdModeEdit } from "react-icons/md";
import { Link, Navigate, useNavigate } from "react-router-dom";
import SelectOption from "../common/SelectOption";
import Search from "./../Search/Search";
import { useSelector, useDispatch } from "react-redux";
import { getAllProducts, removeItemProduct, setDefaultDataFilter, updateProduct } from "../redux/Slices/productSlice";
import { originalProduct } from "../Services/general.service";
import { cloneDeep } from "lodash";
import { setIsLoading } from "../redux/Slices/PrimarySlice";

const Products: React.FC = () => {
  const [isDefault, setIsDefault] = React.useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { dataFilter, listAllProducts, statusResponse } = useSelector((state: any) => state.product);

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
      render: (list: any) => <span className="category-product">{list[list.length - 1]}</span>,
    },
    {
      title: "Trạng thái",
      key: "tags",
      dataIndex: "tags",
      render: (tags: any[]) => (
        <>
          {tags.map((tag, index) => {
            let color = tag === "Kích hoạt" ? "green" : tag === "Tồn kho" ? "cyan" : "red";
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
      render: (text: string) => <span>{text}</span>,
    },
    {
      title: "Lựa chọn",
      key: "action",
      render: (text: string, record: any) => (
        <Space size="middle">
          <Link to="" className="edit-item" onClick={(e) => handleUpdateProduct(e, record)}>
            <MdModeEdit size={20} />
          </Link>
          <Link to="" className="remove-item" onClick={(e) => handleRemoveProduct(e, record)}>
            <MdDeleteForever size={20} />
          </Link>
        </Space>
      ),
    },
  ];

  React.useEffect(() => {
    if (statusResponse.length > 0 && statusResponse[0].status === "success") {
      Modal.success({
        title: "Thông báo",
        content: `${statusResponse[0].message}`,
        okText: "Ok",
      });
    }
  }, [statusResponse]);

  const handleUpdateProduct = (e: any, record: any) => {
    e.preventDefault();
    const itemEdit = listAllProducts.filter((item: any) => item._id === record.id);
    if (itemEdit.length > 0) {
      dispatch(updateProduct(itemEdit));
      navigate("/products/create-product", { replace: true });
    }
  };

  const handleRemoveProduct = async (e: any, record: any) => {
    const bodyRemoveProduct = cloneDeep(originalProduct);
    bodyRemoveProduct.action = "delete";
    bodyRemoveProduct.data._id = record.id;

    dispatch(setIsLoading(true));
    await dispatch(removeItemProduct(bodyRemoveProduct));
    await dispatch(getAllProducts({ role: "" }));
    dispatch(setIsLoading(false));
  };

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
    dispatch(getAllProducts({ role: "" }));
  }, [dispatch]);

  const data = convertListProducts(dataFilter ? dataFilter : []);

  const handleDefaultData = () => {
    dispatch(setDefaultDataFilter(listAllProducts));
    setIsDefault(!isDefault);
  };

  const handleAddProduct = () => {
    dispatch(updateProduct([]));
  };

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
          <Link className="ps-btn success" to="/products/create-product" onClick={handleAddProduct}>
            <FaPlusCircle />
            <span>Thêm sản phẩm</span>
          </Link>
        </div>
        <div className="ps-section__header">
          <div className="ps-section__filter">
            <form className="ps-form--filter">
              <div className="ps-form__left">
                <div className="form-group">
                  <SelectOption className="select-category" placeholder="Danh mục" isCategory={true} isDefault={isDefault} />
                </div>
                <div className="form-group">
                  <SelectOption className="select-category" placeholder="Thương hiệu" isBrand={true} isDefault={isDefault} />
                </div>
                <div className="form-group">
                  <SelectOption className="select-category" placeholder="Trạng thái" isStatus={true} isDefault={isDefault} />
                </div>
              </div>
              <div className="ps-form__right">
                <Button type="primary" className="ps-btn-secondary" onClick={handleDefaultData}>
                  <BiRefresh size={20} />
                  <span>Refresh</span>
                </Button>
              </div>
            </form>
          </div>
          <div className="ps-section__search">
            <form className="ps-form--search-simple">
              <Search className="search-category" placeholder="Tìm kiếm sản phẩm..." />
              <button style={{ backgroundColor: "#fff" }}>
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
