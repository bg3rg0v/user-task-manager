import { Link, useParams } from "react-router-dom";
import users from "../mockData/users.json";
import UserForm from "@components/Users/UserForm";
import { Button, List } from "antd";
import PostItem from "@components/Posts/EditPost";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { PATHS } from "~/constants";
import LoadingSpinner from "@components/LoadingSpinner";
import { usePostsContext } from "~/context/usePostsContext";
import { useEffect } from "react";
const Posts = () => {
  const { userId } = useParams();
  const { posts, loading, error, fetchPosts } = usePostsContext();
  useEffect(() => {
    if (!userId || isNaN(Number(userId))) return;
    if (posts?.[userId]) return;
    fetchPosts(Number(userId));
  }, [userId, posts, fetchPosts]);

  // TODO: get from redux store
  const user = users.find((user) => user.id === Number(userId));
  if (loading) return <LoadingSpinner />;
  if (error) return <>Error</>;

  const dataSource = userId ? posts?.[userId] : [];

  return (
    <>
      <List
        itemLayout="vertical"
        header={
          <>
            <UserForm
              user={user!}
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
        dataSource={dataSource}
        renderItem={(post) => (
          <PostItem
            key={`post-item-${post.id}`}
            userId={Number(userId)}
            post={post}
          />
        )}
      />
    </>
  );
};

export default Posts;
