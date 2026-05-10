import { Input } from "antd";
import { setFilter } from "../../features/tasks/tasksSlice";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { selectFilters } from "../../features/tasks/selectors";

const SearchFilter = () => {
  const dispatch = useAppDispatch();
  const searchText = useAppSelector((state) => selectFilters(state).searchText);

  return (
    <Input.Search
      placeholder="Search task title..."
      value={searchText}
      onChange={(e) => dispatch(setFilter({ searchText: e.target.value }))}
      allowClear
    />
  );
};

export default SearchFilter;
