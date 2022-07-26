import React from "react";
import { IoSearchOutline } from "react-icons/io5";
import { FiFilter } from "react-icons/fi";
import { FaPlusCircle } from "react-icons/fa";
import { Table, Tag, Space, Modal, Button } from "antd";
import moment from "moment";
import { MdCancel, MdDeleteForever, MdDownloadDone, MdFileDownloadDone, MdModeEdit, MdPrint } from "react-icons/md";
import { FcAbout } from "react-icons/fc";
import { Link, useNavigate } from "react-router-dom";
import { formatMoney, originalOrder, originalProduct } from "../Services/general.service";
import SelectOption from "../common/SelectOption";
import { useDispatch, useSelector } from "react-redux";
import { cloneDeep } from "lodash";
import { getListDropdown, setAction, setIsLoading } from "../redux/Slices/PrimarySlice";
import { createProduct, getAllProducts, removeItemProduct, setDefaultDataFilter, updateProduct } from "../redux/Slices/productSlice";
import { getListCategory } from "../redux/Slices/CategorySlice";
import { BiRefresh } from "react-icons/bi";
import Search from "./../Search/Search";
import { getListOrder, updateListOrder, updateOrder, updateItemOrder, updateViewItemOrder } from "../redux/Slices/orderSlice";
import ModalBox from "../common/ModalBox";
import { ExclamationCircleOutlined } from "@ant-design/icons";

