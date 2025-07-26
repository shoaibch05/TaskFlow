import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState, useEffect } from "react";

export default function TaskModal({
  isOpen,
  onClose,
  initialTask,
  onSave,
  onDelete,
}) {
  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState("Medium");

  // Sync props with state when editing
  useEffect(() => {
    if (initialTask) {
      setTitle(initialTask.title || "");
      setPriority(initialTask.priority || "Medium");
    } else {
      setTitle("");
      setPriority("Medium");
    }
  }, [initialTask]);

  function handleSave() {
    const taskData = {
      id: initialTask?.id || Date.now(),
      title,
      priority,
    };
    onSave(taskData);
    onClose();
  }

  function handleDelete() {
    if (initialTask && onDelete) {
      onDelete(initialTask.id);
    }
    onClose();
  }

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          leave="ease-in duration-200"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/50" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              leave="ease-in duration-200"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 dark:bg-gray-800 text-left align-middle shadow-xl transition-all">
                <Dialog.Title className="text-lg font-medium text-gray-900 dark:text-white">
                  {initialTask ? "Edit Task" : "Add Task"}
                </Dialog.Title>

                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Title
                  </label>
                  <input
                    type="text"
                    className="w-full mt-1 p-2 rounded-md border dark:bg-gray-700 dark:text-white"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>

                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Priority
                  </label>
                  <select
                    className="w-full mt-1 p-2 rounded-md border dark:bg-gray-700 dark:text-white"
                    value={priority}
                    onChange={(e) => setPriority(e.target.value)}
                  >
                    <option>High</option>
                    <option>Medium</option>
                    <option>Low</option>
                  </select>
                </div>

                <div className="mt-6 flex justify-between items-center">
                  {initialTask && (
                    <button
                      onClick={handleDelete}
                      className="text-sm text-red-500 hover:underline"
                    >
                      Delete
                    </button>
                  )}
                  <div className="flex gap-2">
                    <button
                      onClick={onClose}
                      className="px-4 py-2 rounded bg-gray-300 dark:bg-gray-600 text-black dark:text-white"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleSave}
                      className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
                    >
                      Save
                    </button>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
