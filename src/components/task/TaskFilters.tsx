import { Button, Card } from "antd";

import SearchFilter from "./SearchFilter";
import StatusFilter from "./StatusFilter";
import PriorityFilter from "./PriorityFilter";
import DateRangeFilter from "./DateRangeFilter";
import { useAppDispatch } from "../../hooks/redux";
import { resetFilters } from "../../features/tasks/tasksSlice";

const TaskFilters = () => {
  const dispatch = useAppDispatch();

  return (
    <Card className="mb-4">
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-4">
        <SearchFilter />

        <StatusFilter />

        <PriorityFilter />

        <DateRangeFilter />

        <Button onClick={() => dispatch(resetFilters())}>Xóa bộ lọc</Button>
      </div>
    </Card>
  );
};

export default TaskFilters;
