import React, { useEffect, useState } from "react";
import { IoMdNotifications } from "react-icons/io";
import { toast } from "react-toastify";
import { getProfile } from "../api/profile";
import { useSearch } from "../context/searchContext";
const TopBar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const { searchTerm, setSearchTerm } = useSearch();
  const [profile, setProfile] = useState({ name: "", email: "" });
  useEffect(() => {
    async function fetchProfile() {
      try {
        const data = await getProfile();
        if (data) setProfile(data);
      } catch (error) {
        console.error(error);
      }
    }
    fetchProfile();
  }, []);
  return (
    <div className="flex px-4 bg-gray-800 items-center justify-between p-2 text-white shadow-[0px_-1px_3px_2px_rgba(0,0,0,0.25)] ">
      <div className="logo flex flex-col">
        <div className="text-3xl font-bold bg text-blue-500">TaskFlow</div>
        <p className=" text-xs font-mono text-white ">
          Your Productivity Partner
        </p>
      </div>
      <div className="search">
        <input
          type="text"
          name=""
          id="search "
          placeholder="Search...."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-80 px-5 py-2 bg-gray-600 rounded-lg "
        />
      </div>
      <div className="flex s items-center space-x-5  ">
        <IoMdNotifications className="w-5 h-5" />
        <img
          className="inline-block size-6 rounded-full ring-2 ring-white"
          src="https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
          alt=""
          onClick={() => setIsOpen(!isOpen)}
        />
        {isOpen && (
          <div className="absolute right-0 top-12 w-56 bg-white rounded-lg shadow-lg text-gray-800 p-4 z-50">
            <div className="mb-3">
              <p className="font-semibold text-black-500">
                <span>Name : </span>
                {profile.name}
              </p>
              <p className="text-sm text-gray-500">
                <span>Email : </span>
                {profile.email}
              </p>
            </div>
            <button
              className="w-full bg-blue-500 text-white py-1 rounded hover:bg-blue-600"
              onClick={() => {
                toast.warning("Edit Functionality is Under Construction");
              }}
            >
              Edit Profile
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default TopBar;
