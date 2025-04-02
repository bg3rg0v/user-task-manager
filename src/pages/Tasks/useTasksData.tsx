import { Task } from "@lib/interfaces";
import {
  fetchTasks,
  setCurrentPage,
  setStatusFilter,
  setTitleFilter,
  setUserIdFilter,
} from "@store/features/tasksSlice";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import { TableProps } from "antd";
import { useEffect, useState } from "react";
import { FilterValue } from "antd/es/table/interface";
import { head } from "lodash";
import { getTableColumns } from "./tasksTablePreprocessor";
import users from "../../mockData/users.json";

type Filter = FilterValue | null;
const useTasksData = () => {
  const dispatch = useAppDispatch();
  const { status } = useAppSelector((state) => state.tasks);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchTasks());
    }
  }, [dispatch, status]);

  const handleUserIdFilterChange = (userId: Filter) => {
    const userIdFilter = head(userId) || null;
    const userIdNumberValue = userIdFilter ? Number(userIdFilter) : null;
    dispatch(setUserIdFilter(userIdNumberValue));
  };

  const handleStatusFilterChange = (status: Filter) => {
    const statusValue =
      status === null ? "all" : head(status) ? "completed" : "incomplete";
    dispatch(setStatusFilter(statusValue));
  };

  const handleTitleFilterChange = (title: Filter) => {
    const titleValue = head(title) ?? "";
    dispatch(setTitleFilter(`${titleValue}`));
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

  const handleSearch = (
    selectedKeys: string[],
    confirmCallBack: () => void
  ) => {
    setSearchText(selectedKeys[0]);
    confirmCallBack();
  };

  return {
    columns: getTableColumns(users),
    handleTableChange,
    searchText,
    handleSearch,
  };
};

export default useTasksData;
