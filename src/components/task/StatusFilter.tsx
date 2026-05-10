import { Select } from "antd";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import type { TaskStatus } from "../../types/types";
import { setFilter } from "../../features/tasks/tasksSlice";
import { TASK_STATUS_OPTIONS } from "../../utils/task";
import { selectFilters } from "../../features/tasks/selectors";

const StatusFilter = () => {
  const dispatch = useAppDispatch();
  const status = useAppSelector((state) => selectFilters(state).status);

  return (
    <Select
      mode="multiple"
      placeholder="Filter status"
      options={TASK_STATUS_OPTIONS}
      value={status}
      onChange={(values: TaskStatus[]) => dispatch(setFilter({ status: values }))}
      allowClear
    />
  );
};

export default StatusFilter;
