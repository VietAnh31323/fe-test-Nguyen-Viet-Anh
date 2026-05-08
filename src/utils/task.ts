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
