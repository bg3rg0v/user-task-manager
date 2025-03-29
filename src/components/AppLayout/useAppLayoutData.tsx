import { useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { PATHS } from "~/constants";

const useAppLayoutData = () => {
  const { pathname } = useLocation();

  const activeTabKey = pathname;

  const navigate = useNavigate();
  const tabs = useMemo(
    () =>
      [
        {
          pathKey: PATHS.USERS,
          label: "Users",
        },
        {
          pathKey: PATHS.TASKS,
          label: "Tasks",
        },
      ] as const,
    []
  );

  const tabChangeHandler = (key: string) => {
    const tab = tabs.find((tab) => tab.pathKey === key);
    if (tab) {
      navigate(tab.pathKey);
    }
  };

  return { activeTabKey, tabs, tabChangeHandler };
};

export default useAppLayoutData;
