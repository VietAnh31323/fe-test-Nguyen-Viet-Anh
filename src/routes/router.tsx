import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../components/layout/MainLayout";
// import DashboardPage from "@/pages/Dashboard";
// import TasksPage from "@/pages/Tasks";
// import MainLayout from "@/components/layout/MainLayout";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      //   {
      //     index: true,
      //     element: <DashboardPage />,
      //   },
      //   {
      //     path: "tasks",
      //     element: <TasksPage />,
      //   },
    ],
  },
]);
