import React from "react";
import { IoSearchOutline } from "react-icons/io5";
import { BiRefresh } from "react-icons/bi";
import { FaPlusCircle } from "react-icons/fa";
import { Table, Tag, Space, Button, message, Modal, Switch } from "antd";
import moment from "moment";
import { MdDeleteForever, MdModeEdit } from "react-icons/md";
import { Link, Navigate, useNavigate } from "react-router-dom";
import SelectOption from "../common/SelectOption";
import Search from "./../Search/Search";
import { useSelector, useDispatch } from "react-redux";
import {
  createProduct,
  getAllProducts,
  removeItemProduct,
  setDefaultDataFilter,
  updateListAllProducts,
  updateProduct,
} from "../redux/Slices/productSlice";
import { formatMoney, openDialogError, originalProduct, previousData, removePropertySpecificData } from "../Services/general.service";
import { cloneDeep } from "lodash";
import { setIsLoading, setAction, getListDropdown } from "../redux/Slices/PrimarySlice";
import { getListCategory } from "../redux/Slices/CategorySlice";
import { ExclamationCircleOutlined } from "@ant-design/icons";

const Products: React.FC = () => {
  const [isDefault, setIsDefault] = React.useState<boolean>(false);
  const [loading, setLoading] = React.useState<boolean>(false);
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
      render: (text: string, record: any) => (
        <span className="name-product" onClick={(e) => handleUpdateProduct(e, record)}>
          {text}
        </span>
      ),
    },
    // {
    //   title: "SKU",
    //   dataIndex: "sku",
    //   key: "sku",
    // },
    {
      title: "Giá",
      dataIndex: "price",
      key: "price",
      render: (price: any) => <span className="price-product">{formatMoney.format(Number(price))}</span>,
    },
    // {
    //   title: "Danh mục",
    //   dataIndex: "category",
    //   key: "category",
    //   render: (list: any) => <span className="category-product">{list[list.length - 1]}</span>,
    // },
    {
      title: "Trạng thái",
      key: "status",
      dataIndex: "status",
      render: (item: any) => <Switch checked={item.status} loading={loading} onChange={(e) => handleActiveProduct(e, item)} />,
    },
    {
      title: "Ngày cập nhật",
      dataIndex: "date",
      key: "date",
      render: (text: string) => <span>{moment(text).format("DD/MM/YYYY, h:mm:ss A")}</span>,
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

  const handleActiveProduct = async (checked: boolean, item: any) => {
    // const itemProd = listAllProducts.filter((o: any) => o._id === item.id);
    previousData["listProducts"] = cloneDeep(listAllProducts);
    const bodyProduct = cloneDeep(originalProduct);
    const itemUpdate = cloneDeep(item);
    bodyProduct.action = "update";
    bodyProduct.data._id = item._id;
    itemUpdate["status"] = checked;
    bodyProduct.data = removePropertySpecificData(itemUpdate);

    // if(itemUpdate.hasOwnProperty("updatedAt")) {
    //   delete bodyProduct.data.updatedAt;
    // }
    // if(itemUpdate.hasOwnProperty("created_at")) {
    //   delete bodyProduct.data.created_at;
    // }
    // // delete bodyProduct.data.created_at;
    // delete bodyProduct.data.__v;

    // dispatch(setIsLoading(true));
    setLoading(true);
    const res = await dispatch(createProduct(bodyProduct));
    openDialogError(res.payload);
    if (res.payload.code === 200) {
      await dispatch(getAllProducts({ role: "user" }));
    } else {
      dispatch(setDefaultDataFilter(previousData["listProducts"]));
    }
    setLoading(false);
    // dispatch(setIsLoading(false));
  };

  // React.useEffect(() => {
  //   if (statusResponse.length > 0 && statusResponse[0].status === "success") {
  //     Modal.success({
  //       title: "Thông báo",
  //       content: `${statusResponse[0].message}`,
  //       okText: "Ok",
  //     });
  //   }
  // }, [statusResponse]);

  const handleUpdateProduct = (e: any, record: any) => {
    e.preventDefault();
    const itemEdit = listAllProducts.filter((item: any) => item._id === record.id);
    if (itemEdit.length > 0) {
      dispatch(setAction("update"));
      dispatch(updateProduct(itemEdit));
      navigate("/products/create-product", { replace: true });
    }
  };

  const openDialogConfirm = async (dispatch: any, action: any, item: any, status?: any) => {
    Modal.confirm({
      title: "Thông báo",
      icon: <ExclamationCircleOutlined />,
      content: <>{status === "delete" ? "Xác nhận xóa sản phẩm ?" : "Xác nhận ?"}</>,
      onOk: async () => {
        const data = await dispatch(action(item));
        if (data.payload.code === 200) {
          Modal.success({
            title: "Thông báo",
            content: "Đã xóa sản phẩm !",
          });
          await dispatch(getAllProducts({ role: "user" }));
        }
      },
      onCancel() {},
    });
  };

  const handleRemoveProduct = async (e: any, record: any) => {
    const itemRemove = listAllProducts.filter((item: any) => item._id === record.id);
    const bodyRemoveProduct = {
      action: "delete",
      role: "admin",
      data: itemRemove[0],
    };
    // console.log(itemRemove);
    // bodyRemoveProduct.action = "delete";
    // bodyRemoveProduct.data._id = record.id;

    dispatch(setIsLoading(true));
    openDialogConfirm(dispatch, removeItemProduct, bodyRemoveProduct, "delete");
    // await dispatch(removeItemProduct(bodyRemoveProduct));
    // await dispatch(getAllProducts({ role: "user" }));
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
        date: item.updatedAt || "",
      };
    });
  };

  React.useEffect(() => {
    dispatch(getAllProducts({ role: "user" }));
    dispatch(getListCategory({ role: "user" }));
    dispatch(getListDropdown({ role: "user" }));
  }, [dispatch]);

  const data = convertListProducts(dataFilter ? dataFilter : []);

  const handleDefaultData = () => {
    dispatch(setDefaultDataFilter(listAllProducts));
    setIsDefault(!isDefault);
  };

  const handleAddProduct = (e: any) => {
    e.preventDefault();
    dispatch(setAction("create"));
    dispatch(updateProduct([]));
    navigate("/products/create-product", { replace: true });
  };

  const handleChangeData = () => {
    console.log("handleChangeData");
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
              <Search className="search-category" placeholder="Tìm kiếm sản phẩm..." listItem={listAllProducts} isDefault={isDefault} />
              <button style={{ backgroundColor: "#fff" }} onClick={(e) => e.preventDefault()}>
                <IoSearchOutline />
              </button>
            </form>
          </div>
        </div>
        <div className="ps-section__content">
          <div className="table-responsive">
            <Table columns={columns} dataSource={data} onChange={handleChangeData} />
          </div>
        </div>
      </section>
    </div>
  );
};
export default Products;
