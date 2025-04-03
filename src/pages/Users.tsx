import { List } from "antd";
import UserItem from "@components/features/Users/UserItem";
import StatusWrapper from "@components/ui/StatusWrapper";
import useUsersData from "@hooks/useUsersData";

const Users = () => {
  const { isPageLoading, error, users } = useUsersData();

  return (
    <StatusWrapper error={error} loading={isPageLoading}>
      <List
        itemLayout="vertical"
        dataSource={users}
        renderItem={(user) => <UserItem user={user} />}
      />
    </StatusWrapper>
  );
};

export default Users;
