import type { Post, Task } from "./interfaces";

export const API_BASE_URL = "https://jsonplaceholder.typicode.com";
export async function getUserPosts(userId: string | number): Promise<Post[]> {
  const response = await fetch(`${API_BASE_URL}/posts?userId=${userId}`);
  if (!response.ok) {
    throw new Error(`Failed to fetch posts for user with ID ${userId}`);
  }
  return response.json();
}

export async function updatePost(
  postId: number,
  postData: Partial<Post>
): Promise<Post> {
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
}

export async function deletePost(postId: number): Promise<void> {
  const response = await fetch(`${API_BASE_URL}/posts/${postId}`, {
    method: "DELETE",
  });
  if (!response.ok) {
    throw new Error(`Failed to delete post with ID ${postId}`);
  }
}

export async function getTasks(): Promise<Task[]> {
  const response = await fetch(`${API_BASE_URL}/todos`);
  if (!response.ok) {
    throw new Error("Failed to fetch tasks");
  }
  return response.json();
}

export async function updateTask(
  taskId: number,
  taskData: Partial<Task>
): Promise<Task> {
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
}
