import { InfoCircleOutlined } from "@ant-design/icons";
const InfoMessage = ({ message }: { message: string }) => {
  return (
    <div style={{ textAlign: "center" }}>
      <InfoCircleOutlined style={{ fontSize: 20 }} />
      <p>{message}</p>
    </div>
  );
};

export default InfoMessage;
