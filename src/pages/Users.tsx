import { List } from "antd";
import UserItem from "@components/features/Users/UserItem";
import StatusWrapper from "@components/ui/StatusWrapper";
import useUsersData from "@hooks/useUsersData";

const Users = () => {
  const { isPageLoading, isPageError, users } = useUsersData();

  return (
    <StatusWrapper error={isPageError} loading={isPageLoading}>
      <List
        itemLayout="vertical"
        dataSource={users}
        renderItem={(user) => <UserItem user={user} />}
      />
    </StatusWrapper>
  );
};

export default Users;
