import { useEffect } from "react";
import { Modal, Form } from "antd";

import dayjs from "dayjs";

import { v4 as uuidv4 } from "uuid";

import TaskForm from "./TaskForm";
import { useAppDispatch } from "../../hooks/redux";
import type { Task } from "../../types/types";
import { addTask, updateTask } from "../../features/tasks/tasksSlice";

interface Props {
  open: boolean;
  onClose: () => void;
  editingTask?: Task | null;
}

const TaskModal = ({ open, onClose, editingTask }: Props) => {
  const dispatch = useAppDispatch();

  const [form] = Form.useForm();

  useEffect(() => {
    if (open && editingTask) {
      form.setFieldsValue({
        ...editingTask,
        dueDate: editingTask.dueDate ? dayjs(editingTask.dueDate) : undefined,
      });
    } else {
      form.resetFields();
    }
  }, [open, editingTask, form]);

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();

      const payload: Task = {
        id: editingTask?.id || uuidv4(),

        title: values.title,

        description: values.description,

        status: values.status,

        priority: values.priority,

        assignee: values.assignee,

        dueDate: values.dueDate
          ? dayjs(values.dueDate).format("YYYY-MM-DD")
          : undefined,

        createdAt: editingTask?.createdAt || new Date().toISOString(),

        tags: values.tags || [],
      };

      if (editingTask) {
        dispatch(updateTask(payload));
      } else {
        dispatch(addTask(payload));
      }

      form.resetFields();

      onClose();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Modal
      open={open}
      title={editingTask ? "Chỉnh sửa Task" : "Thêm Task"}
      onCancel={onClose}
      onOk={handleSubmit}
    >
      <TaskForm form={form} />
    </Modal>
  );
};

export default TaskModal;
