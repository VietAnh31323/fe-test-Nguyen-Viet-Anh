import { createSelector } from "@reduxjs/toolkit";
import type { RootState } from "../../store/store";

const selectTasksState = (state: RootState) => state.tasks;

export const selectAllTasks = createSelector(
  [selectTasksState],
  (tasksState) => tasksState.items,
);

export const selectFilters = createSelector(
  [selectTasksState],
  (tasksState) => tasksState.filters,
);

export const selectPagination = createSelector(
  [selectTasksState],
  (tasksState) => tasksState.pagination,
);

export const selectFilteredTasks = createSelector(
  [selectAllTasks, selectFilters],
  (tasks, filters) => {
    return tasks.filter((task) => {
      const matchesSearch = task.title
        .toLowerCase()
        .includes(filters.searchText.toLowerCase());

      const matchesStatus =
        filters.status.length === 0 || filters.status.includes(task.status);

      const matchesPriority =
        !filters.priority || task.priority === filters.priority;

      let matchesDate = true;

      if (filters.dateRange && task.dueDate) {
        const [start, end] = filters.dateRange;

        matchesDate = task.dueDate >= start && task.dueDate <= end;
      }

      return matchesSearch && matchesStatus && matchesPriority && matchesDate;
    });
  },
);

export const selectPaginatedTasks = createSelector(
  [selectFilteredTasks, selectPagination],

  (tasks, pagination) => {
    const start = (pagination.currentPage - 1) * pagination.pageSize;

    const end = start + pagination.pageSize;

    return tasks.slice(start, end);
  },
);

export const selectTaskStats = createSelector([selectAllTasks], (tasks) => {
  return {
    total: tasks.length,

    todo: tasks.filter((task) => task.status === "todo").length,

    inProgress: tasks.filter((task) => task.status === "in_progress").length,

    done: tasks.filter((task) => task.status === "done").length,
  };
});
