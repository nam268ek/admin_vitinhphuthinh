/* eslint-disable unicorn/filename-case */
/* eslint-disable import/no-unresolved */
/* eslint-disable react/no-children-prop */
import { Card, Col, Form, FormInstance, Input, Row } from 'antd';
import { BASE_URL } from 'src/constants/const';
import React from 'react';

interface FormSEOPostProps {
  form: FormInstance;
  onChange: (e: React.ChangeEvent<HTMLInputElement>, key: string) => void;
}
export const FormSEOPost: React.FC<FormSEOPostProps> = ({ form, onChange }) => {
  return (
    <Row className="mb-4">
      <Col className="w-full">
        <Card
          headStyle={{ backgroundColor: '#BFDBFE', minHeight: 48 }}
          title={<h3 className="font-medium text-base">Thông tin SEO bài đăng</h3>}
          className="drop-shadow"
          bordered={false}
        >
          <Form form={form}>
            <InputItem name="seoDescription" onChange={onChange} label="Mô tả (description)" />
            <InputItem name="seoKeywords" onChange={onChange} label="Từ khóa (keywords)" />
            <InputItem name="seoTitle" onChange={onChange} label="Title (og:title)" />
            <InputItem name="seoLink" onChange={onChange} label="Link (canonical)" addonBefore={`${BASE_URL}/`} />
          </Form>
        </Card>
      </Col>
    </Row>
  );
};

const InputItem = ({ label, name, onChange, ...rest }: any) => {
  return (
    <Form.Item name={name} className="mb-2">
      <span className="font-medium text-sm">{label}</span>
      {<Input onChange={(e) => onChange(e, name)} {...rest} />}
    </Form.Item>
  );
};
