import type React from "react";
import LoadingSpinner from "./LoadingSpinner";

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
    <>Error</>;
  }

  return <>{children}</>;
};

export default StatusWrapper;
