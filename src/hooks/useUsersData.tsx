import { useEffect } from "react";
import {
  fetchUsers,
  selectFetchUsersStatus,
  selectUpdateUserStatus,
  selectUsers,
} from "@store/features/usersSlice";
import { useAppDispatch, useAppSelector } from "@store/hooks";

const useUsersData = () => {
  const dispatch = useAppDispatch();
  const users = useAppSelector(selectUsers);
  const fetchUsersStatus = useAppSelector(selectFetchUsersStatus);
  const updateUsersStatus = useAppSelector(selectUpdateUserStatus);

  const isPageLoading =
    fetchUsersStatus === "idle" || fetchUsersStatus === "loading";
  const isUpdateUserLoading = updateUsersStatus === "loading";

  const isPageError = fetchUsersStatus === "failed";
  const isUpdateUserError = updateUsersStatus === "failed";

  useEffect(() => {
    if (fetchUsersStatus === "idle") {
      dispatch(fetchUsers());
    }
  }, [dispatch, fetchUsersStatus]);

  return {
    users,
    isPageError,
    isPageLoading,
    isUpdateUserLoading,
    isUpdateUserError,
  };
};

export default useUsersData;
