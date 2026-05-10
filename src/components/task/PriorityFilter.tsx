import { Select } from "antd";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { setFilter } from "../../features/tasks/tasksSlice";
import { PRIORITY_OPTIONS } from "../../utils/task";
import type { TaskPriority } from "../../types/types";
import { selectFilters } from "../../features/tasks/selectors";

const PriorityFilter = () => {
  const dispatch = useAppDispatch();
  const priority = useAppSelector((state) => selectFilters(state).priority);

  return (
    <Select
      placeholder="Filter priority"
      options={PRIORITY_OPTIONS}
      value={priority}
      onChange={(value?: TaskPriority) => dispatch(setFilter({ priority: value }))}
      allowClear
    />
  );
};

export default PriorityFilter;
