import type { Post, Task, User } from "./interfaces";

export const API_BASE_URL = "https://jsonplaceholder.typicode.com";
export const getUserPosts = async (
  userId: string | number
): Promise<Post[]> => {
  const response = await fetch(`${API_BASE_URL}/posts?userId=${userId}`);
  if (!response.ok) {
    throw new Error(`Failed to fetch posts for user with ID ${userId}`);
  }
  return response.json();
};

export const updatePost = async (
  postId: number,
  postData: Partial<Post>
): Promise<Post> => {
  const response = await fetch(`${API_BASE_URL}/posts/${postId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(postData),
  });
  if (!response.ok) {
    throw new Error(`Failed to update post with ID ${postId}`);
  }
  return response.json();
};

export const deletePost = async (postId: number): Promise<void> => {
  const response = await fetch(`${API_BASE_URL}/posts/${postId}`, {
    method: "DELETE",
  });
  if (!response.ok) {
    throw new Error(`Failed to delete post with ID ${postId}`);
  }
};

export const getTasks = async (): Promise<Task[]> => {
  const response = await fetch(`${API_BASE_URL}/todos`);
  if (!response.ok) {
    throw new Error("Failed to fetch tasks");
  }
  return response.json();
};

export const updateTask = async (
  taskId: number,
  taskData: Partial<Task>
): Promise<Task> => {
  const response = await fetch(`${API_BASE_URL}/todos/${taskId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(taskData),
  });
  if (!response.ok) {
    throw new Error(`Failed to update task with ID ${taskId}`);
  }
  return response.json();
};

export const getUsers = async (): Promise<User[]> => {
  const response = await fetch(`${API_BASE_URL}/users`);
  if (!response.ok) {
    throw new Error(`Failed to fetch users`);
  }
  return response.json();
};

export const getUser = async (userId: number): Promise<User> => {
  const response = await fetch(`${API_BASE_URL}/users/${userId}`);
  if (!response.ok) {
    throw new Error(`Failed to fetch user with ID ${userId}`);
  }
  return response.json();
};

export const updateUser = async (updatedUser: User): Promise<User> => {
  const response = await fetch(`${API_BASE_URL}/users/${updatedUser.id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatedUser),
  });
  if (!response.ok) {
    throw new Error(`Failed to update user with ID ${updatedUser.id}`);
  }
  return response.json();
};
