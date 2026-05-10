import { Form, Input, Select, DatePicker, type FormInstance } from "antd";

import { PRIORITY_OPTIONS, TASK_STATUS_OPTIONS } from "../../utils/task";

interface Props {
  form: FormInstance;
}

const TaskForm = ({ form }: Props) => {
  return (
    <Form
      form={form}
      layout="vertical"
    >
      <Form.Item
        label="Tiêu đề"
        name="title"
        rules={[
          {
            required: true,
            message: "Xin vui lòng nhập tiêu đề",
          },
        ]}
      >
        <Input placeholder="Enter title" />
      </Form.Item>

      <Form.Item label="Mô tả" name="description">
        <Input.TextArea rows={4} placeholder="Enter description" />
      </Form.Item>

      <Form.Item
        label="Trạng thái"
        name="status"
        rules={[
          {
            required: true,
            message: "Xin vui lòng chọn trạng thái",
          },
        ]}
      >
        <Select options={TASK_STATUS_OPTIONS} />
      </Form.Item>

      <Form.Item
        label="Mức độ ưu tiên"
        name="priority"
        rules={[
          {
            required: true,
            message: "Xin vui lòng chọn mức độ ưu tiên",
          },
        ]}
      >
        <Select options={PRIORITY_OPTIONS} />
      </Form.Item>

      <Form.Item label="Người được giao" name="assignee">
        <Input placeholder="Nhập người được giao" />
      </Form.Item>

      <Form.Item label="Hạn chót" name="dueDate">
        <DatePicker className="w-full" />
      </Form.Item>

      <Form.Item label="Tags" name="tags">
        <Select mode="tags" placeholder="Nhập tags" />
      </Form.Item>
    </Form>
  );
};

export default TaskForm;
