import { Link } from "react-router-dom";
import { Button, List } from "antd";
import EditPost from "@components/features/Posts/EditPost";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { PATHS } from "~/constants";
import StatusWrapper from "@components/ui/StatusWrapper";
import EditUser from "@components/features/Users/EditUser";
import usePostsData from "@hooks/usePostsData";
const Posts = () => {
  const { isPageLoading, error, user, posts, noUserFoundFallback } =
    usePostsData();

  return (
    <StatusWrapper loading={isPageLoading} error={error}>
      {!user ? (
        noUserFoundFallback
      ) : (
        <List
          itemLayout="vertical"
          header={
            <>
              <EditUser
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
          dataSource={posts?.[user.id]}
          renderItem={(post) => (
            <EditPost
              key={`post-item-${post.id}`}
              userId={post.userId.toString()}
              post={post}
            />
          )}
        />
      )}
    </StatusWrapper>
  );
};

export default Posts;
