// src/components/BoardView.jsx
import { useState, useEffect } from "react";
import { useSearch } from "../context/searchContext"; // ← import the search hook
import TaskModal from "./SmallComponents/TaskModel";
import ColumnModal from "./SmallComponents/ColumnModel";
import { toast } from "react-toastify";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import TaskCard from "./SmallComponents/TaskCard";
import {
  createTask,
  deleteTask,
  getTasks,
  updateTask,
  updateTaskStatus,
} from "../api/tasks";
import { addColumn } from "../api/boards";

export const BoardView = ({ board }) => {
  const { searchTerm } = useSearch(); // ← get the current search term
  const [columns, setColumns] = useState([]);
  const [showTaskModal, setShowTaskModal] = useState(false);
  const [showColumnModal, setShowColumnModal] = useState(false);
  const [selectedColumn, setSelectedColumn] = useState(null);
  const [selectedTask, setSelectedTask] = useState(null);
  const [loading, setLoading] = useState(true);

  // 1) Fetch + group tasks when board changes
  useEffect(() => {
    if (!board) return;

    async function fetchTasks() {
      const token = localStorage.getItem("token");
      if (!token) return;

      try {
        setLoading(true);
        const data = await getTasks(board._id, token);
        const groupedColumns = board.columns.map((col) => ({
          id: Date.now() + Math.random(), // same as your original
          title: col,
          tasks: data.filter((task) => task.status === col),
        }));
        setColumns(groupedColumns);
      } catch (err) {
        console.error("Failed to fetch tasks", err);
      } finally {
        setLoading(false);
      }
    }

    fetchTasks();
  }, [board]);

  // Your existing handlers, unchanged:
  const handleAddColumn = (title) => {
    const newCol = { id: Date.now(), title, tasks: [] };
    setColumns((prev) => [...prev, newCol]);
  };

  const handleAddTask = (columnId, task) => {
    setColumns((prev) =>
      prev.map((col) =>
        col.id === columnId ? { ...col, tasks: [...col.tasks, task] } : col
      )
    );
  };

  const handleEditTask = (columnId, updatedTask) => {
    setColumns((prev) =>
      prev.map((col) =>
        col.id === columnId
          ? {
              ...col,
              tasks: col.tasks.map((t) =>
                t._id === updatedTask._id ? updatedTask : t
              ),
            }
          : col
      )
    );
  };

  const handleDeleteTask = (columnId, taskId) => {
    setColumns((prev) =>
      prev.map((col) =>
        col.id === columnId
          ? { ...col, tasks: col.tasks.filter((t) => t._id !== taskId) }
          : col
      )
    );
  };

  const onDragEnd = async (result) => {
    const { source, destination } = result;
    if (!destination) return;

    // same as before
    const srcIdx = columns.findIndex(
      (col) => col.id.toString() === source.droppableId
    );
    const destIdx = columns.findIndex(
      (col) => col.id.toString() === destination.droppableId
    );
    const sourceCol = columns[srcIdx];
    const destCol = columns[destIdx];
    const [movedTask] = sourceCol.tasks.splice(source.index, 1);
    destCol.tasks.splice(destination.index, 0, movedTask);

    const newCols = [...columns];
    newCols[srcIdx] = { ...sourceCol };
    newCols[destIdx] = { ...destCol };
    setColumns(newCols);

    if (sourceCol.title !== destCol.title) {
      const token = localStorage.getItem("token");
      try {
        await updateTaskStatus(movedTask._id, destCol.title, token);
      } catch (err) {
        console.error("Failed to update task status", err);
      }
    }
  };

  if (!board) {
    return <h2 className="text-white p-4">Board not found</h2>;
  }
  if (loading) {
    return <h2 className="text-white p-4">Loading tasks...</h2>;
  }

  // Lowercase query for filtering
  const q = searchTerm.trim().toLowerCase();

  return (
    <>
      <h1 className="text-xl font-bold text-white mb-6">{board.title} Board</h1>

      <DragDropContext onDragEnd={onDragEnd}>
        <div className="p-6 overflow-x-auto flex flex-wrap gap-4">
          {columns.map((col) => (
            <Droppable droppableId={col.id.toString()} key={col.id}>
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className="min-w-[16rem] bg-gray-100 dark:bg-gray-700 p-4 rounded shadow"
                >
                  <h3 className="font-semibold text-gray-800 dark:text-white mb-3">
                    {col.title}
                  </h3>

                  <div className="space-y-2">
                    {/* only tasks matching the searchTerm */}
                    {col.tasks
                      .filter(
                        (t) =>
                          t.title.toLowerCase().includes(q) ||
                          (t.description || "").toLowerCase().includes(q)
                      )
                      .map((task, index) => (
                        <Draggable
                          key={task._id}
                          draggableId={task._id.toString()}
                          index={index}
                        >
                          {(dragProv) => (
                            <div
                              ref={dragProv.innerRef}
                              {...dragProv.draggableProps}
                              {...dragProv.dragHandleProps}
                            >
                              <TaskCard
                                task={task}
                                onClick={() => {
                                  setSelectedColumn(col.id);
                                  setSelectedTask(task);
                                  setShowTaskModal(true);
                                }}
                              />
                            </div>
                          )}
                        </Draggable>
                      ))}
                    {provided.placeholder}
                  </div>

                  <button
                    onClick={() => {
                      setSelectedColumn(col.id);
                      setSelectedTask(null);
                      setShowTaskModal(true);
                    }}
                    className="mt-4 text-blue-600 dark:text-blue-400 hover:underline"
                  >
                    + Add Task
                  </button>
                </div>
              )}
            </Droppable>
          ))}

          <button
            className="min-w-[16rem] h-fit self-start text-blue-500 font-semibold mt-4"
            onClick={() => setShowColumnModal(true)}
          >
            + Add Column
          </button>
        </div>
      </DragDropContext>

      {/* Task Modal */}
      <TaskModal
        isOpen={showTaskModal}
        onClose={() => setShowTaskModal(false)}
        initialTask={selectedTask}
        onSave={async (taskData) => {
          const token = localStorage.getItem("token");
          if (!selectedTask) {
            const newTask = await createTask(
              { ...taskData, board: board._id },
              token
            );
            handleAddTask(selectedColumn, newTask);
          } else {
            const updated = await updateTask(selectedTask._id, taskData, token);
            handleEditTask(selectedColumn, updated);
            toast.success("Task updated");
          }
          setShowTaskModal(false);
        }}
        onDelete={async () => {
          const token = localStorage.getItem("token");
          await deleteTask(selectedTask._id, token);
          handleDeleteTask(selectedColumn, selectedTask._id);
          toast.success("Task deleted");
          setShowTaskModal(false);
        }}
      />

      {/* Column Modal */}
      <ColumnModal
        isOpen={showColumnModal}
        onClose={() => setShowColumnModal(false)}
        onSave={async (title) => {
          const token = localStorage.getItem("token");
          await addColumn(board._id, title, token);
          handleAddColumn(title);
          toast.success("Column added!");
          setShowColumnModal(false);
        }}
      />
    </>
  );
};
