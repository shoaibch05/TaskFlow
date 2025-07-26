import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";

export default function InviteModal({ isOpen, onClose, onInvite, boards }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("Member");
  const [selectedBoards, setSelectedBoards] = useState([]);

  const toggleBoard = (boardId) => {
    setSelectedBoards(
      (prev) =>
        prev.includes(boardId)
          ? prev.filter((id) => id !== boardId) // Remove if exists
          : [...prev, boardId] // Add if not exists
    );
  };

  const handleSubmit = () => {
    if (selectedBoards.length === 0) {
      alert("Please select at least one board.");
      return;
    }

    onInvite({ name, email, role, boards: selectedBoards });
    // Reset state
    setName("");
    setEmail("");
    setRole("Member");
    setSelectedBoards([]);
    onClose();
  };

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
            <Dialog.Panel className="w-full max-w-md bg-white dark:bg-gray-800 rounded-lg p-6">
              <Dialog.Title className="text-lg font-medium text-gray-900 dark:text-white">
                Invite a New Member
              </Dialog.Title>

              {/* Name */}
              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full mt-1 p-2 rounded border dark:bg-gray-700 dark:text-white"
                />
              </div>

              {/* Email */}
              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full mt-1 p-2 rounded border dark:bg-gray-700 dark:text-white"
                />
              </div>

              {/* Role */}
              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Role
                </label>
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="w-full mt-1 p-2 rounded border dark:bg-gray-700 dark:text-white"
                >
                  <option>Admin</option>
                  <option>Member</option>
                </select>
              </div>

              {/* Board selection */}
              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Assign to Boards
                </label>
                <div className="mt-2 space-y-2 max-h-40 overflow-y-auto">
                  {boards.map((board) => (
                    <label
                      key={board.id}
                      className="flex items-center space-x-2 text-sm text-gray-800 dark:text-gray-200"
                    >
                      <input
                        type="checkbox"
                        checked={selectedBoards.includes(board.id)}
                        onChange={() => toggleBoard(board.id)}
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700"
                      />
                      <span>{board.title}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Buttons */}
              <div className="mt-6 flex justify-end gap-3">
                <button
                  onClick={onClose}
                  className="px-4 py-2 bg-gray-300 dark:bg-gray-600 rounded"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSubmit}
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  Invite
                </button>
              </div>
            </Dialog.Panel>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
