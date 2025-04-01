import type React from "react";
import { useCallback, useState } from "react";
import { Post } from "@lib/interfaces";
import * as api from "@lib/api";
import { PostsContext, PostsStorage } from "./usePostsContext";

const PostsProvider = ({ children }: { children: React.ReactNode }) => {
  const [posts, setPosts] = useState<PostsStorage | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [deletePostId, setDeletePostId] = useState<number | undefined>();

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

  const fetchPosts = useCallback(async (userId: string | number) => {
    setLoading(true);
    setError(null);
    try {
      const postsData = await api.getUserPosts(userId);
      setPosts((prev) => {
        if (!prev) return { [userId]: postsData };
        return { ...prev, [userId]: postsData };
      });
    } catch (error) {
      setError(
        error instanceof Error ? error.message : "An unknown error occurred"
      );
    } finally {
      setLoading(false);
    }
  }, []);

  const updatePostLocally = (userId: number, updatedPost: Post) => {
    updatePostsStorage(userId, (userPosts) =>
      userPosts.map((post) => (post.id === updatedPost.id ? updatedPost : post))
    );
  };

  const savePost = async (postId: number, postData: Partial<Post>) => {
    try {
      await api.updatePost(postId, postData);
    } catch (error) {
      console.log(error);
    }
  };

  const deletePostRemote = async (userId: number, postId: number) => {
    setDeletePostId(postId);
    setError(null);
    try {
      await api.deletePost(postId);
      updatePostsStorage(userId, (userPosts) =>
        userPosts.filter((post) => post.id !== postId)
      );
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "An unknown error occurred"
      );
    } finally {
      setLoading(false);
    }
  };

  const value = {
    posts,
    error,
    loading,
    deletePostId,
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
