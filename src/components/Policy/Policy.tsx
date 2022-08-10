import { Form, Modal } from "antd";
import React from "react";
import EditorText from "../common/EditorText";
const Policy: React.FC<any> = ({ childRef, titleModel, modalVisible, onOk, onCancel }) => {
  return (
    <Modal title={titleModel} visible={modalVisible} onOk={onOk} onCancel={onCancel} width={1200}>
      <div className="ps-block__layout">
        <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
          <div className="form-group--left">
            <div className="background-content">
              <div className="form-group--nest">
                <div className="form-group">
                  <label>Chính sách vận chuyển</label>
                  <Form.Item name="polship">
                    <EditorText ref={childRef} defaultValue={"<p></p>"} />
                  </Form.Item>
                </div>
                <div className="form-group">
                  <label>Chính sách đổi trả</label>
                  <Form.Item name="polreturn">
                    <EditorText ref={childRef} defaultValue={"<p></p>"} />
                  </Form.Item>
                </div>
                <div className="form-group">
                  <label>Chính sách bảo hành</label>
                  <Form.Item name="polwan">
                    <EditorText ref={childRef} defaultValue={"<p></p>"} />
                  </Form.Item>
                </div>
                <div className="form-group">
                  <label>Chính sách trả góp</label>
                  <Form.Item name="polinsta">
                    <EditorText ref={childRef} defaultValue={"<p></p>"} />
                  </Form.Item>
                </div>
                <div className="form-group">
                  <label>Cam kết chất lượng</label>
                  <Form.Item name="polquality">
                    <EditorText ref={childRef} defaultValue={"<p></p>"} />
                  </Form.Item>
                </div>
                <div className="form-group">
                  <label>Điều khoản sử dụng</label>
                  <Form.Item name="poluse">
                    <EditorText ref={childRef} defaultValue={"<p></p>"} />
                  </Form.Item>
                </div>
                <div className="form-group">
                  <label>Chính sách mua hàng</label>
                  <Form.Item name="polbuy">
                    <EditorText ref={childRef} defaultValue={"<p></p>"} />
                  </Form.Item>
                </div>
                <div className="form-group">
                  <label>Chính sách bảo mật</label>
                  <Form.Item name="polprot">
                    <EditorText ref={childRef} defaultValue={"<p></p>"} />
                  </Form.Item>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};
export default Policy;
