import { Tag } from "antd";
import { getPriorityColor } from "../../utils/task";

interface Props {
  priority: string;
}

const TaskPriorityTag = ({ priority }: Props) => {
  return <Tag color={getPriorityColor(priority)}>{priority.toUpperCase()}</Tag>;
};

export default TaskPriorityTag;
