import { useState, useEffect } from "react";

import { Button, Card } from "antd";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import {
  selectFilteredTasks,
  selectPaginatedTasks,
  selectPagination,
} from "../../features/tasks/selectors";
import type { Task } from "../../types/types";
import { deleteManyTasks } from "../../features/tasks/tasksSlice";
import TaskTable from "../../components/task/TaskTable";
import TaskModal from "../../components/task/TaskModal";
import TaskFilters from "../../components/task/filters/TaskFilters";

const TasksPage = () => {
  const dispatch = useAppDispatch();

  const tasks = useAppSelector(selectPaginatedTasks);

  const filteredTasks = useAppSelector(selectFilteredTasks);

  const pagination = useAppSelector(selectPagination);

  const [isLoading, setIsLoading] = useState(true);
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setIsLoading(false), 1200);
    return () => clearTimeout(t);
  }, []);

  const [editingTask, setEditingTask] = useState<Task | null>(null);

  const handleAdd = () => {
    setEditingTask(null);

    setOpenModal(true);
  };

  const handleEdit = (task: Task) => {
    setEditingTask(task);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);

    setEditingTask(null);
  };

  const handleDeleteMany = () => {
    dispatch(deleteManyTasks(selectedRowKeys as string[]));

    setSelectedRowKeys([]);
  };

  return (
    <Card>
      <div className="flex items-center gap-4 mb-4">
        <div className="flex-1 w-full">
          <TaskFilters />
        </div>

        <div className="flex items-center gap-2 shrink-0">
          {selectedRowKeys.length > 0 && (
            <Button danger onClick={handleDeleteMany}>
              Xóa ({selectedRowKeys.length})
            </Button>
          )}
          <Button type="primary" onClick={handleAdd}>
            Thêm mới
          </Button>
        </div>
      </div>

      <TaskTable
        data={tasks}
        total={filteredTasks.length}
        currentPage={pagination.currentPage}
        pageSize={pagination.pageSize}
        onEdit={handleEdit}
        selectedRowKeys={selectedRowKeys}
        onSelectChange={setSelectedRowKeys}
        loading={isLoading}
      />

      <TaskModal
        open={openModal}
        onClose={handleCloseModal}
        editingTask={editingTask}
      />
    </Card>
  );
};

export default TasksPage;
