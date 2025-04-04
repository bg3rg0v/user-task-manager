import { ArrowRightOutlined, DownOutlined } from "@ant-design/icons";
import { Button, Collapse, List, Typography } from "antd";
import EditUser from "./EditUser";
import { User } from "~/lib/interfaces";
import { Link } from "react-router-dom";
import { PATHS } from "~/constants";

const UserItem = ({ user }: { user: User }) => (
  <List.Item>
    <Collapse
      expandIconPosition="end"
      expandIcon={({ isActive }) => (
        <DownOutlined style={{ fontSize: 14 }} rotate={isActive ? 180 : 0} />
      )}
      items={[
        {
          key: user.id,
          label: <Typography.Text>{user.name}</Typography.Text>,
          children: user && (
            <EditUser
              user={user}
              navigationLink={
                <Link to={PATHS.POSTS(user.id)}>
                  <Button
                    icon={<ArrowRightOutlined />}
                    iconPosition="end"
                    type="text"
                    htmlType="submit"
                  >
                    See Posts
                  </Button>
                </Link>
              }
            />
          ),
        },
      ]}
    />
  </List.Item>
);

export default UserItem;
