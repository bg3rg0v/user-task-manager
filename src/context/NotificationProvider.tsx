import React, { useCallback } from "react";
import { message } from "antd";
import { NoticeType } from "antd/es/message/interface";
import { NotificationContext } from "./useNotificationContext";

const notificationConfig = {
  style: {
    position: "absolute",
    left: "50%",
    transform: "translate(-50%, -50%)",
    top: "calc(100vh - 64px)",
  },
} as const;

const NotificationProvider = ({ children }: { children: React.ReactNode }) => {
  const [messageApi, contextHolder] = message.useMessage();

  const notification = useCallback(
    (message: string, type?: NoticeType) => {
      messageApi.open({
        type: type ?? "info",
        content: message,
        ...notificationConfig,
      });
    },
    [messageApi]
  );

  const value = {
    notification,
  };

  return (
    <NotificationContext.Provider value={value}>
      {contextHolder}
      {children}
    </NotificationContext.Provider>
  );
};

export default NotificationProvider;
