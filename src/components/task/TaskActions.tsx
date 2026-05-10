import { Button, Popconfirm, Space, Tooltip } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";

interface Props {
  onEdit: () => void;
  onDelete: () => void;
}

const TaskActions = ({ onEdit, onDelete }: Props) => {
  return (
    <Space size={4}>
      <Tooltip title="Chỉnh sửa">
        <Button
          type="text"
          icon={<EditOutlined />}
          onClick={onEdit}
          style={{ color: "#4096ff" }}
        />
      </Tooltip>

      <Popconfirm
        title="Xóa task"
        description="Bạn có chắc chắn muốn xóa task này không?"
        onConfirm={onDelete}
        okText="Xóa"
        cancelText="Hủy"
        okButtonProps={{ danger: true }}
      >
        <Tooltip title="Xóa">
          <Button
            type="text"
            icon={<DeleteOutlined />}
            danger
          />
        </Tooltip>
      </Popconfirm>
    </Space>
  );
};

export default TaskActions;
