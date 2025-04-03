import React, { useCallback, useState } from "react";
import { isApiError, Post } from "@lib/interfaces";
import * as api from "@lib/api";
import { PostIdAction, PostsContext, PostsStorage } from "./usePostsContext";
import { useNotificationContext } from "./useNotificationContext";

const PostsProvider = ({ children }: { children: React.ReactNode }) => {
  const [posts, setPosts] = useState<PostsStorage | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<boolean>(false);
  const [postIdAction, setPostIdAction] = useState<{
    delete: PostIdAction;
    save: PostIdAction;
  }>({ delete: null, save: null });
  // const [deletePostId, setDeletePostId] = useState<number | undefined>();
  const { notification } = useNotificationContext();

  const updatePostsStorage = useCallback(
    (userId: number, operation: (userPosts: Post[]) => Post[]) => {
      setPosts((prevPosts) => {
        if (!prevPosts) return null;

        const userIdStr = userId.toString();
        const userPosts = prevPosts[userIdStr];

        if (!userPosts) return prevPosts;

        const updatedUserPosts = operation(userPosts);

        return {
          ...prevPosts,
          [userIdStr]: updatedUserPosts,
        };
      });
    },
    []
  );

  const fetchPosts = useCallback(
    async (userId: string | number) => {
      setLoading(true);
      try {
        const postsData = await api.getUserPosts(userId);
        setPosts((prev) => {
          if (!prev) return { [userId]: postsData };
          return { ...prev, [userId]: postsData };
        });
      } catch (err) {
        setError(true);
        notification(isApiError(err) ? err.message : "Unknown Error", "error");
      } finally {
        setLoading(false);
      }
    },
    [notification]
  );

  const updatePostLocally = (userId: number, updatedPost: Post) => {
    updatePostsStorage(userId, (userPosts) =>
      userPosts.map((post) => (post.id === updatedPost.id ? updatedPost : post))
    );
  };

  const savePost = async (postId: number, postData: Partial<Post>) => {
    setPostIdAction((prev) => ({ ...prev, save: postId }));
    try {
      await api.updatePost(postId, postData);
      notification("Post Saved", "success");
    } catch (err) {
      notification(isApiError(err) ? err.message : "Unknown Error", "error");
    } finally {
      setPostIdAction((prev) => ({ ...prev, save: null }));
    }
  };

  const deletePostRemote = async (userId: number, postId: number) => {
    setPostIdAction((prev) => ({ ...prev, delete: postId }));
    try {
      await api.deletePost(postId);
      notification("Post Deleted");
      updatePostsStorage(userId, (userPosts) =>
        userPosts.filter((post) => post.id !== postId)
      );
    } catch (err) {
      notification(isApiError(err) ? err.message : "Unknown Error", "error");
    }
  };

  const value = {
    posts,
    error,
    loading,
    postIdAction,

    fetchPosts,
    updatePostLocally,
    savePost,
    deletePost: deletePostRemote,
  };

  return (
    <PostsContext.Provider value={value}>{children}</PostsContext.Provider>
  );
};

export default PostsProvider;
