import { createContext, useContext } from "react";
import { Post, Task } from "@lib/interfaces";

export type Store<T> = {
  [key: string]: T[];
};

export type PostsStorage = Store<Post>;
export type TasksStorage = Store<Task>;

interface PostsContextType {
  posts: PostsStorage | null;
  error: boolean;
  loading: boolean;
  deletePostId?: number;
  fetchPosts: (postId: number) => void;
  savePost: (postId: number, postData: Partial<Post>) => Promise<void>;
  deletePost: (userId: number, postId: number) => Promise<void>;
  updatePostLocally: (userId: number, updatedPost: Post) => void;
}

export const PostsContext = createContext<PostsContextType | undefined>(
  undefined
);
export const usePostsContext = () => {
  const context = useContext(PostsContext);
  if (context === undefined) {
    throw new Error("usePostsContext must be used within a PostsProvider");
  }
  return context;
};
