import { Task } from "@lib/interfaces";
import {
  fetchTasks,
  selectCurrentPage,
  selectFetchTasksStatus,
  selectStatusFilter,
  selectTitleFilter,
  selectUserIdFilter,
  setCurrentPage,
  setStatusFilter,
  setTitleFilter,
  setUserIdFilter,
  selectFilteredTasks,
  resetAllFilters,
  selectIsFilterApplied,
} from "@store/features/tasksSlice";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import { TableProps } from "antd";
import { useEffect, useMemo } from "react";
import { FilterValue } from "antd/es/table/interface";
import { head, isEmpty } from "lodash";
import { getTableColumns } from "@components/features/Tasks/tasksTablePreprocessor";
import {
  selectFetchUsersStatus,
  selectUsers,
  fetchUsers,
} from "@store/features/usersSlice";

type Filter = FilterValue | null;
const useTasksData = () => {
  const dispatch = useAppDispatch();
  const fetchUsersStatus = useAppSelector(selectFetchUsersStatus);
  const users = useAppSelector(selectUsers);

  const fetchTasksStatus = useAppSelector(selectFetchTasksStatus);
  const statusFilter = useAppSelector(selectStatusFilter);
  const titleFilter = useAppSelector(selectTitleFilter);
  const userIdFilter = useAppSelector(selectUserIdFilter);
  const currentPage = useAppSelector(selectCurrentPage);
  const filteredTasks = useAppSelector(selectFilteredTasks);
  const isFilterApplied = useAppSelector(selectIsFilterApplied);

  const isPageLoading =
    fetchTasksStatus === "idle" ||
    fetchTasksStatus === "loading" ||
    fetchUsersStatus === "idle" ||
    fetchUsersStatus === "loading";
  const isTasksError = fetchTasksStatus === "failed";
  const isUserError = fetchUsersStatus === "failed";
  const isPageError = isTasksError || isUserError;

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
    const statusValue = isEmpty(status)
      ? "all"
      : head(status)
      ? "completed"
      : "incomplete";
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

  const handleResetFilters = () => {
    dispatch(resetAllFilters());
  };

  const columns = useMemo(
    () =>
      getTableColumns(users).map((column) => {
        let filteredValue: FilterValue = [];

        if (column.key === "userId" && userIdFilter !== null) {
          filteredValue = [userIdFilter] as FilterValue;
        }

        if (column.key === "status") {
          if (statusFilter === "completed") {
            filteredValue = [true];
          } else if (statusFilter === "incomplete") {
            filteredValue = [false];
          }
        }

        if (column.key === "title" && titleFilter) {
          filteredValue = [titleFilter] as FilterValue;
        }

        return {
          ...column,
          filteredValue,
        };
      }),
    [users, userIdFilter, statusFilter, titleFilter]
  );

  return {
    columns,
    isPageError,
    isPageLoading,
    currentPage,
    filteredTasks,
    isFilterApplied,
    handleTableChange,
    handleResetFilters,
  };
};

export default useTasksData;
