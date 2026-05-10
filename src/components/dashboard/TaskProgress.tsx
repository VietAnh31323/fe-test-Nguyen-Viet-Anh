import { Progress } from "antd";
import { useAppSelector } from "../../hooks/redux";
import { selectTaskStats } from "../../features/tasks/selectors";

const BREAKDOWN = [
  { label: "Todo", key: "todo" as const, color: "#f59e0b", bg: "#fffbeb" },
  { label: "In Progress", key: "inProgress" as const, color: "#3b82f6", bg: "#eff6ff" },
  { label: "Done", key: "done" as const, color: "#10b981", bg: "#ecfdf5" },
];

const TaskProgress = () => {
  const stats = useAppSelector(selectTaskStats);

  const percent =
    stats.total === 0 ? 0 : Math.round((stats.done / stats.total) * 100);

  return (
    <div
      className="rounded-xl p-6 shadow-sm"
      style={{ background: "#fff", border: "1px solid #e5e7eb" }}
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-base font-semibold text-gray-800 m-0">
          Task Completion
        </h3>
        <span
          className="text-2xl font-bold"
          style={{ color: "#6366f1" }}
        >
          {percent}%
        </span>
      </div>

      <Progress
        percent={percent}
        strokeColor={{ "0%": "#6366f1", "100%": "#10b981" }}
        strokeWidth={10}
        showInfo={false}
      />

      <div className="mt-5 space-y-3">
        {BREAKDOWN.map((item) => {
          const itemPercent =
            stats.total === 0
              ? 0
              : Math.round((stats[item.key] / stats.total) * 100);
          return (
            <div key={item.key} className="flex items-center gap-3">
              <div
                className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                style={{ background: item.color }}
              />
              <span className="text-sm text-gray-600 w-24">{item.label}</span>
              <div className="flex-1 bg-gray-100 rounded-full h-2 overflow-hidden">
                <div
                  className="h-2 rounded-full transition-all duration-500"
                  style={{ width: `${itemPercent}%`, background: item.color }}
                />
              </div>
              <span
                className="text-sm font-semibold w-6 text-right"
                style={{ color: item.color }}
              >
                {stats[item.key]}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TaskProgress;
