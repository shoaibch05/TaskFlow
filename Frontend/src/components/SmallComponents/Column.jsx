import { useState } from "react";
import TaskModal from "./TaskModel";
import TaskCard from "./TaskCard";

export const Column = ({
  title,
  tasks,
  onAddTask,
  onEditTask,
  onDeleteTask,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);

  const openAddModal = () => {
    setSelectedTask(null);
    setIsModalOpen(true);
  };

  const openEditModal = (task) => {
    setSelectedTask(task);
    setIsModalOpen(true);
  };

  const handleSave = (taskData) => {
    if (selectedTask) {
      onEditTask(taskData);
    } else {
      onAddTask(taskData);
    }
  };

  return (
    <div className="min-w-[16rem] bg-gray-100 dark:bg-gray-700 p-4 rounded shadow">
      <h3 className="font-semibold text-gray-800 dark:text-white mb-3">
        {title}
      </h3>

      <div className="space-y-2">
        {tasks.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            onClick={() => openEditModal(task)}
          />
        ))}
      </div>

      <button
        onClick={openAddModal}
        className="mt-4 text-blue-600 dark:text-blue-400 hover:underline"
      >
        + Add Task
      </button>

      <TaskModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        initialTask={selectedTask}
        onSave={handleSave}
        onDelete={onDeleteTask}
      />
    </div>
  );
};
