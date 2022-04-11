import React from "react";
import ImageUpload from "../ImageUpload/ImageUpload";
import { Select } from "antd";

const NewProduct: React.FC = () => {
  const { Option } = Select;

  const handleChange = (value: any) => {
    console.log(`selected ${value}`);
  }

  return (
    <div className="ps-main__wrapper">
      <div className="header--dashboard">
        <div className="header__left">
          <h3>Create Product</h3>
          <p>Martfury Create New Product</p>
        </div>
      </div>
      <section className="ps-new-item">
        <form className="ps-form ps-form--new-product" action="" method="get">
          <div className="ps-form__content">
            <div className="row">
              <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12">
                <figure className="ps-block--form-box">
                  <figcaption>General</figcaption>
                  <div className="ps-block__content">
                    <div className="form-group">
                      <label>
                        Product Name<sup>*</sup>
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Enter product name..."
                      />
                    </div>
                    <div className="form-group">
                      <label>
                        Category<sup>*</sup>
                      </label>
                      <Select
                        defaultValue="Select Category..."
                        style={{ width: "100%" }}
                        onChange={handleChange}
                      >
                        <Option value="jack">Jack</Option>
                        <Option value="lucy">Lucy</Option>
                        <Option value="disabled" disabled>
                          Disabled
                        </Option>
                        <Option value="Yiminghe">yiminghe</Option>
                      </Select>
                    </div>
                    <div className="form-group">
                      <label>
                        Product Summary<sup>*</sup>
                      </label>
                      <textarea
                        className="form-control"
                        //   rows="6"
                        //   placeholder="Enter product description..."
                      ></textarea>
                    </div>
                    <div className="form-group">
                      <label>
                        Regular Price<sup>*</sup>
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder=""
                      />
                    </div>
                    <div className="form-group">
                      <label>
                        Sale Price<sup>*</sup>
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder=""
                      />
                    </div>
                    <div className="form-group">
                      <label>
                        Sale Quantity<sup>*</sup>
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder=""
                      />
                    </div>
                    <div className="form-group">
                      <label>
                        Product Description<sup>*</sup>
                      </label>
                      <textarea
                        className="form-control"
                        //   rows="6"
                        name="editordata"
                      ></textarea>
                    </div>
                  </div>
                </figure>
              </div>
              <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12">
                <figure className="ps-block--form-box">
                  <figcaption>Product Images</figcaption>
                  <div className="ps-block__content">
                    <div className="form-group">
                      <label>Product Thumbnail</label>
                      <div className="form-group--nest">
                        <ImageUpload />
                      </div>
                    </div>
                    <div className="form-group">
                      <label>Video (optional)</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Enter video URL"
                      />
                    </div>
                  </div>
                </figure>
                <figure className="ps-block--form-box">
                  <figcaption>Inventory</figcaption>
                  <div className="ps-block__content">
                    <div className="form-group">
                      <label>
                        SKU<sup>*</sup>
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder=""
                      />
                    </div>
                    <div className="form-group form-group--select">
                      <label>Status</label>
                      <div className="form-group__content">
                        <select className="ps-select" title="Status">
                          <option value="1">Status 1</option>
                          <option value="2">Status 2</option>
                          <option value="3">Status 3</option>
                          <option value="4">Status 4</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </figure>
                <figure className="ps-block--form-box">
                  <figcaption>Meta</figcaption>
                  <div className="ps-block__content">
                    <div className="form-group form-group--select">
                      <label>Brand</label>
                      <div className="form-group__content">
                        <select className="ps-select" title="Brand">
                          <option value="1">Brand 1</option>
                          <option value="2">Brand 2</option>
                          <option value="3">Brand 3</option>
                          <option value="4">Brand 4</option>
                        </select>
                      </div>
                    </div>
                    <div className="form-group">
                      <label>Tags</label>
                      <input type="text" className="form-control" />
                    </div>
                  </div>
                </figure>
              </div>
            </div>
          </div>
          <div className="ps-form__bottom">
            <a className="ps-btn ps-btn--black" href="products.html">
              Back
            </a>
            <button className="ps-btn ps-btn--gray">Cancel</button>
            <button className="ps-btn">Submit</button>
          </div>
        </form>
      </section>
    </div>
  );
};
export default NewProduct;
