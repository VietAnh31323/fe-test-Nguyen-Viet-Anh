import { useMemo } from "react";
import { Table, Avatar, Space, Tag, Tooltip, Typography } from "antd";
import {
  CalendarOutlined,
  UserOutlined,
  WarningFilled,
} from "@ant-design/icons";
import type { ColumnsType } from "antd/es/table";
import dayjs from "dayjs";

import TaskActions from "./TaskActions";
import TaskPriorityTag from "./tags/TaskPriorityTag";
import TaskStatusSelect from "./TaskStatusSelect";
import { deleteTask, setPage } from "../../features/tasks/tasksSlice";
import { useAppDispatch } from "../../hooks/redux";
import type { Task } from "../../types/types";

interface Props {
  data: Task[];
  total: number;
  currentPage: number;
  pageSize: number;
  onEdit: (task: Task) => void;
  selectedRowKeys: React.Key[];
  onSelectChange: (selectedKeys: React.Key[]) => void;
  loading?: boolean;
}

const TaskTable = ({
  data,
  total,
  currentPage,
  pageSize,
  onEdit,
  selectedRowKeys,
  onSelectChange,
  loading = false,
}: Props) => {
  const dispatch = useAppDispatch();

  const columns = useMemo<ColumnsType<Task>>(
    () => [
      {
        title: "Tiêu đề",
        dataIndex: "title",
        width: 280,
        sorter: (a, b) => a.title.localeCompare(b.title),
        render: (title: string, record) => (
          <div>
            <Tooltip title={title}>
              <Typography.Text
                strong
                ellipsis
                style={{ display: "block", maxWidth: 240 }}
              >
                {title}
              </Typography.Text>
            </Tooltip>
            {record.tags && record.tags.length > 0 && (
              <Space size={4} wrap style={{ marginTop: 4 }}>
                {record.tags.map((tag) => (
                  <Tag key={tag} style={{ fontSize: 11, margin: 0 }}>
                    {tag}
                  </Tag>
                ))}
              </Space>
            )}
          </div>
        ),
      },
      {
        title: "Trạng thái",
        width: 160,
        render: (_, record) => (
          <TaskStatusSelect id={record.id} status={record.status} />
        ),
      },
      {
        title: "Độ ưu tiên",
        width: 120,
        align: "center",
        sorter: (a, b) => a.priority.localeCompare(b.priority),
        render: (_, record) => <TaskPriorityTag priority={record.priority} />,
      },
      {
        title: "Người được giao",
        dataIndex: "assignee",
        width: 180,
        render: (assignee?: string) =>
          assignee ? (
            <Space size={8}>
              <Avatar
                size={28}
                icon={<UserOutlined />}
                style={{ backgroundColor: "#4096ff", flexShrink: 0 }}
              />
              <Typography.Text>{assignee}</Typography.Text>
            </Space>
          ) : (
            <Typography.Text type="secondary">—</Typography.Text>
          ),
      },
      {
        title: "Hạn chót",
        dataIndex: "dueDate",
        width: 150,
        sorter: (a, b) =>
          new Date(a.dueDate || "").getTime() -
          new Date(b.dueDate || "").getTime(),
        render: (dueDate?: string) => {
          if (!dueDate)
            return <Typography.Text type="secondary">—</Typography.Text>;
          const isOverdue = dayjs(dueDate).isBefore(dayjs(), "day");
          return (
            <Space size={6}>
              <CalendarOutlined
                style={{ color: isOverdue ? "#ff4d4f" : "#8c8c8c" }}
              />
              <Typography.Text type={isOverdue ? "danger" : undefined}>
                {dayjs(dueDate).format("DD/MM/YYYY")}
              </Typography.Text>
              {isOverdue && (
                <Tooltip title="Đã quá hạn">
                  <WarningFilled style={{ color: "#ff4d4f" }} />
                </Tooltip>
              )}
            </Space>
          );
        },
      },
      {
        title: "Hành động",
        width: 100,
        align: "center",
        fixed: "right",
        render: (_, record) => (
          <TaskActions
            onEdit={() => onEdit(record)}
            onDelete={() => dispatch(deleteTask(record.id))}
          />
        ),
      },
    ],
    [dispatch, onEdit],
  );

  return (
    <Table
      rowKey="id"
      columns={columns}
      dataSource={data}
      size="middle"
      scroll={{ x: 980 }}
      loading={loading}
      rowSelection={{
        selectedRowKeys,
        onChange: onSelectChange,
      }}
      pagination={{
        current: currentPage,
        pageSize,
        total,
        showSizeChanger: false,
        showTotal: (total, range) => `${range[0]}–${range[1]} / ${total} tasks`,
        onChange: (page) => dispatch(setPage(page)),
      }}
      locale={{ emptyText: "Không có task nào" }}
    />
  );
};

export default TaskTable;