const Orders: React.FC = () => {
  const childRef = React.useRef<any>(null);
  const [isDefault, setIsDefault] = React.useState<boolean>(false);
  const [openModel, setOpenModel] = React.useState<boolean>(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const { dataFilter, listAllOrders, statusResponse } = useSelector((state: any) => state.order);
  const { listAllOrders } = useSelector((state: any) => state.order);

  const columns = [
    {
      title: "Order ID",
      dataIndex: "orderid",
      key: "orderid",
      render: (text: string) => <span>{text}</span>,
    },
    {
      title: "Khách hàng",
      dataIndex: "namecustomer",
      key: "namecustomer",
      render: (text: string) => <span>{text}</span>,
    },
    {
      title: "Sản phẩm",
      dataIndex: "nameprod",
      key: "nameprod",
      render: (text: string) => <span className="name-product">{text}</span>,
    },

    {
      title: "Giá",
      dataIndex: "price",
      key: "price",
      render: (price: any) => <span className="price-product">{formatMoney.format(Number(price))}</span>,
    },

    {
      title: "Ngày đặt hàng",
      dataIndex: "date",
      key: "date",
      render: (date: any) => <span>{moment(date).format("L, h:mm:ss A")}</span>,
    },
    {
      title: "Payment",
      dataIndex: "payment",
      key: "payment",
    },
    {
      title: "Trạng thái",
      key: "stord",
      dataIndex: "stord",
      render: (status: any) => (
        <>
          {status === "Đang xử lý" ? (
            <Tag color="cyan" key={Math.random()}>
              {status}
            </Tag>
          ) : status === "Đã hủy" ? (
            <Tag color="red" key={Math.random()}>
              {status}
            </Tag>
          ) : (
            <Tag color="green" key={Math.random()}>
              {status}
            </Tag>
          )}
        </>
      ),
    },
    {
      title: "Lựa chọn",
      key: "action",
      render: (text: string, record: any) => (
        <>
          {record?.stord === "Đang xử lý" ? (
            <Space size="middle">
              <Link to="" className="edit-item" onClick={(e) => handleUpdateOrder(e, record)}>
                <MdModeEdit size={20} />
              </Link>
              <Link to="" className="done-item" onClick={(e) => handleDoneOrder(e, record)}>
                <MdFileDownloadDone size={20} />
              </Link>

              <Link to="" className="remove-item" onClick={(e) => handleCancelOrder(e, record)}>
                <MdCancel size={20} />
              </Link>
            </Space>
          ) : (
            <Space size="middle">
              <Link to="" className="view-item" onClick={(e) => handleViewOrder(e, record)}>
                <FcAbout size={20} />
              </Link>
              <Link to="" className="print-item" onClick={(e) => handlePrintOrder(e, record)}>
                <MdPrint size={20} />
              </Link>
            </Space>
          )}
        </>
      ),
    },
  ];

  const convertListOrders = (list: any[]) => {
    return list.map((item: any, index: number) => {
      return {
        key: index + 1,
        id: item._id,
        orderid: item.orderid,
        namecustomer: item.customer.name || "",
        nameprod: item.listprod[0].title || "",
        price: item.priord.total || 0,
        date: item.createdAt || "",
        payment: item.priord.payment || "",
        stord: item.stord || "",
      };
    });
  };
  const data = convertListOrders(listAllOrders ? listAllOrders : []);

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
    await dispatch(getAllProducts({ role: "user" }));
    dispatch(setIsLoading(false));
  };

  React.useEffect(() => {
    dispatch(getListOrder({ role: "user" }));
  }, []);

  const handleUpdateOrder = (e: any, record: any) => {
    e.preventDefault();
    const itemEdit = listAllOrders.filter((item: any) => item._id === record.id);
    if (itemEdit.length > 0) {
      dispatch(setAction("update"));
      dispatch(updateOrder(itemEdit));

      dispatch(updateListOrder({ data: itemEdit[0].listprod, update: true }));
      navigate("/orders/create-order", { replace: true });
    }
  };

  const handleViewOrder = (e: any, record: any) => {
    e.preventDefault();
    const itemEdit = listAllOrders.filter((item: any) => item._id === record.id);
    dispatch(updateViewItemOrder(itemEdit[0]));
    childRef.current.showModal();
  };

  const handlePrintOrder = (e: any, record: any) => {};

  const openDialogConfirm = async (dispatch: any, action: any, item: any, status?: any) => {
    Modal.confirm({
      title: "Thông báo",
      icon: <ExclamationCircleOutlined />,
      content: <>{status === "done" ? "Xác nhận hoàn thành đơn hàng?" : "Xác nhận hủy đơn hàng?"}</>,
      onOk: async () => {
        const data = await dispatch(action(item));
        if (data.payload.code === 200) {
          Modal.success({
            title: "Thông báo",
            content: "Đơn hàng đã được hoàn thành",
          });
          dispatch(getListOrder({ role: "user" }));
        }
      },

      onCancel() {},
    });
  };

  const handleDoneOrder = (e: any, record: any) => {
    e.preventDefault();
    const itemEdit = listAllOrders.filter((item: any) => item._id === record.id);
    if (itemEdit.length > 0) {
      const bodyItem = cloneDeep(originalOrder);
      bodyItem.action = "update";
      bodyItem._id = itemEdit[0]._id;
      bodyItem.data = cloneDeep(itemEdit[0]);
      bodyItem.data.stord = "Đã hoàn thành";
      delete bodyItem.data._id;
      delete bodyItem.data["__v"];
      delete bodyItem.data.createdAt;
      delete bodyItem.data.updatedAt;
      openDialogConfirm(dispatch, updateItemOrder, bodyItem, "done");
    }
  };

  const handleCancelOrder = async (e: any, record: any) => {
    e.preventDefault();
    const itemEdit = listAllOrders.filter((item: any) => item._id === record.id);
    if (itemEdit.length > 0) {
      const bodyItem = cloneDeep(originalOrder);
      bodyItem.action = "update";
      bodyItem._id = itemEdit[0]._id;
      bodyItem.data = cloneDeep(itemEdit[0]);
      bodyItem.data.stord = "Đã hủy";
      delete bodyItem.data._id;
      delete bodyItem.data["__v"];
      openDialogConfirm(dispatch, updateItemOrder, bodyItem);
    }
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
    dispatch(getAllProducts({ role: "user" }));
    dispatch(getListCategory({ role: "user" }));
    dispatch(getListDropdown({ role: "user" }));
  }, [dispatch]);

  // const data = convertListProducts(dataFilter ? dataFilter : []);

  const handleDefaultData = () => {
    dispatch(setDefaultDataFilter(listAllOrders));
    setIsDefault(!isDefault);
  };

  const handleAddProduct = () => {
    dispatch(setAction("create"));
    dispatch(updateProduct([]));
  };

  return (
    <>
      <ModalBox ref={childRef} />
      <div className="ps-main__wrapper">
        <div className="header--dashboard">
          <div className="header__left">
            <h3>Đơn hàng</h3>
            <p>Danh Sách đơn hàng</p>
          </div>
        </div>
        <section className="ps-items-listing">
          <div className="ps-section__actions">
            <Link className="ps-btn success" to="/orders/create-order">
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
                <Search className="search-category" placeholder="Tìm kiếm sản phẩm..." listItem={listAllOrders} isDefault={isDefault} />
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
    </>
  );
};
export default Orders;
