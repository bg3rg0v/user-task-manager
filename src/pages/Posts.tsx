import { Link, useParams } from "react-router-dom";
import { Button, List } from "antd";
import PostItem from "@components/Posts/EditPost";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { PATHS } from "~/constants";
import LoadingSpinner from "@components/LoadingSpinner";
import { usePostsContext } from "~/context/usePostsContext";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import { fetchUsers } from "@store/features/usersSlice";
import InfoMessage from "@components/InfoMessage";
import EditUser from "@components/Users/EditUser";
const Posts = () => {
  const dispatch = useAppDispatch();
  const params = useParams<{ userId: string }>();
  const userId = Number(params.userId);

  const { status, users } = useAppSelector((state) => state.users);
  const user = users.find((user) => user.id === userId);
  const {
    posts,
    loading: isPostsLoading,
    error,
    fetchPosts,
  } = usePostsContext();

  const isUserLoading = status === "idle" || status === "loading";
  const isPageLoading = isPostsLoading || isUserLoading;

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchUsers());
    }

    if (!userId || isNaN(userId)) return;
    if (posts?.[userId]) return;
    fetchPosts(Number(userId));
  }, [userId, posts, fetchPosts, status, dispatch]);

  if (isPageLoading) return <LoadingSpinner />;
  if (error) return <>Error</>;

  if (!user)
    return (
      <InfoMessage message={`User with ID ${params.userId} does not exist`} />
    );

  // const dataSource = user ? posts?.[user.id] : [];

  return (
    <>
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
