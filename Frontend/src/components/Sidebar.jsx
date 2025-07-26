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

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const createBoard = () => {
    setIsOpen(true); // open modal
  };

  const closeModal = () => {
    setIsOpen(false); // close modal from child or parent
  };
  function handleLogout() {
    localStorage.removeItem("token");
    window.location.href = "/login"; // redirect to login
  }
  const handleSetting = () => {
    toast.info("Sorry! Setting is Yet to be implemented");
  };
  return (
    <div className="bg-gray-800 w-52  flex py-20  justify-between h-screen items-center flex-col text-white">
      <div className="itemsList flex  flex-col content-center  gap-6 w-5/6">
        <li className="flex border-b-2 border-blue-500 rounded-md hover:bg-gray-500 py-3  ">
          <Link to={"/"}>
            <div className=" flex pl-8 gap-2 items-center">
              <IoHomeSharp />
              Home
            </div>
          </Link>
        </li>
        <li
          className="flex border-b-2 border-blue-500 rounded-md hover:bg-gray-500 py-3 "
          onClick={createBoard}
        >
          {" "}
          <div className=" flex pl-7 gap-2 items-center">
            <IoMdAdd />
            Create Board
          </div>
        </li>
        <li className="flex  border-b-2 border-blue-500 rounded-md hover:bg-gray-500 py-3 ">
          <Link to="/people">
            <div className=" flex pl-7 gap-2 items-center">
              <IoPeopleSharp />
              Manage Peoples
            </div>
          </Link>
        </li>
      </div>
      <div
        className="itemsLast w-5/6 flex flex-col gap-1"
        onClick={handleSetting}
      >
        <li className="flex  border-b-2 border-blue-500 rounded-md hover:bg-gray-500 py-3 ">
          <div className="flex pl-7 gap-2 items-center">
            <IoSettingsSharp />
            Setting
          </div>
        </li>
        <li
          className="flex  border-b-2 border-blue-500 rounded-md hover:bg-gray-500 py-3 "
          onClick={handleLogout}
        >
          <div className=" pl-7 flex gap-2 items-center">
            <IoLogOutOutline />
            Logout
          </div>
        </li>
      </div>
      {<CreateBoardModal isOpen={isOpen} onClose={closeModal} />}
    </div>
  );
};

export default Sidebar;
