import { Link, useParams } from "react-router-dom";
import posts from "../mockData/posts.json";
import users from "../mockData/users.json";
import UserForm from "@components/UserForm";
import { Button, List } from "antd";
import PostItem from "@components/PostItem";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { PATHS } from "~/constants";

const Posts = () => {
  // TO DO: fetch posts with userId
  const { userId } = useParams();
  console.log(userId);
  const user = users[0];

  return (
    <List
      header={
        <>
          <UserForm
            user={user}
            navigationLink={
              <Link to={PATHS.USERS}>
                <Button
                  icon={<ArrowLeftOutlined />}
                  iconPosition="start"
                  type="text"
                  htmlType="submit"
                >
                  Back
                </Button>
              </Link>
            }
          />
        </>
      }
      bordered
      dataSource={posts}
      renderItem={(post) => <PostItem post={post} />}
    />
  );
};

export default Posts;
