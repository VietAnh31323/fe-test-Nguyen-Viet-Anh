export const STATUS_COLOR_MAP: Record<
  string,
  { dot: string; border: string; bg: string }
> = {
  todo: { dot: "#8c8c8c", border: "#fafafa", bg: "#fafafa" },
  in_progress: { dot: "#1677ff", border: "#fafafa", bg: "#e6f4ff" },
  done: { dot: "#52c41a", border: "#fafafa", bg: "#f6ffed" },
};

export const TASK_STATUS_OPTIONS = [
  {
    label: "Todo",
    value: "todo",
  },
  {
    label: "In Progress",
    value: "in_progress",
  },
  {
    label: "Done",
    value: "done",
  },
];

export const PRIORITY_OPTIONS = [
  {
    label: "Low",
    value: "low",
  },
  {
    label: "Medium",
    value: "medium",
  },
  {
    label: "High",
    value: "high",
  },
];

export const getStatusColor = (status: string) => {
  switch (status) {
    case "todo":
      return "default";

    case "in_progress":
      return "processing";

    case "done":
      return "success";

    default:
      return "default";
  }
};

export const getPriorityColor = (priority: string) => {
  switch (priority) {
    case "high":
      return "error";

    case "medium":
      return "warning";

    case "low":
      return "success";

    default:
      return "default";
  }
};
