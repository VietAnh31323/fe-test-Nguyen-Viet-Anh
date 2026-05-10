import { Tag, theme } from "antd";
import { UserOutlined, InboxOutlined } from "@ant-design/icons";
import { useAppSelector } from "../../hooks/redux";
import { selectAllTasks } from "../../features/tasks/selectors";
import { getPriorityColor, getStatusColor } from "../../utils/task";
import { formatStatus } from "../../utils/format";

const { useToken } = theme;

const AVATAR_COLORS = ["#6366f1", "#f59e0b", "#10b981", "#3b82f6", "#ec4899"];

const RecentTasks = () => {
  const tasks = useAppSelector(selectAllTasks);
  const { token } = useToken();

  const recentTasks = [...tasks]
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    )
    .slice(0, 5);

  return (
    <div
      className="rounded-xl shadow-sm"
      style={{
        background: token.colorBgContainer,
        border: `1px solid ${token.colorBorderSecondary}`,
      }}
    >
      <div
        className="px-6 py-4 flex items-center justify-between"
        style={{ borderBottom: `1px solid ${token.colorBorderSecondary}` }}
      >
        <h3
          className="text-base font-semibold m-0"
          style={{ color: token.colorText }}
        >
          Recent Tasks
        </h3>
        <span className="text-xs" style={{ color: token.colorTextQuaternary }}>
          {recentTasks.length} tasks
        </span>
      </div>

      {recentTasks.length === 0 ? (
        <div
          className="flex flex-col items-center justify-center py-12"
          style={{ color: token.colorTextQuaternary }}
        >
          <InboxOutlined style={{ fontSize: 40, marginBottom: 8 }} />
          <p className="m-0 text-sm">No tasks yet</p>
        </div>
      ) : (
        <ul className="m-0 p-0 list-none">
          {recentTasks.map((task, idx) => (
            <li
              key={task.id}
              className="px-6 py-3.5 flex items-center gap-4"
              style={{
                borderBottom:
                  idx < recentTasks.length - 1
                    ? `1px solid ${token.colorBorderSecondary}`
                    : "none",
              }}
            >
              <div
                className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 text-white text-sm font-semibold"
                style={{
                  background: AVATAR_COLORS[idx % AVATAR_COLORS.length],
                }}
              >
                {task.assignee ? (
                  task.assignee.charAt(0).toUpperCase()
                ) : (
                  <UserOutlined style={{ fontSize: 14 }} />
                )}
              </div>

              <div className="flex-1 min-w-0">
                <p
                  className="font-medium m-0 truncate"
                  style={{ color: token.colorText }}
                >
                  {task.title}
                </p>
                <p
                  className="text-xs m-0"
                  style={{ color: token.colorTextSecondary }}
                >
                  {task.assignee}
                </p>
              </div>

              <div className="flex gap-2 flex-shrink-0">
                <Tag color={getStatusColor(task.status)} className="m-0">
                  {formatStatus(task.status)}
                </Tag>
                <Tag
                  color={getPriorityColor(task.priority)}
                  className="m-0 capitalize"
                >
                  {task.priority}
                </Tag>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default RecentTasks;
