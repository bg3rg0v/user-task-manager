import { List } from "antd";
import UserItem from "@components/Users/UserItem";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import { useEffect } from "react";
import {
  fetchUsers,
  selectError,
  selectFetchUsersStatus,
  selectUsers,
} from "@store/features/usersSlice";
import StatusWrapper from "@components/StatusWrapper";

const Users = () => {
  const dispatch = useAppDispatch();
  const users = useAppSelector(selectUsers);
  const error = useAppSelector(selectError);
  const fetchUsersStatus = useAppSelector(selectFetchUsersStatus);

  useEffect(() => {
    if (fetchUsersStatus === "idle") {
      dispatch(fetchUsers());
    }
  }, [dispatch, fetchUsersStatus]);

  return (
    <StatusWrapper
      error={error}
      loading={fetchUsersStatus === "idle" || fetchUsersStatus === "loading"}
    >
      <List
        itemLayout="vertical"
        dataSource={users}
        renderItem={(user) => <UserItem user={user} />}
      />
    </StatusWrapper>
  );
};

export default Users;
