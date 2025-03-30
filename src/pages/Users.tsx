import { List } from "antd";
import UserItem from "@components/UserItem";
import users from "../mockData/users.json";

const Users = () => {
  return (
    <List
      itemLayout="vertical"
      dataSource={users}
      renderItem={(user) => <UserItem user={user} />}
    />
  );
};

export default Users;
