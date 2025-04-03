import { Flex, Spin } from "antd";

const LoadingSpinner = () => {
  return (
    <Flex align="center" justify="center" gap="middle">
      <Spin />
    </Flex>
  );
};

export default LoadingSpinner;
