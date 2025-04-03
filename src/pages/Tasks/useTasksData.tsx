import { Task } from "@lib/interfaces";
import {
  fetchTasks,
  selectCurrentPage,
  selectError as selectTasksError,
  selectStatus,
  selectStatusFilter,
  selectTitleFilter,
  selectUserIdFilter,
  setCurrentPage,
  setStatusFilter,
  setTitleFilter,
  setUserIdFilter,
  selectFilteredTasks,
} from "@store/features/tasksSlice";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import { TableProps } from "antd";
import { useEffect, useMemo, useState } from "react";
import { FilterValue } from "antd/es/table/interface";
import { head } from "lodash";
import { getTableColumns } from "./tasksTablePreprocessor";
import {
  selectFetchUsersStatus,
  selectUsers,
  fetchUsers,
  selectError as selectUsersError,
} from "@store/features/usersSlice";

type Filter = FilterValue | null;
const useTasksData = () => {
  const dispatch = useAppDispatch();
  const fetchUsersStatus = useAppSelector(selectFetchUsersStatus);
  const isUsersError = useAppSelector(selectUsersError);
  const users = useAppSelector(selectUsers);

  const fetchTasksStatus = useAppSelector(selectStatus);
  const isTasksError = useAppSelector(selectTasksError);
  const statusFilter = useAppSelector(selectStatusFilter);
  const titleFilter = useAppSelector(selectTitleFilter);
  const userIdFilter = useAppSelector(selectUserIdFilter);
  const currentPage = useAppSelector(selectCurrentPage);
  const filteredTasks = useAppSelector(selectFilteredTasks);

  const isLoading =
    fetchTasksStatus === "idle" ||
    fetchTasksStatus === "loading" ||
    fetchUsersStatus === "idle" ||
    fetchUsersStatus === "loading";
  const isError = isTasksError || isUsersError;

  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    if (fetchUsersStatus === "idle") {
      dispatch(fetchUsers());
    }

    if (fetchTasksStatus === "idle") {
      dispatch(fetchTasks());
    }
  }, [dispatch, fetchUsersStatus, fetchTasksStatus]);

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

  const columns = useMemo(
    () =>
      getTableColumns(users, handleSearch).map((column) => {
        if (column.key === "userId" && userIdFilter !== null) {
          return {
            ...column,
            filteredValue: [userIdFilter] as FilterValue,
          };
        }

        if (column.key === "status") {
          let filteredValue: FilterValue | null = null;
          if (statusFilter === "completed") {
            filteredValue = [true];
          } else if (statusFilter === "incomplete") {
            filteredValue = [false];
          }

          if (filteredValue) {
            return {
              ...column,
              filteredValue,
            };
          }
        }

        if (column.key === "title" && titleFilter) {
          return {
            ...column,
            filteredValue: [titleFilter] as FilterValue,
          };
        }

        return column;
      }),
    [users, userIdFilter, statusFilter, titleFilter]
  );

  return {
    columns,
    isError,
    isLoading,
    currentPage,
    filteredTasks,
    handleTableChange,
  };
};

export default useTasksData;
