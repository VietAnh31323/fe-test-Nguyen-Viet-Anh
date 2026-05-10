import {
  UnorderedListOutlined,
  ClockCircleOutlined,
  SyncOutlined,
  CheckCircleOutlined,
} from "@ant-design/icons";
import { selectTaskStats } from "../../features/tasks/selectors";
import { useAppSelector } from "../../hooks/redux";

const STAT_CONFIG = [
  {
    title: "Total Tasks",
    key: "total" as const,
    icon: <UnorderedListOutlined style={{ fontSize: 24 }} />,
    gradient: "linear-gradient(135deg, #6366f1 0%, #818cf8 100%)",
    bg: "#eef2ff",
    textColor: "#4338ca",
  },
  {
    title: "Todo",
    key: "todo" as const,
    icon: <ClockCircleOutlined style={{ fontSize: 24 }} />,
    gradient: "linear-gradient(135deg, #f59e0b 0%, #fbbf24 100%)",
    bg: "#fffbeb",
    textColor: "#b45309",
  },
  {
    title: "In Progress",
    key: "inProgress" as const,
    icon: <SyncOutlined style={{ fontSize: 24 }} />,
    gradient: "linear-gradient(135deg, #3b82f6 0%, #60a5fa 100%)",
    bg: "#eff6ff",
    textColor: "#1d4ed8",
  },
  {
    title: "Done",
    key: "done" as const,
    icon: <CheckCircleOutlined style={{ fontSize: 24 }} />,
    gradient: "linear-gradient(135deg, #10b981 0%, #34d399 100%)",
    bg: "#ecfdf5",
    textColor: "#065f46",
  },
];

const StatsCards = () => {
  const stats = useAppSelector(selectTaskStats);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
      {STAT_CONFIG.map((item) => (
        <div
          key={item.title}
          className="rounded-xl p-5 flex items-center gap-4 shadow-sm"
          style={{ background: "#fff", border: "1px solid #e5e7eb" }}
        >
          <div
            className="w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0"
            style={{ background: item.gradient, color: "#fff" }}
          >
            {item.icon}
          </div>
          <div>
            <p className="text-gray-500 text-sm m-0">{item.title}</p>
            <p
              className="text-3xl font-bold m-0 leading-tight"
              style={{ color: item.textColor }}
            >
              {stats[item.key]}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StatsCards;
