import { createContext, useContext } from "react";
import { NoticeType } from "antd/es/message/interface";

interface NotificationContextType {
  notification: (message: string, type?: NoticeType) => void;
}

export const NotificationContext = createContext<
  NotificationContextType | undefined
>(undefined);
export const useNotificationContext = () => {
  const context = useContext(NotificationContext);
  if (context === undefined) {
    throw new Error(
      "useNotificationContext must be used within a NotificationProvider"
    );
  }
  return context;
};
