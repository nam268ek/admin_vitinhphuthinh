import React from "react";

const Products: React.FC = () => {
  return (
    <div className="ps-main__wrapper">
      <div className="header--dashboard">
        <div className="header__left">
          <h3>Products</h3>
          <p>Martfury Product Listing</p>
        </div>
      </div>
      <section className="ps-items-listing">
        <div className="ps-section__actions">
          <a className="ps-btn success" href="/products/create-product">
            <i className="icon icon-plus mr-2"></i>New Product
          </a>
        </div>
        <div className="ps-section__header">
          <div className="ps-section__filter">
            <form className="ps-form--filter" action="index.html" method="get">
              <div className="ps-form__left">
                <div className="form-group">
                  <div className="ant-select ps-ant-dropdown ant-select-single ant-select-show-arrow">
                    <div className="ant-select-selector">
                      <span className="ant-select-selection-search">
                        <input
                          type="search"
                          //   autocomplete="off"
                          className="ant-select-selection-search-input"
                          //   style="opacity: 0"
                          role="combobox"
                          aria-haspopup="listbox"
                          aria-owns="rc_select_0_list"
                          aria-autocomplete="list"
                          aria-controls="rc_select_0_list"
                          aria-activedescendant="rc_select_0_list_0"
                          value=""
                          //   readonly=""
                          unselectable="on"
                          id="rc_select_0"
                        />
                      </span>
                      <span className="ant-select-selection-placeholder">
                        Select Category
                      </span>
                    </div>
                    <span
                      className="ant-select-arrow"
                      //   style="user-select: none; -webkit-user-select: none"
                      unselectable="on"
                      aria-hidden="true"
                    >
                      <span
                        role="img"
                        aria-label="down"
                        className="anticon anticon-down ant-select-suffix"
                      >
                        <svg
                          viewBox="64 64 896 896"
                          focusable="false"
                          data-icon="down"
                          width="1em"
                          height="1em"
                          fill="currentColor"
                          aria-hidden="true"
                        >
                          <path d="M884 256h-75c-5.1 0-9.9 2.5-12.9 6.6L512 654.2 227.9 262.6c-3-4.1-7.8-6.6-12.9-6.6h-75c-6.5 0-10.3 7.4-6.5 12.7l352.6 486.1c12.8 17.6 39 17.6 51.7 0l352.6-486.1c3.9-5.3.1-12.7-6.4-12.7z"></path>
                        </svg>
                      </span>
                    </span>
                  </div>
                </div>
                <div className="form-group">
                  <div className="ant-select ps-ant-dropdown ant-select-single ant-select-show-arrow">
                    <div className="ant-select-selector">
                      <span className="ant-select-selection-search">
                        <input
                          type="search"
                          //   autocomplete="off"
                          className="ant-select-selection-search-input"
                          //   style="opacity: 0"
                          role="combobox"
                          aria-haspopup="listbox"
                          aria-owns="rc_select_1_list"
                          aria-autocomplete="list"
                          aria-controls="rc_select_1_list"
                          aria-activedescendant="rc_select_1_list_0"
                          value=""
                          //   readonly=""
                          unselectable="on"
                          id="rc_select_1"
                        />
                      </span>
                      <span className="ant-select-selection-placeholder">
                        Select Category
                      </span>
                    </div>
                    <span
                      className="ant-select-arrow"
                      //   style="user-select: none; -webkit-user-select: none"
                      unselectable="on"
                      aria-hidden="true"
                    >
                      <span
                        role="img"
                        aria-label="down"
                        className="anticon anticon-down ant-select-suffix"
                      >
                        <svg
                          viewBox="64 64 896 896"
                          focusable="false"
                          data-icon="down"
                          width="1em"
                          height="1em"
                          fill="currentColor"
                          aria-hidden="true"
                        >
                          <path d="M884 256h-75c-5.1 0-9.9 2.5-12.9 6.6L512 654.2 227.9 262.6c-3-4.1-7.8-6.6-12.9-6.6h-75c-6.5 0-10.3 7.4-6.5 12.7l352.6 486.1c12.8 17.6 39 17.6 51.7 0l352.6-486.1c3.9-5.3.1-12.7-6.4-12.7z"></path>
                        </svg>
                      </span>
                    </span>
                  </div>
                </div>
                <div className="form-group">
                  <div className="ant-select ps-ant-dropdown ant-select-single ant-select-show-arrow">
                    <div className="ant-select-selector">
                      <span className="ant-select-selection-search">
                        <input
                          type="search"
                          //   autocomplete="off"
                          className="ant-select-selection-search-input"
                          //   style="opacity: 0"
                          role="combobox"
                          aria-haspopup="listbox"
                          aria-owns="rc_select_2_list"
                          aria-autocomplete="list"
                          aria-controls="rc_select_2_list"
                          aria-activedescendant="rc_select_2_list_0"
                          value=""
                          //   readonly=""
                          unselectable="on"
                          id="rc_select_2"
                        />
                      </span>
                      <span className="ant-select-selection-placeholder">
                        Status
                      </span>
                    </div>
                    <span
                      className="ant-select-arrow"
                      //   style="user-select: none; -webkit-user-select: none"
                      unselectable="on"
                      aria-hidden="true"
                    >
                      <span
                        role="img"
                        aria-label="down"
                        className="anticon anticon-down ant-select-suffix"
                      >
                        <svg
                          viewBox="64 64 896 896"
                          focusable="false"
                          data-icon="down"
                          width="1em"
                          height="1em"
                          fill="currentColor"
                          aria-hidden="true"
                        >
                          <path d="M884 256h-75c-5.1 0-9.9 2.5-12.9 6.6L512 654.2 227.9 262.6c-3-4.1-7.8-6.6-12.9-6.6h-75c-6.5 0-10.3 7.4-6.5 12.7l352.6 486.1c12.8 17.6 39 17.6 51.7 0l352.6-486.1c3.9-5.3.1-12.7-6.4-12.7z"></path>
                        </svg>
                      </span>
                    </span>
                  </div>
                </div>
              </div>
              <div className="ps-form__right">
                <button className="ps-btn ps-btn--gray">
                  <i className="icon icon-funnel mr-2"></i>Filter
                </button>
              </div>
            </form>
          </div>
          <div className="ps-section__search">
            <form
              className="ps-form--search-simple"
              action="index.html"
              method="get"
            >
              <input
                type="text"
                className="form-control"
                placeholder="Search product"
              />
              <button>
                <i className="icon icon-magnifier"></i>
              </button>
            </form>
          </div>
        </div>
        <div className="ps-section__content">
          <div className="table-responsive">
            <table className="table ps-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>SKU</th>
                  <th>Stock</th>
                  <th>Price</th>
                  <th>Categories</th>
                  <th>Date</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1</td>
                  <td>
                    <a href="#">
                      <strong>
                        Herschel Leather Duffle Bag In Brown Color
                      </strong>
                    </a>
                  </td>
                  <td>AB123456789-1</td>
                  <td>
                    <span className="ps-badge success">Stock</span>
                  </td>
                  <td>
                    <strong>£125.30</strong>
                  </td>
                  <td>
                    <p className="ps-item-categories">
                      <a href="#">Bags</a>
                      <a href="#">Clothing &amp; Apparel</a>
                    </p>
                  </td>
                  <td>2019/11/06</td>
                  <td>
                    <a className="ant-dropdown-trigger ps-dropdown__toggle ps-dropdown">
                      <i className="icon-ellipsis"></i>
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>2</td>
                  <td>
                    <a href="#">
                      <strong>Apple iPhone Retina 6s Plus 64GB</strong>
                    </a>
                  </td>
                  <td>CD987654316-1</td>
                  <td>
                    <span className="ps-badge success">Stock</span>
                  </td>
                  <td>
                    <strong>£1,249.99</strong>
                  </td>
                  <td>
                    <p className="ps-item-categories">
                      <a href="#">Computers &amp; Technologies</a>
                      <a href="#">Technologies</a>
                    </p>
                  </td>
                  <td>2018/12/11</td>
                  <td>
                    <a className="ant-dropdown-trigger ps-dropdown__toggle ps-dropdown">
                      <i className="icon-ellipsis"></i>
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>3</td>
                  <td>
                    <a href="#">
                      <strong>
                        Marshall Kilburn Portable Wireless Speaker
                      </strong>
                    </a>
                  </td>
                  <td>SF1133569600-1</td>
                  <td>
                    <span className="ps-badge success">Stock</span>
                  </td>
                  <td>
                    <strong>£36.78</strong>
                  </td>
                  <td>
                    <p className="ps-item-categories">
                      <a href="#">Babies &amp; Moms</a>
                      <a href="#">Refrigerators</a>
                    </p>
                  </td>
                  <td>2018/12/11</td>
                  <td>
                    <a className="ant-dropdown-trigger ps-dropdown__toggle ps-dropdown">
                      <i className="icon-ellipsis"></i>
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>4</td>
                  <td>
                    <a href="#">
                      <strong>Xbox One Wireless Controller Black Color</strong>
                    </a>
                  </td>
                  <td>AB123456788</td>
                  <td>
                    <span className="ps-badge success">Stock</span>
                  </td>
                  <td>
                    <strong>£55.30</strong>
                  </td>
                  <td>
                    <p className="ps-item-categories">
                      <a href="#">Accessories</a>
                      <a href="#">Air Conditioners</a>
                    </p>
                  </td>
                  <td>2018/12/11</td>
                  <td>
                    <a className="ant-dropdown-trigger ps-dropdown__toggle ps-dropdown">
                      <i className="icon-ellipsis"></i>
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>5</td>
                  <td>
                    <a href="#">
                      <strong>Grand Slam Indoor Of Show Jumping Novel</strong>
                    </a>
                  </td>
                  <td>AB1234567899</td>
                  <td>
                    <span className="ps-badge success">Stock</span>
                  </td>
                  <td>
                    <strong>£32.39</strong>
                  </td>
                  <td>
                    <p className="ps-item-categories">
                      <a href="#">Books &amp; Office</a>
                      <a href="#">Cars &amp; Motocycles</a>
                    </p>
                  </td>
                  <td>2018/12/11</td>
                  <td>
                    <a className="ant-dropdown-trigger ps-dropdown__toggle ps-dropdown">
                      <i className="icon-ellipsis"></i>
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>6</td>
                  <td>
                    <a href="#">
                      <strong>Rayban Rounded Sunglass Brown Color</strong>
                    </a>
                  </td>
                  <td>AB123456783</td>
                  <td>
                    <span className="ps-badge success">Stock</span>
                  </td>
                  <td>
                    <strong>£321.39</strong>
                  </td>
                  <td>
                    <p className="ps-item-categories">
                      <a href="#">Clothing &amp; Apparel</a>
                      <a href="#">Cars &amp; Motocycles</a>
                    </p>
                  </td>
                  <td>2018/12/11</td>
                  <td>
                    <a className="ant-dropdown-trigger ps-dropdown__toggle ps-dropdown">
                      <i className="icon-ellipsis"></i>
                    </a>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div className="ps-section__footer">
          <p>Show 10 in 30 items.</p>
          <ul className="pagination">
            <li>
              <a href="#">
                <i className="icon icon-chevron-left"></i>
              </a>
            </li>
            <li className="active">
              <a href="#">1</a>
            </li>
            <li>
              <a href="#">2</a>
            </li>
            <li>
              <a href="#">3</a>
            </li>
            <li>
              <a href="#">
                <i className="icon-chevron-right"></i>
              </a>
            </li>
          </ul>
        </div>
      </section>
    </div>
  );
};
export default Products;
