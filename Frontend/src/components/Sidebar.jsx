import React, { useState } from "react";
import CreateBoardModal from "./SmallComponents/CreateBoardModal";
import {
  IoHomeSharp,
  IoLogOutOutline,
  IoPeopleSharp,
  IoSettingsSharp,
} from "react-icons/io5";
import { IoMdAdd } from "react-icons/io";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { createBoard } from "../api/boards";

const Sidebar = ({ isOpen, onClose }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const createBoardOpen = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  function handleLogout() {
    localStorage.removeItem("token");
    window.location.href = "/login";
  }

  const handleSetting = () =>
    toast.info("Sorry! Setting is Yet to be implemented");

  // ✅ Handle Create Board from Sidebar (independent of Dashboard)
  const handleSidebarCreate = async (boardData) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("You must be logged in");
        return;
      }
      await createBoard(boardData, token);
      toast.success("Board created successfully!");
      closeModal();
    } catch (err) {
      console.error(err);
      toast.error("Failed to create board");
    }
  };

  return (
    <>
      {/* Overlay for mobile */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-40 z-40 md:hidden transition-opacity ${
          isOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={onClose}
      ></div>

      {/* Sidebar content */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-gray-800 text-white flex flex-col md:h-[95vh] md:justify-between md:py-10 py-20 z-40 transform transition-transform duration-300
        ${isOpen ? "translate-x-0" : "-translate-x-full"} 
        md:static md:translate-x-0 md:w-52`}
      >
        {/* Top links */}
        <div className="itemsList flex flex-col gap-6 w-5/6 mx-auto">
          <li className="flex border-b-2 border-blue-500 rounded-md hover:bg-gray-500 py-3">
            <Link to="/" onClick={onClose}>
              <div className="flex pl-8 gap-2 items-center">
                <IoHomeSharp /> Home
              </div>
            </Link>
          </li>
          <li
            className="flex border-b-2 border-blue-500 rounded-md hover:bg-gray-500 py-3"
            onClick={() => {
              createBoardOpen();
              onClose();
            }}
          >
            <div className="flex pl-7 gap-2 items-center">
              <IoMdAdd /> Create Board
            </div>
          </li>
          <li className="flex border-b-2 border-blue-500 rounded-md hover:bg-gray-500 py-3">
            <Link to="/people" onClick={onClose}>
              <div className="flex pl-7 gap-2 items-center">
                <IoPeopleSharp /> Manage Peoples
              </div>
            </Link>
          </li>
        </div>

        {/* Bottom links */}
        <div className="itemsLast w-5/6 flex flex-col gap-1 mx-auto">
          <li
            className="flex border-b-2 border-blue-500 rounded-md hover:bg-gray-500 py-3"
            onClick={handleSetting}
          >
            <div className="flex pl-7 gap-2 items-center">
              <IoSettingsSharp /> Setting
            </div>
          </li>
          <li
            className="flex border-b-2 border-blue-500 rounded-md hover:bg-gray-500 py-3"
            onClick={handleLogout}
          >
            <div className="pl-7 flex gap-2 items-center">
              <IoLogOutOutline /> Logout
            </div>
          </li>
        </div>

        {/* Modal for creating board */}
        <CreateBoardModal
          isOpen={isModalOpen}
          onClose={closeModal}
          onCreate={handleSidebarCreate}
        />
      </div>
    </>
  );
};

export default Sidebar;
