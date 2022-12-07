import { Breadcrumb, Layout, theme } from 'antd';
import React from 'react';
import { CreateCategory } from './Component/CreateCategory';
import { TableListCategory } from './Component/TableListCategory';

const { Header, Content } = Layout;

export const Categories: React.FC = () => {
  // return (
  //   <div id="category" className="ps-main__wrapper">
  //     <div className="header--dashboard">
  //       <div className="header__left">
  //         <h3 className="text-4xl">Danh mục</h3>
  //         <p>Danh sách danh mục</p>
  //       </div>
  //     </div>
  //     <section>
  //       <CreateCategory />
  //       <TableListCategory />
  //     </section>
  //   </div>
  // );

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <>
      <Header
        className="sticky top-0 z-1 w-full flex"
        style={{ background: colorBgContainer, paddingInline: '35px' }}
      >
        <p className="text-2xl m-0 flex items-center">Danh mục</p>
      </Header>
      <Content className="my-0 mx-4">
        <Breadcrumb className="mx-0 my-2 px-5">
          <Breadcrumb.Item>Categories</Breadcrumb.Item>
          <Breadcrumb.Item>List</Breadcrumb.Item>
        </Breadcrumb>
        <div style={{ background: colorBgContainer }} className="px-5 py-6 min-h-full">
          <section>
            <CreateCategory />
            <TableListCategory />
          </section>
        </div>
      </Content>
    </>
  );
};
