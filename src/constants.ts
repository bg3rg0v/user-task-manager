export const PATHS = {
  HOME: "/",
  USERS: "/users",
  POSTS: (userId?: string | number) => `/users/${userId}/posts`,
  TASKS: "/tasks",
};
