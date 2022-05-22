import React from "react";
import { IoSearchOutline } from "react-icons/io5";
import { FiFilter } from "react-icons/fi";
import { FaPlusCircle } from "react-icons/fa";
import { Table, Tag, Space, Modal, Button } from "antd";
import moment from "moment";
import { MdDeleteForever, MdModeEdit } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { formatMoney, originalProduct } from "../Services/general.service";
import SelectOption from "../common/SelectOption";
import { useDispatch, useSelector } from "react-redux";
import { cloneDeep } from "lodash";
import { getListDropdown, setAction, setIsLoading } from "../redux/Slices/PrimarySlice";
import { createProduct, getAllProducts, removeItemProduct, setDefaultDataFilter, updateProduct } from "../redux/Slices/productSlice";
import { getListCategory } from "../redux/Slices/CategorySlice";
import { BiRefresh } from "react-icons/bi";
import Search from './../Search/Search';

const Orders: React.FC = () => {
  const [isDefault, setIsDefault] = React.useState<boolean>(false);
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
      render: (price: any) => <span className="price-product">{formatMoney.format(Number(price))}</span>,
    },
    {
      title: "Trạng thái thanh toán",
      key: "tags",
      dataIndex: "tags",
      render: (tags: any[]) => (
        <>
          {tags.map((tag) => {
            let color =
              tag === "Đã thanh toán" ? "green" : tag === "Chưa thanh toán" ? "cyan" : "red";
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
      title: "Ngày đặt hàng",
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
      tags: ["Đã thanh toán", "Chưa thanh toán"],
    },
    {
      key: "2",
      name: "Jim Green",
      sku: 42,
      price: "$1,121.00",
      category: "Electronics",
      address: "London No. 1 Lake Park",
      date: new Date(),

      tags: ["Đã hủy"],
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

  const handleActiveProduct = async (checked: boolean, item: any) => {
    const bodyProduct = cloneDeep(originalProduct);
    const itemUpdate = cloneDeep(item);
    bodyProduct.action = "update";
    bodyProduct.data._id = item._id;
    itemUpdate["status"] = checked;
    bodyProduct.data = itemUpdate;

    console.log(bodyProduct);

    dispatch(setIsLoading(true));
    await dispatch(createProduct(bodyProduct));
    await dispatch(getAllProducts({ role: "" }));
    dispatch(setIsLoading(false));
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

  const handleUpdateProduct = (e: any, record: any) => {
    e.preventDefault();
    const itemEdit = listAllProducts.filter((item: any) => item._id === record.id);
    if (itemEdit.length > 0) {
      dispatch(setAction("update"));
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
        status: item || false,
        date: item.created_at || "",
      };
    });
  };

  React.useEffect(() => {
    dispatch(getAllProducts({ role: "" }));
    dispatch(getListCategory({ role: "" }));
    dispatch(getListDropdown({ role: "" }));
  }, [dispatch]);

  // const data = convertListProducts(dataFilter ? dataFilter : []);

  const handleDefaultData = () => {
    dispatch(setDefaultDataFilter(listAllProducts));
    setIsDefault(!isDefault);
  };

  const handleAddProduct = () => {
    dispatch(setAction("create"));
    dispatch(updateProduct([]));
  };

  return (
    <div className="ps-main__wrapper">
      <div className="header--dashboard">
        <div className="header__left">
          <h3>Đơn hàng</h3>
          <p>Danh Sách đơn hàng</p>
        </div>
      </div>
      <section className="ps-items-listing">
        <div className="ps-section__actions">
          <Link className="ps-btn success" to="/products/create-product">
            <FaPlusCircle />
            <span>Tạo đơn hàng</span>
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
              <Search className="search-category" placeholder="Tìm kiếm sản phẩm..." listItem={listAllProducts} isDefault={isDefault} />
              <button style={{ backgroundColor: "#fff" }} onClick={(e) => e.preventDefault()}>
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
export default Orders;
