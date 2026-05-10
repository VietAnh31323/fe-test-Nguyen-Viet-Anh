import { Form, Input, Select, DatePicker, type FormInstance } from "antd";

import dayjs from "dayjs";
import type { Task } from "../../types/types";
import { PRIORITY_OPTIONS, TASK_STATUS_OPTIONS } from "../../utils/task";

interface Props {
  form: FormInstance;
  initialValues?: Task | null;
}

const TaskForm = ({ form, initialValues }: Props) => {
  return (
    <Form
      form={form}
      layout="vertical"
      initialValues={{
        ...initialValues,

        dueDate: initialValues?.dueDate
          ? dayjs(initialValues.dueDate)
          : undefined,
      }}
    >
      <Form.Item
        label="Title"
        name="title"
        rules={[
          {
            required: true,
            message: "Please input title",
          },
        ]}
      >
        <Input placeholder="Enter title" />
      </Form.Item>

      <Form.Item label="Description" name="description">
        <Input.TextArea rows={4} placeholder="Enter description" />
      </Form.Item>

      <Form.Item
        label="Status"
        name="status"
        rules={[
          {
            required: true,
            message: "Please select status",
          },
        ]}
      >
        <Select options={TASK_STATUS_OPTIONS} />
      </Form.Item>

      <Form.Item
        label="Priority"
        name="priority"
        rules={[
          {
            required: true,
            message: "Please select priority",
          },
        ]}
      >
        <Select options={PRIORITY_OPTIONS} />
      </Form.Item>

      <Form.Item label="Assignee" name="assignee">
        <Input placeholder="Enter assignee" />
      </Form.Item>

      <Form.Item label="Due Date" name="dueDate">
        <DatePicker className="w-full" />
      </Form.Item>

      <Form.Item label="Tags" name="tags">
        <Select mode="tags" placeholder="Enter tags" />
      </Form.Item>
    </Form>
  );
};

export default TaskForm;
