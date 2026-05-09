import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../components/layout/MainLayout";
import DashboardPage from "../pages/Dasboard";
import TasksPage from "../pages/Tasks";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <DashboardPage />,
      },
      {
        path: "tasks",
        element: <TasksPage />,
      },
    ],
  },
]);
