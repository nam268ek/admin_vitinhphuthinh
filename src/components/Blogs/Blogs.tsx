import { Space, Table } from 'antd';
import moment from 'moment';
import React from 'react';
import { MdDeleteForever } from 'react-icons/md';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

const Blogs: React.FC = () => {
  const dispatch = useDispatch();

  const columns = [
    {
      title: 'Tên bài viết',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'Ngày tạo',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (text: string) => <span>{moment(text).format('DD/MM/YYYY, h:mm:ss A')}</span>,
    },
    {
      title: 'Action',
      key: 'action',
      render: (text: string, record: any) => (
        <Space size="middle">
          <Link to="" className="remove-item">
            <MdDeleteForever size={20} onClick={(e) => handleRemoveCategory(record)} />
          </Link>
        </Space>
      ),
    },
  ];

  const dataSource = [
    {
      key: '1',
      title: '11 of Best Laptops Evaluated Based on Budget',
      createdAt: 32,
      address: '10 Downing Street',
    },
    {
      key: '2',
      name: 'John',
      age: 42,
      address: '10 Downing Street',
    },
  ];

  const handleRemoveCategory = async (record: any) => {
    // const bodyRemoveCategory = cloneDeep(originalCategory);
    // bodyRemoveCategory.action = "delete";
    // bodyRemoveCategory.data._id = record.id;
    // dispatch(setIsLoading(true));
    // await dispatch(removeItemCategory(bodyRemoveCategory));
    // await dispatch(getListCategory({ role: "user" }));
    // dispatch(setIsLoading(false));
  };

  return (
    <>
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
            <div className="table-responsive">
              {/* <Table columns={columns} dataSource={data} /> */}
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Blogs;
