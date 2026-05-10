import { DatePicker } from "antd";
import type { RangePickerProps } from "antd/es/date-picker";
import dayjs from "dayjs";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux";
import { setFilter } from "../../../features/tasks/tasksSlice";
import { selectFilters } from "../../../features/tasks/selectors";

const { RangePicker } = DatePicker;

const DateRangeFilter = () => {
  const dispatch = useAppDispatch();
  const dateRange = useAppSelector((state) => selectFilters(state).dateRange);

  const value = dateRange
    ? ([dayjs(dateRange[0]), dayjs(dateRange[1])] as [dayjs.Dayjs, dayjs.Dayjs])
    : null;

  const handleChange = (
    dates: Parameters<NonNullable<RangePickerProps["onChange"]>>[0],
  ) => {
    if (!dates) {
      dispatch(setFilter({ dateRange: undefined }));
      return;
    }

    dispatch(
      setFilter({
        dateRange: [
          dayjs(dates[0]).format("YYYY-MM-DD"),
          dayjs(dates[1]).format("YYYY-MM-DD"),
        ],
      }),
    );
  };

  return (
    <RangePicker value={value} onChange={handleChange} className="w-full" />
  );
};

export default DateRangeFilter;
