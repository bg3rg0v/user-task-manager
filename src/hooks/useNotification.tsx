import { message } from "antd";
import { NoticeType } from "antd/es/message/interface";
import { useCallback } from "react";

const notificationConfig = {
  style: {
    position: "absolute",
    left: "50%",
    transform: "translate(-50%, -50%)",
    top: "calc(100vh - 64px)",
  },
} as const;
const useNotification = () => {
  const [messageApi, contextHolder] = message.useMessage();

  const notification = useCallback(
    (message: string, type?: NoticeType) => {
      console.log("calling notification");

      messageApi.open({
        type: type ?? "info",
        content: message,
        ...notificationConfig,
      });
    },
    [messageApi]
  );

  return {
    contextHolder,
    notification,
  };
};

export default useNotification;
