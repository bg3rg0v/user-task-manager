import { User } from "@lib/interfaces";
import { Button, Col, Flex, Form, Input, Row } from "antd";
import type React from "react";
import useEditUserData from "./useEditUserData";

const EditUser = ({
  user,
  navigationLink,
}: {
  user: User;
  navigationLink?: React.ReactNode | React.ReactNode[];
}) => {
  const {
    form,
    formStatus: { isChanged, isValid },
    originalValues,
    handleReset,
    onFinish,
    handleFieldsChange,
    isUserUpdating,
  } = useEditUserData(user);

  return (
    <Form
      form={form}
      layout="vertical"
      wrapperCol={{ span: 24 }}
      onFinish={onFinish}
      initialValues={originalValues}
      onFieldsChange={handleFieldsChange}
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
      <Form.Item>
        <Flex gap={12} justify="flex-end">
          <Button onClick={handleReset} disabled={!isChanged}>
            Cancel
          </Button>
          <Button
            loading={isUserUpdating}
            type="primary"
            htmlType="submit"
            disabled={!isChanged || !isValid}
          >
            Save
          </Button>
          {navigationLink}
        </Flex>
      </Form.Item>
    </Form>
  );
};

export default EditUser;
