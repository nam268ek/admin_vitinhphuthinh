import React from "react";
import { IoSearchOutline } from "react-icons/io5";
import { BiRefresh } from "react-icons/bi";
import { FaPlusCircle } from "react-icons/fa";
import { Table, Tag, Space, Button, message, Modal, Switch, Checkbox } from "antd";
import moment from "moment";
import { MdAddShoppingCart, MdDeleteForever, MdModeEdit } from "react-icons/md";
import { Link, Navigate, useNavigate } from "react-router-dom";
import SelectOption from "../../common/SelectOption";
import Search from "./../../Search/Search";
import { useSelector, useDispatch } from "react-redux";
import { createProduct, getAllProducts, removeItemProduct, setDefaultDataFilter, updateProduct } from "../../redux/Slices/productSlice";
import { formatMoney, originalProduct } from "../../Services/general.service";
import { cloneDeep } from "lodash";
import { setIsLoading, setAction, getListDropdown } from "../../redux/Slices/PrimarySlice";
import { getListCategory } from "../../redux/Slices/CategorySlice";
import { BsCartCheckFill, BsFillCartPlusFill, BsFillCartXFill } from "react-icons/bs";
import { removeItemListOrder, updateListOrder } from "../../redux/Slices/orderSlice";
import type { ColumnsType } from "antd/lib/table";

const ModuleProducts: React.FC = () => {
  const [isDefault, setIsDefault] = React.useState<boolean>(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { dataFilter, listAllProducts, statusResponse } = useSelector((state: any) => state.product);
  const { listOrder } = useSelector((state: any) => state.order);

  const columns: ColumnsType<any> = [
    {
      title: "Lựa chọn",
      key: "action",
      width: 90,
      render: (text: string, record: any) => <Space className="action-product" size="middle">{processAction(record)}</Space>,
    },
    {
      title: "Tên sản phẩm",
      dataIndex: "name",
      key: "name",
      width: 300,
      render: (text: string) => <span className="name-product">{text}</span>,
    },
    {
      title: "Giá",
      dataIndex: "price",
      key: "price",
      width: 120,
      render: (price: any) => <span className="price-product">{formatMoney.format(Number(price))}</span>,
    },
  ];

  const processAction = (item: any) => {
    const isInOrder = listOrder.filter((itemOrder: any) => itemOrder.id === item.id).length > 0 ? true : false;
    if (!isInOrder) {
      return (
        <Link to="" className="add-item" onClick={(e) => handleUpdateProduct(e, item)}>
          <BsFillCartPlusFill size={20} />
        </Link>
      );
    } else
      return (
        <Link to="" className="remove-item" onClick={(e) => handleRemoveProduct(e, item)}>
          <BsFillCartXFill size={20} />
        </Link>
      );
  };

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
    dispatch(updateListOrder(record));
  };

  const handleRemoveProduct = async (e: any, record: any) => {
    e.preventDefault();
    dispatch(removeItemListOrder(record));
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

  const data = convertListProducts(dataFilter ? dataFilter : []);

  const handleDefaultData = () => {
    dispatch(setDefaultDataFilter(listAllProducts));
    setIsDefault(!isDefault);
  };

  const handleAddProduct = () => {
    dispatch(setAction("create"));
    dispatch(updateProduct([]));
  };

  return (
    <>
      <div className="header-search">
        <Search className="search-category" placeholder="Tìm kiếm sản phẩm..." listItem={listAllProducts} isDefault={isDefault} />
        <Button type="primary" onClick={handleDefaultData}>
          Clear
        </Button>
      </div>
      <Table columns={columns} dataSource={data} scroll={{ x: "auto", y: "34rem" }} />
    </>
  );
};
export default ModuleProducts;

//
