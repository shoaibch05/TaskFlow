import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useEffect, useState } from "react";
import { fetchBoardMembers } from "../../api/team";
export default function UserDetailModal({ user, onClose }) {
  const [memberships, setMemberships] = useState([]);
  useEffect(() => {
    fetchBoardMembers(user.userId._id)
      .then(setMemberships)
      .catch(console.error);
  }, [user]);

  return (
    <Transition appear show={!!user} as={Fragment}>
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
              <Dialog.Panel className="w-full max-w-md bg-white dark:bg-gray-800 p-6 rounded-lg shadow-xl">
                <Dialog.Title className="text-xl font-bold mb-4 dark:text-white">
                  User Details
                </Dialog.Title>
                <p className="text-gray-700 dark:text-gray-300">
                  <strong>Name:</strong> {user.userId.name}
                </p>
                <p className="text-gray-700 dark:text-gray-300">
                  <strong>Email:</strong> {user.userId.email}
                </p>
                <div className="mt-4">
                  <strong className="dark:text-gray-300">Boards:</strong>
                  <ul className="list-disc list-inside text-gray-600 dark:text-gray-300">
                    {memberships.map((m) => (
                      <li
                        key={m.boardId}
                        className="text-gray-600 dark:text-gray-300"
                      >
                        {m.boardTitle}{" "}
                        <span className="text-sm">({m.role})</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="mt-6 flex justify-end">
                  <button
                    onClick={onClose}
                    className="bg-blue-600 text-white px-4 py-2 rounded"
                  >
                    Close
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
