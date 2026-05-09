import type { Task } from "../../types/types";

export const mockTasks: Task[] = [
  {
    id: "1",
    title: "Design login page",
    description: "Create responsive login UI",
    status: "todo",
    priority: "high",
    assignee: "John",
    dueDate: "2026-05-12",
    createdAt: "2026-05-01",
    tags: ["design", "frontend"],
  },

  {
    id: "2",
    title: "Setup Redux store",
    description: "Configure Redux Toolkit",
    status: "in_progress",
    priority: "medium",
    assignee: "Anna",
    dueDate: "2026-05-15",
    createdAt: "2026-05-02",
    tags: ["redux"],
  },

  {
    id: "3",
    title: "Implement dashboard",
    status: "done",
    priority: "low",
    assignee: "David",
    dueDate: "2026-05-20",
    createdAt: "2026-05-03",
    tags: ["dashboard"],
  },
];
