import { Tag } from "antd";
import { getStatusColor } from "../../utils/task";
import { formatStatus } from "../../utils/format";

interface Props {
  status: string;
}

const TaskStatusTag = ({ status }: Props) => {
  return <Tag color={getStatusColor(status)}>{formatStatus(status)}</Tag>;
};

export default TaskStatusTag;
