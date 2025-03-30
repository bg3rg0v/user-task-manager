import { Button, Col, Flex, Form, Input, Row } from "antd";
import React from "react";
import { User } from "~/interfaces";

const onFinish = (value: {
  username: string;
  email: string;
  street: string;
  suite: string;
  city: string;
}) => {
  console.log("Received value of form: ", value);
};
const UserForm = ({
  user,
  navigationLink,
}: {
  user: User;
  navigationLink?: React.ReactNode | React.ReactNode[];
}) => {
  return (
    <Form
      name={`complex-form-${user.username}`}
      layout={"vertical"}
      onFinish={onFinish}
      wrapperCol={{ span: 24 }}
      initialValues={{
        username: user.username,
        email: user.email,
        street: user.address.street,
        suite: user.address.suite,
        city: user.address.city,
      }}
    >
      <Row gutter={12}>
        <Col span={12}>
          <Form.Item label="Username">
            <Form.Item
              name="username"
              noStyle
              rules={[{ required: true, message: "Username is required" }]}
            >
              <Input placeholder="" />
            </Form.Item>
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item label="Email">
            <Form.Item
              name="email"
              noStyle
              rules={[{ required: true, message: "Email is required" }]}
            >
              <Input placeholder="" />
            </Form.Item>
          </Form.Item>
        </Col>
      </Row>
      <Form.Item label="Address">
        <Row gutter={12}>
          <Col span={8}>
            <Form.Item
              name="street"
              noStyle
              rules={[{ required: true, message: "Street is required" }]}
            >
              <Input placeholder="Street" />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              name="suite"
              noStyle
              rules={[{ required: true, message: "Suite is required" }]}
            >
              <Input placeholder="Suite" />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              name="city"
              noStyle
              rules={[{ required: true, message: "City is required" }]}
            >
              <Input placeholder="City" />
            </Form.Item>
          </Col>
        </Row>
      </Form.Item>

      <Form.Item label={null}>
        <Flex gap={12} justify="flex-end">
          {/* TO DO: make Submit button available after changes */}
          <>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
            {navigationLink}
          </>
        </Flex>
      </Form.Item>
    </Form>
  );
};

export default UserForm;
