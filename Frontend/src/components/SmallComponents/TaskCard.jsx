import React from "react";
import { FaGripLines } from "react-icons/fa";

const priorityColors = {
  High: "border-red-500",
  Medium: "border-amber-500",
  Low: "border-green-500",
};

const TaskCard = ({ task, onClick }) => {
  return (
    <div
      className={`bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 p-3 rounded shadow-md border-l-4 ${
        priorityColors[task.priority] || "border-gray-300"
      } cursor-pointer hover:shadow-lg transition`}
      onClick={() => onClick(task)}
    >
      <div className="flex items-start justify-between">
        <h4 className="font-semibold text-sm">{task.title}</h4>
        <FaGripLines className="text-gray-400 mt-1" />
      </div>
      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
        Priority: {task.priority}
      </p>
    </div>
  );
};

export default TaskCard;
