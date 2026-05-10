export const formatStatus = (status: string) => {
  switch (status) {
    case "todo":
      return "Todo";

    case "in_progress":
      return "In Progress";

    case "done":
      return "Done";

    default:
      return status;
  }
};
