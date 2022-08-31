import React from "react";
import { IoSearchOutline } from "react-icons/io5";
import { FiFilter } from "react-icons/fi";
import { FaPlusCircle } from "react-icons/fa";
import { Table, Tag, Space, Input, Button, Form } from "antd";
import moment from "moment";
import { MdDeleteForever, MdModeEdit } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import SelectOption from "./../common/SelectOption";
import ImageUpload from "../ImageUpload/ImageUpload";
import { useDispatch, useSelector } from "react-redux";
import { GetDataLayouts, updateListImgLayout } from "../redux/Slices/layoutSlice";
import { cloneDeep } from "lodash";
import { openDialogError, originalListImgLayout } from "../Services/general.service";
import { setIsLoading } from "../redux/Slices/PrimarySlice";
import ImageUploadCloud from "../ImageUpload/ImageUploadCloud";
import ImageUploadSingle from "../ImageUpload/ImageUploadSingle";

const Layout: React.FC = () => {
  const dispatch = useDispatch();
  const { layout, listImgLayout } = useSelector((state: any) => state.layout);
  const navigate = useNavigate();

  const enterLoading = async (index: any) => {
    const layoutOrigin = cloneDeep(originalListImgLayout);
    layoutOrigin.action = "RSAKEY03";
    layoutOrigin.data.layout = layout;

    dispatch(setIsLoading(true));
    await dispatch(updateListImgLayout(layoutOrigin));
    dispatch(setIsLoading(false));
  };

  React.useEffect(() => {
    dispatch(GetDataLayouts({ role: "user" }));
  }, []);

  const goBack = () => {
    window.history.back();
  };

  return (
    <div className="ps-main__wrapper">
      <div className="header--dashboard">
        <div className="header__left">
          <h3>Layout</h3>
          <p>Danh sách layout</p>
        </div>
      </div>
      <section className="ps-items-listing">
        <Form>
          <div className="ps-form__content">
            <figure className="ps-block--form-box c-b-1">
              <figcaption>Layout 1</figcaption>
              <div className="ps-block__layout">
                <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12">
                  <div className="form-group--left">
                    <div className="background-content c-h-1">
                      <label>
                        Background 1 | <span className="highlight">1200</span>px x <span className="highlight">600</span>px
                      </label>
                      <div className="form-group--nest">
                        <ImageUploadSingle
                          styleClassName="upload-image-home"
                          maxNumberOfFiles={3}
                          multiple={false}
                          feature="b1"
                          listImages={layout.b1}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12">
                  <div className="form-group--right">
                    <div className="background-content">
                      <label>
                        Background 2 | <span className="highlight">1200</span>px x <span className="highlight">628</span>px
                      </label>
                      <div className="form-group--nest">
                        <ImageUploadSingle feature="b2" listImages={layout.b2} />
                      </div>
                    </div>
                    <div className="background-content">
                      <label>
                        Background 3 | <span className="highlight">1200</span>px x <span className="highlight">628</span>px
                      </label>
                      <div className="form-group--nest">
                        <ImageUploadSingle feature="b3" listImages={layout.b3} />
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
                <div className="col-xl-4 col-lg-6 col-md-12 col-sm-12 col-12">
                  <div className="form-group--left">
                    <div className="background-content">
                      <label>
                        Background 1 | <span className="highlight">1200</span>px x <span className="highlight">628</span>px
                      </label>
                      <div className="form-group--nest">
                        <ImageUploadSingle styleClassName="upload-image-home" feature="b6" listImages={layout.b6} />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-xl-4 col-lg-6 col-md-12 col-sm-12 col-12">
                  <div className="form-group--left">
                    <div className="background-content">
                      <label>
                        Background 2 | <span className="highlight">1200</span>px x <span className="highlight">628</span>px
                      </label>
                      <div className="form-group--nest">
                        <ImageUploadSingle styleClassName="upload-image-home" feature="b7" listImages={layout.b7} />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-xl-4 col-lg-6 col-md-12 col-sm-12 col-12">
                  <div className="form-group--right">
                    <div className="background-content">
                      <label>
                        Background 3 | <span className="highlight">1200</span>px x <span className="highlight">628</span>px
                      </label>
                      <div className="form-group--nest">
                        <ImageUploadSingle feature="b8" styleClassName="upload-image-home" listImages={layout.b8} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </figure>
          </div>
          <div className="ps-form__content">
            <figure className="ps-block--form-box c-b-1">
              <figcaption>Layout 3</figcaption>
              <div className="ps-block__layout">
                <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12">
                  <div className="form-group--left">
                    <div className="background-content">
                      <label>
                        Background 1 | <span className="highlight">1090</span>px x <span className="highlight">245</span>px
                      </label>
                      <div className="form-group--nest">
                        <ImageUploadSingle styleClassName="upload-image-home" multiple={false} feature="b4" listImages={layout.b4} />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12">
                  <div className="form-group--right">
                    <div className="background-content">
                      <label>
                        Background 2 | <span className="highlight">530</span>px x <span className="highlight">245</span>px
                      </label>
                      <div className="form-group--nest">
                        <ImageUploadSingle feature="b5" listImages={layout.b5} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </figure>
          </div>
        </Form>
      </section>
    </div>
  );
};
export default Layout;
