import { Flex, Spin } from "antd";
import { SpinSize } from "antd/es/spin";

const LoadingSpinner = ({ size = "default" }: { size?: SpinSize }) => {
  return (
    <Flex align="center" justify="center" gap="middle">
      <Spin size={size} />
    </Flex>
  );
};

export default LoadingSpinner;
