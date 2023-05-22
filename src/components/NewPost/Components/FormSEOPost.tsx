/* eslint-disable unicorn/filename-case */
/* eslint-disable import/no-unresolved */
/* eslint-disable react/no-children-prop */
import { Card, Col, Form, Input, Row } from 'antd';
import React from 'react';

interface FormSEOPostProps {
  onChange: (e: React.ChangeEvent<HTMLInputElement>, key: string) => void;
}
export const FormSEOPost: React.FC<FormSEOPostProps> = ({ onChange }) => {
  return (
    <Row className="mb-4">
      <Col className="w-full">
        <Card
          headStyle={{ backgroundColor: '#BFDBFE', minHeight: 48 }}
          title={<h3 className="font-medium text-base">Thông tin SEO bài đăng</h3>}
          className="drop-shadow"
          bordered={false}
        >
          <InputItem name="nmttHead" onChange={onChange} label="Tiêu đề (og:title)" />
          <InputItem name="descHead" onChange={onChange} label="Mô tả (description)" />
          <InputItem name="keywordsHead" onChange={onChange} label="Từ khóa (keywords)" />
        </Card>
      </Col>
    </Row>
  );
};

const InputItem = ({ label, name, onChange, ...rest }: any) => {
  return (
    <>
      <span className="font-medium text-sm">{label}</span>
      <Form.Item name={name} className="mb-2" noStyle>
        {<Input onChange={(e) => onChange(e, name)} {...rest} />}
      </Form.Item>
    </>
  );
};
