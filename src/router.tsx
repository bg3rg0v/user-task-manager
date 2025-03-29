import { lazy, Suspense } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AppLayout from "@components/AppLayout/AppLayout";
const InfoMessage = lazy(() => import("@components/InfoMessage"));
const Users = lazy(() => import("@pages/Users"));
const Posts = lazy(() => import("@pages/Posts"));
import { PATHS } from "./constants";
import LoadingSpinner from "@components/LoadingSpinner";

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      {
        path: PATHS.USERS,
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <Users />
          </Suspense>
        ),
        children: [
          {
            path: `${PATHS.USERS}/:userId`,
            element: (
              <Suspense fallback={<LoadingSpinner />}>
                <Posts />
              </Suspense>
            ),
          },
        ],
      },
      {
        path: PATHS.TASKS,
        element: <Suspense fallback={<LoadingSpinner />}>Tasks</Suspense>,
      },
      {
        path: "*",
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <InfoMessage message="Page Not Found" />
          </Suspense>
        ),
      },
    ],
  },
]);

export const AppRouter = () => <RouterProvider router={router} />;
