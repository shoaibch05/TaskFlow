import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";

export default function CreateBoardModal({ isOpen, onClose, onCreate }) {
  const [title, setTitle] = useState("");
  const [color, setColor] = useState("bg-blue-500");

  const handleSubmit = () => {
    if (title.trim()) {
      onCreate({ title, color });
      setTitle("");
      setColor("bg-blue-500");
      onClose();
    }
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-40" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white dark:bg-gray-900 p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900 dark:text-white"
                >
                  Create New Board
                </Dialog.Title>

                <div className="mt-4 space-y-4">
                  <input
                    type="text"
                    placeholder="Board Title"
                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-500 dark:bg-gray-800 dark:text-white"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                  <select
                    value={color}
                    onChange={(e) => setColor(e.target.value)}
                    className="w-full px-3 py-2 border rounded-md focus:outline-none dark:bg-gray-800 dark:text-white"
                  >
                    <option value="bg-blue-500">Blue</option>
                    <option value="bg-green-500">Green</option>
                    <option value="bg-yellow-500">Yellow</option>
                    <option value="bg-red-500">Red</option>
                    <option value="bg-pink-400">Pink</option>
                  </select>
                </div>

                <div className="mt-6 flex justify-end space-x-2">
                  <button
                    onClick={onClose}
                    className="px-4 py-2 text-sm rounded bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSubmit}
                    className="px-4 py-2 text-sm rounded bg-blue-500 text-white hover:bg-blue-600"
                  >
                    Create
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
