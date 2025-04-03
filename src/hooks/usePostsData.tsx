import { InfoCircleOutlined } from "@ant-design/icons";
import {
  fetchUsers,
  selectFetchUsersStatus,
  selectUsers,
} from "@store/features/usersSlice";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import { Result } from "antd";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { usePostsContext } from "~/context/usePostsContext";

const usePostsData = () => {
  const dispatch = useAppDispatch();
  const { userId } = useParams();
  const users = useAppSelector(selectUsers);
  const fetchUsersStatus = useAppSelector(selectFetchUsersStatus);
  const user = users.find((user) => user.id.toString() === userId);
  const {
    posts,
    loading: isPostsLoading,
    error,
    fetchPosts,
  } = usePostsContext();

  const isUserLoading =
    fetchUsersStatus === "idle" || fetchUsersStatus === "loading";
  const isPageLoading = isPostsLoading || isUserLoading;

  useEffect(() => {
    if (fetchUsersStatus === "idle") {
      dispatch(fetchUsers());
    }

    if (userId && !posts?.[userId]) {
      fetchPosts(userId);
    }
  }, [userId, posts, fetchUsersStatus, fetchPosts, dispatch]);

  const noUserFoundFallback = (
    <Result
      icon={<InfoCircleOutlined />}
      title={`User with ID ${userId} does not exist`}
    />
  );

  return { isPageLoading, error, user, posts, noUserFoundFallback };
};

export default usePostsData;
