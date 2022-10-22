/* eslint-disable react/display-name */
import React, { forwardRef, useImperativeHandle, useState } from 'react';
import { Modal, Button, Input, Form, InputNumber, Select } from 'antd';
import { useSelector } from 'react-redux';
import NoContent from './NoContent';
import { formatMoney } from '../services/general.service';
import ImageDefault from './ImageDefault';
import { SelectOption } from './SelectOption';
import TextArea from 'antd/lib/input/TextArea';

const ModalBox: React.FC<any> = forwardRef(({ status, cancel }, ref) => {
  const [visible, setVisible] = useState<boolean>(false);
  const { viewItemOrder } = useSelector((state: any) => state.order);
  const { Option } = Select;

  useImperativeHandle(ref, () => ({
    showModal: () => {
      setVisible(true);
    },
  }));

  const handleOk = (e: React.MouseEvent<HTMLElement>) => {
    console.log(e);
    setVisible(false);
  };

  const handleCancel = (e: React.MouseEvent<HTMLElement>) => {
    setVisible(false);
  };

  return (
    <>
      <Modal
        title={viewItemOrder[0] ? `OrderID: ${viewItemOrder[0].orderid}` : ''}
        style={{ top: 20 }}
        visible={visible}
        onOk={handleOk}
        onCancel={handleCancel}
        // okButtonProps={{ disabled: true }}
        cancelButtonProps={{ disabled: true }}
        footer={[
          <Button key="submit" type="primary" onClick={handleOk}>
            OK
          </Button>,
        ]}
      >
        <>
          <div className="ps-block__content view">
            {viewItemOrder[0]?.listprod?.map((item: any, index: number) => (
              <div key={item._id}>
                <div className="row">
                  <div className="col-8">
                    <div className="content-left">
                      <div className="item">
                        <div className="i-img">
                          {item.img?.length > 0 ? (
                            <img src={item.img[0].secure_url} alt="product" />
                          ) : (
                            <ImageDefault />
                          )}
                        </div>
                      </div>
                      <div className="item">
                        <div className="i-content">
                          <h6>{item.title}</h6>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-4">
                    <div className="content-right">
                      <div className="item">
                        <div className="i-price">
                          <span>{formatMoney.format(Number(item.price))}</span>
                        </div>
                        <div className="i-qty">
                          <p>
                            Số lượng: <span>{item.quantity}</span>
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {viewItemOrder[0]?.listprod?.length - 1 !== index && <hr />}
              </div>
            ))}
            {viewItemOrder[0]?.listprod?.length === 0 && <NoContent />}
          </div>
          <div className="row">
            <div className="line-dashed">
              <hr className="c-hr" />
            </div>
          </div>
          <div className="ps-block__content view-customer">
            <div className="ps-block__content">
              <div className="row">
                <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12">
                  <div className="form-group">
                    <p style={{ marginBottom: '5px', fontSize: '16px' }}>Khách hàng</p>
                    <Input disabled value={viewItemOrder[0]?.customer?.name} />
                  </div>
                </div>
                <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12">
                  <div className="form-group">
                    <p style={{ marginBottom: '5px', fontSize: '16px' }}>Địa chỉ</p>
                    <Input disabled value={viewItemOrder[0]?.customer?.address} />
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12">
                  <div className="form-group">
                    <p style={{ marginBottom: '5px', fontSize: '16px' }}>Số điện thoại</p>
                    <Input disabled value={viewItemOrder[0]?.customer?.phone} />
                  </div>
                </div>
                <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12">
                  <div className="form-group">
                    <p style={{ marginBottom: '5px', fontSize: '16px' }}>Email</p>
                    <Input disabled value={viewItemOrder[0]?.customer?.email} />
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="form-group">
                  <p style={{ marginBottom: '5px', fontSize: '16px' }}>Ghi chú</p>
                  <TextArea disabled value={viewItemOrder[0]?.customer?.note} />
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="line-dashed">
              <hr className="c-hr" />
            </div>
          </div>
          <div className="ps-block__content view">
            <div className="row">
              <div className="col-6">
                <div className="form-group"></div>
                <div className="form-group">
                  <div className="i-sub">
                    <p className="title-price">Phương thức thanh toán</p>
                    <Input
                      className="select-category"
                      value={viewItemOrder[0]?.priord?.payment}
                      disabled
                    ></Input>
                  </div>
                </div>
                <div className="form-group">
                  <Input addonBefore="Ghi chú" value={viewItemOrder[0]?.priord?.note} disabled />
                </div>
              </div>
              <div className="col-6">
                <div className="row">
                  <div className="col-6">
                    <p className="title-price">Tạm tính</p>
                  </div>
                  <div className="col-6">
                    <div className="o-price">
                      <p>{formatMoney.format(viewItemOrder[0]?.priord?.subtotal)}</p>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="i-sub">
                    <Input
                      disabled
                      addonBefore="Giảm giá"
                      value={formatMoney.format(viewItemOrder[0]?.priord?.discount)}
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="i-sub">
                    <Input
                      disabled
                      addonBefore="Phí Ship."
                      value={formatMoney.format(viewItemOrder[0]?.priord?.feeship)}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="line-dashed">
                <hr className="c-hr" />
              </div>
            </div>
            <div className="row">
              <div className="col-6">
                <p className="title-price">Tổng</p>
              </div>
              <div className="col-6">
                <div className="o-price" style={{ background: '#e1f0fd' }}>
                  <p>{formatMoney.format(viewItemOrder[0]?.priord?.total)}</p>
                </div>
              </div>
            </div>
          </div>
        </>
      </Modal>
    </>
  );
});

export default ModalBox;
