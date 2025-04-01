import { Task } from "@lib/interfaces";
import {
  fetchTasks,
  setCurrentPage,
  setStatusFilter,
  setUserIdFilter,
} from "@store/features/tasksSlice";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import { TableProps } from "antd";
import { useEffect } from "react";

import users from "../../mockData/users.json";
import { FilterValue } from "antd/es/table/interface";
import { head } from "lodash";
import { getTableColumns } from "./tasksTablePreprocessor";

type Filter = FilterValue | null;
const useTasksData = () => {
  const dispatch = useAppDispatch();
  const { filteredTasks, status } = useAppSelector((state) => state.tasks);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchTasks());
    }
  }, [dispatch, status]);

  const handleUserIdFilterChange = (userId: Filter) => {
    const userIdFilter = head(userId) || null;
    const userIdNumberValue = !isNaN(Number(userIdFilter))
      ? Number(userIdFilter)
      : null;
    dispatch(setUserIdFilter(userIdNumberValue));
  };

  const handleStatusFilterChange = (status: Filter) => {
    const statusValue =
      status === null ? "all" : head(status) ? "completed" : "incomplete";
    dispatch(setStatusFilter(statusValue));
  };

  const handleTitleFilterChange = (title: Filter) => {
    // TODO: include title filter change handler
    console.log(title);
  };

  const handleTableChange: TableProps<Task>["onChange"] = (
    pagination,
    { userId, status, title }
  ) => {
    handleTitleFilterChange(title);
    handleUserIdFilterChange(userId);
    handleStatusFilterChange(status);
    if (pagination.current) {
      dispatch(setCurrentPage(pagination.current));
    }
  };

  return {
    columns: getTableColumns(users, filteredTasks),
    handleTableChange,
  };
};

export default useTasksData;
