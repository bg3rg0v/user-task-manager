import { useEffect } from "react";
import { selectError } from "@store/features/tasksSlice";
import {
  fetchUsers,
  selectFetchUsersStatus,
  selectUsers,
} from "@store/features/usersSlice";
import { useAppDispatch, useAppSelector } from "@store/hooks";

const useUsersData = () => {
  const dispatch = useAppDispatch();
  const users = useAppSelector(selectUsers);
  const error = useAppSelector(selectError);
  const fetchUsersStatus = useAppSelector(selectFetchUsersStatus);

  useEffect(() => {
    if (fetchUsersStatus === "idle") {
      dispatch(fetchUsers());
    }
  }, [dispatch, fetchUsersStatus]);

  return {
    users,
    error,
    isPageLoading:
      fetchUsersStatus === "idle" || fetchUsersStatus === "loading",
  };
};

export default useUsersData;
