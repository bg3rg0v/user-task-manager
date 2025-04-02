import { List } from "antd";
import UserItem from "@components/Users/UserItem";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import LoadingSpinner from "@components/LoadingSpinner";
import { useEffect } from "react";
import { fetchUsers } from "@store/features/usersSlice";

const Users = () => {
  const dispatch = useAppDispatch();
  const { status, error, users } = useAppSelector((state) => state.users);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchUsers());
    }
  }, [dispatch, status]);

  if (status === "idle" || status === "loading") return <LoadingSpinner />;
  if (error) return <>Error</>;

  return (
    <List
      itemLayout="vertical"
      dataSource={users}
      renderItem={(user) => <UserItem user={user} />}
    />
  );
};

export default Users;
