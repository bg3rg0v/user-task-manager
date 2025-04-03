import type React from "react";
import LoadingSpinner from "./LoadingSpinner";
import { Result } from "antd";

export const StatusWrapper = ({
  children,
  loading,
  error,
}: {
  children: React.ReactNode;
  loading: boolean;
  error: boolean;
}) => {
  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <Result title="Error Page" status="error" />;
  }

  return <>{children}</>;
};

export default StatusWrapper;
