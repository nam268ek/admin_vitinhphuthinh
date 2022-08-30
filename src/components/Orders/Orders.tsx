import { ExclamationCircleOutlined, DownOutlined } from "@ant-design/icons";
import { Button, Dropdown, Menu, Modal, Space, Table, Tag } from "antd";
import { cloneDeep } from "lodash";
import moment from "moment";
import React from "react";
import { FaPlusCircle } from "react-icons/fa";
import { FcAbout } from "react-icons/fc";
import { MdCancel, MdFileDownloadDone, MdModeEdit, MdPrint } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import ModalBox from "../common/ModalBox";
import { getListCategory } from "../redux/Slices/CategorySlice";
import type { ColumnsType } from "antd/es/table";
import type { TableRowSelection } from "antd/es/table/interface";
import {
  getListOrder,
  reqRemoveListSelectItemOrder,
  resetOrder,
  updateItemOrder,
  updateListOrder,
  updateOrder,
  updateViewItemOrder,
} from "../redux/Slices/orderSlice";
import { getListDropdown, setAction, setIsLoading } from "../redux/Slices/PrimarySlice";
import {
  createProduct,
  getAllProducts,
  setDefaultDataFilter,
  updateProduct,
} from "../redux/Slices/productSlice";
import { originalOrder, originalProduct } from "../Services/general.service";

interface DataType {
  key: React.Key;
  id: string;
  orderid: string;
  namecustomer: string;
  nameprod: string;
  price: number;
  date: any;
  payment: string;
  stord: any;
  // action: any;
}

const Orders: React.FC = () => {
  const childRef = React.useRef<any>(null);
  const [isDefault, setIsDefault] = React.useState<boolean>(false);
  const [loadingAction, setLoadingAction] = React.useState<boolean>(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const { dataFilter, listAllOrders, statusResponse } = useSelector((state: any) => state.order);
  const { listAllOrders } = useSelector((state: any) => state.order);
  const [selectedRowKeys, setSelectedRowKeys] = React.useState<React.Key[]>([]);

  const columns: ColumnsType<DataType> = [
    {
      title: "Khách hàng",
      dataIndex: "namecustomer",
      key: "namecustomer",
      render: (text: string) => <span>{text}</span>,
    },
    {
      title: "Ngày đặt hàng",
      dataIndex: "date",
      key: "date",
      render: (date: any) => <span>{moment(date).format("L, h:mm:ss A")}</span>,
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
      dataIndex: "action",
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
        // action: ""
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
      content: (
        <>{status === "done" ? "Xác nhận hoàn thành đơn hàng?" : "Xác nhận hủy đơn hàng?"}</>
      ),
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
      delete bodyItem.data.createdAt;
      delete bodyItem.data.updatedAt;
      delete bodyItem.data["__v"];
      openDialogConfirm(dispatch, updateItemOrder, bodyItem, "");
    }
  };

  React.useEffect(() => {
    dispatch(getAllProducts({ role: "user" }));
    dispatch(getListCategory({ role: "user" }));
    dispatch(getListDropdown({ role: "user" }));
  }, [dispatch]);

  const handleDefaultData = () => {
    dispatch(setDefaultDataFilter(listAllOrders));
    setIsDefault(!isDefault);
  };

  const handleAddOrder = () => {
    dispatch(setAction("create"));
    dispatch(resetOrder());
  };

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection: TableRowSelection<DataType> = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  const menu = (
    <Menu
      items={[
        {
          label: (
            <Link to="" onClick={(e) => handleActionDropdown(1)}>
              Xoá đơn hàng
            </Link>
          ),
          key: "0",
        },
      ]}
    />
  );
  const hasSelected = selectedRowKeys.length > 0 && listAllOrders.length > 0;

  const handleActionDropdown = async (key: number) => {
    switch (key) {
      case 1:
        let listItem: any[] = [];
        for (let index in selectedRowKeys) {
          if (listAllOrders[index]) listItem.push(listAllOrders[index]._id);
        }
        const bodyListSelected = cloneDeep(originalOrder);
        bodyListSelected.action = "delete";
        bodyListSelected.data = listItem;

        setLoadingAction(true);
        const res = await dispatch(reqRemoveListSelectItemOrder(bodyListSelected));
        if (res.payload.code === 200) {
          setLoadingAction(false);
        }
        break;
    }
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
          <div className="ps-section__actions pb-2">
            <Link className="ps-btn success" to="/orders/create-order" onClick={handleAddOrder}>
              <FaPlusCircle />
              <span>Tạo đơn hàng</span>
            </Link>
          </div>
          <div className="ps-section__content">
            <div className="table-responsive">
              <Dropdown.Button
                loading={loadingAction}
                disabled={!hasSelected}
                className="dropdown-action"
                overlay={menu}
                trigger={["click"]}
                icon={<DownOutlined />}
              >
                <Space>{loadingAction ? "Processing..." : "Action"}</Space>
              </Dropdown.Button>
              <Table
                rowSelection={rowSelection}
                columns={columns}
                dataSource={data}
                loading={loadingAction}
              />
            </div>
          </div>
        </section>
      </div>
    </>
  );
};
export default Orders;
