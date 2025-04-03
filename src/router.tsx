import { lazy, Suspense } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { PATHS } from "./constants";
import AppLayout from "@components/ui/AppLayout/AppLayout";
import LoadingSpinner from "@components/ui/LoadingSpinner";
import PostsProvider from "./context/PostsProvider";
const Users = lazy(() => import("@pages/Users"));
const Posts = lazy(() => import("@pages/Posts"));
const Tasks = lazy(() => import("@pages/Tasks"));
import { StoreProvider } from "@store/StoreProvider";
import NotificationProvider from "./context/NotificationProvider";
import { Result } from "antd";
import { InfoCircleOutlined } from "@ant-design/icons";
const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      {
        path: PATHS.TASKS,
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <Tasks />
          </Suspense>
        ),
      },
      {
        path: PATHS.USERS,
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <Users />
          </Suspense>
        ),
      },
      {
        path: PATHS.POSTS(":userId"),
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <Posts />
          </Suspense>
        ),
      },
      {
        path: "*",
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <Result icon={<InfoCircleOutlined />} title="Page Not Found" />
          </Suspense>
        ),
      },
    ],
  },
]);

export const AppRouter = () => (
  <StoreProvider>
    <NotificationProvider>
      <PostsProvider>
        <RouterProvider router={router} />
      </PostsProvider>
    </NotificationProvider>
  </StoreProvider>
);
