import React from "react";

const NewProductv1: React.FC = () => {
  return (
    <div className="ps-main__wrapper">
      <div className="header--dashboard">
        <div className="header__left">
          <h3>Blogs</h3>
          <p>Danh sách bài đăng</p>
        </div>
      </div>
      <section className="ps-items-listing">
        <div className="ps-form__content"></div>
        <div>
          <div className="container-block">
            <div className="container-block__title">
              <h2>
               Campaigns
              </h2>
            </div>
            <div className="i4v3k">
              <div className="Polaris-TextContainer_szg8b Polaris-TextContainer--spacingTight_1o4d6">
                <span className="Polaris-TextStyle--variationSubdued_1segu">Marketing campaigns are groups of related marketing activities.</span>
                <div>
                  <button className="Polaris-Button_r99lw Polaris-Button--plain_2z97r" type="button">
                    <span className="Polaris-Button__Content_xd1mk">
                      <span className="Polaris-Button__Text_yj3uv">Create campaign</span>
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default NewProductv1;
