import { Select } from "antd";
import type { TaskStatus } from "../../types/types";
import { useAppDispatch } from "../../hooks/redux";
import { updateTaskStatus } from "../../features/tasks/tasksSlice";
import { TASK_STATUS_OPTIONS, STATUS_COLOR_MAP } from "../../utils/task";

interface Props {
  id: string;
  status: TaskStatus;
}

const StatusDot = ({ color }: { color: string }) => (
  <span
    style={{
      display: "inline-block",
      width: 8,
      height: 8,
      borderRadius: "50%",
      backgroundColor: color,
      marginRight: 8,
      flexShrink: 0,
    }}
  />
);

const TaskStatusSelect = ({ id, status }: Props) => {
  const dispatch = useAppDispatch();
  const handleChange = (value: TaskStatus) => {
    dispatch(updateTaskStatus({ id, status: value }));
  };

  return (
    <Select
      value={status}
      onChange={handleChange}
      style={{ width: 140 }}
      styles={{
        popup: { root: { minWidth: 140 } },
      }}
      optionRender={(option) => {
        const c =
          STATUS_COLOR_MAP[option.value as string] ?? STATUS_COLOR_MAP["todo"];
        return (
          <span style={{ display: "flex", alignItems: "center" }}>
            <StatusDot color={c.dot} />
            {option.label}
          </span>
        );
      }}
      labelRender={(props) => {
        const c =
          STATUS_COLOR_MAP[props.value as string] ?? STATUS_COLOR_MAP["todo"];
        const opt = TASK_STATUS_OPTIONS.find((o) => o.value === props.value);
        return (
          <span
            style={{
              display: "inline-flex",
              alignItems: "center",
              width: "100%",
              margin: "-1px -11px",
              padding: "0 11px",
              borderRadius: 6,
            }}
          >
            <StatusDot color={c.dot} />
            <span style={{ color: c.dot, fontWeight: 500 }}>
              {opt?.label ?? props.label}
            </span>
          </span>
        );
      }}
      options={TASK_STATUS_OPTIONS}
    />
  );
};

export default TaskStatusSelect;
