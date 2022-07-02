import React from "react";
import { IoSearchOutline } from "react-icons/io5";
import { FiFilter } from "react-icons/fi";
import { FaPlusCircle } from "react-icons/fa";
import { Table, Tag, Space, Input, Button } from "antd";
import moment from "moment";
import { MdDeleteForever, MdModeEdit } from "react-icons/md";
import { Link } from "react-router-dom";
import SelectOption from "./../common/SelectOption";
import ImageUpload from "../ImageUpload/ImageUpload";
import { useDispatch, useSelector } from "react-redux";
import { updateListImgLayout } from "../redux/Slices/layoutSlice";
import { cloneDeep } from "lodash";
import { originalListImgLayout } from "../Services/general.service";
import { setIsLoading } from "../redux/Slices/PrimarySlice";

const Layout: React.FC = () => {
  const dispatch = useDispatch();
  const { layout1, layout2 } = useSelector((state: any) => state.layout);

  const enterLoading = async (index: any) => {
    const layoutOrigin = cloneDeep(originalListImgLayout);
    layoutOrigin.action = "RSAKEY03";
    layoutOrigin.data = { layout1, layout2 };
    
    dispatch(setIsLoading(true));
    await dispatch(updateListImgLayout(layoutOrigin));
    dispatch(setIsLoading(false));
  };

  const goBack = () => {
    window.history.back();
  }

  return (
    <div className="ps-main__wrapper">
      <div className="header--dashboard">
        <div className="header__left">
          <h3>Layout</h3>
          <p>Danh sách layout</p>
        </div>
      </div>
      <section className="ps-items-listing">
        <div className="ps-form__content">
          <figure className="ps-block--form-box c-b-1">
            <figcaption>Layout 1</figcaption>
            <div className="ps-block__layout">
              <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12">
                <div className="form-group--left">
                  <div className="background-content c-h-1">
                    <label>Background 1</label>
                    <div className="form-group--nest">
                      <ImageUpload styleClassName="upload-image-home" maxNumberOfFiles={3} multiple={false} feature="layout1_l1b1" />
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12">
                <div className="form-group--right">
                  <div className="background-content">
                    <label>Background 2</label>
                    <div className="form-group--nest">
                      <ImageUpload feature="layout1_l1b2" />
                    </div>
                  </div>
                  <div className="background-content">
                    <label>Background 3</label>
                    <div className="form-group--nest">
                      <ImageUpload feature="layout1_l1b3" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </figure>
        </div>
        <div className="ps-form__content">
          <figure className="ps-block--form-box c-b-1">
            <figcaption>Layout 2</figcaption>
            <div className="ps-block__layout">
              <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12">
                <div className="form-group--left">
                  <div className="background-content">
                    <label>Background 1</label>
                    <div className="form-group--nest">
                      <ImageUpload styleClassName="upload-image-home" multiple={false} feature="layout2_l2b1" />
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12">
                <div className="form-group--right">
                  <div className="background-content">
                    <label>Background 2</label>
                    <div className="form-group--nest">
                      <ImageUpload feature="layout2_l2b2" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </figure>
        </div>
        <div className="ps-form__content">
          <div className="ps-form__bottom">
            <Space style={{ width: "100%", justifyContent: "flex-end" }}>
              <Button type="primary" loading={false} onClick={goBack} className="ant-btn-primary">
                Back
              </Button>
              <Button type="primary" htmlType="submit" loading={false} onClick={() => enterLoading(0)} className="ant-btn-primary">
                Submit
              </Button>
            </Space>
          </div>
        </div>
      </section>
    </div>
  );
};
export default Layout;
