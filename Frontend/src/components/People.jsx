// src/components/People.jsx
import React, { useState, useEffect } from "react";
import TopBar from "./TopBar";
import Sidebar from "./Sidebar";
import InviteModal from "./SmallComponents/Invite";
import UserDetailModal from "./SmallComponents/UserDetailModel";
import { fetchAllMembers, inviteMember } from "../api/team";
import { getBoards } from "../api/boards";
import { ToastContainer, toast } from "react-toastify";
import { useSearch } from "../context/searchContext";

export default function People() {
  const { searchTerm } = useSearch();

  const [showInviteModal, setShowInviteModal] = useState(false);
  const [allUsers, setAllUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [boards, setBoards] = useState([]);
  const [selectedBoardId, setSelectedBoardId] = useState("all");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Fetch boards and members
  useEffect(() => {
    const token = localStorage.getItem("token");
    getBoards(token)
      .then(setBoards)
      .catch((err) => toast.error(err.message));

    fetchAllMembers()
      .then((users) => {
        setAllUsers(users);
        setFilteredUsers(users);
      })
      .catch((err) => toast.error(err.message));
  }, []);

  // Filter by board
  useEffect(() => {
    if (selectedBoardId === "all") {
      setFilteredUsers(allUsers);
    } else {
      setFilteredUsers(
        allUsers.filter(
          (member) => member.boardId && member.boardId._id === selectedBoardId
        )
      );
    }
  }, [selectedBoardId, allUsers]);

  // Filter by search term
  const displayedUsers = filteredUsers.filter((member) => {
    const q = searchTerm.trim().toLowerCase();
    if (!q) return true;
    return (
      member.userId.name.toLowerCase().includes(q) ||
      member.userId.email.toLowerCase().includes(q)
    );
  });

  const handleInvite = async (email, boardsToInvite) => {
    try {
      await Promise.all(
        boardsToInvite.map((boardId) => inviteMember(boardId, email))
      );
      toast.success(`Added to ${boardsToInvite.length} board(s)`);

      const updatedAll = await fetchAllMembers();
      setAllUsers(updatedAll);
      setShowInviteModal(false);
    } catch (err) {
      toast.error(`Failed on some boards: ${err.message}`);
      setShowInviteModal(false);
    }
  };

  return (
    <>
      <TopBar onMenuClick={() => setSidebarOpen(true)} />
      <div className="flex bg-gray-700 min-h-screen relative">
        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        <div className="p-4 sm:p-6 flex-1">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <h2 className="text-2xl font-bold text-white">Team Members</h2>
            <div className="flex flex-col sm:flex-row gap-4">
              {boards.length > 0 && (
                <select
                  value={selectedBoardId}
                  onChange={(e) => setSelectedBoardId(e.target.value)}
                  className="p-2 rounded bg-gray-600 text-white"
                >
                  <option value="all">All Boards</option>
                  {boards.map((board) => (
                    <option key={board._id} value={board._id}>
                      {board.title}
                    </option>
                  ))}
                </select>
              )}
              <button
                onClick={() => setShowInviteModal(true)}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                + Invite Member
              </button>
            </div>
          </div>

          {/* Members list */}
          <ul className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {displayedUsers.length > 0 ? (
              displayedUsers.map((member) => (
                <li
                  key={member._id}
                  onClick={() => setSelectedUser(member)}
                  className="text-white bg-gray-800 p-3 rounded cursor-pointer hover:bg-gray-700"
                >
                  <div className="font-medium">{member.userId.name}</div>
                  <div className="text-sm text-gray-300">
                    {member.userId.email}
                  </div>
                  {selectedBoardId === "all" && member.boardId && (
                    <div className="text-xs text-gray-400 mt-1">
                      Board: {member.boardId?.title || "Unknown"}
                    </div>
                  )}
                </li>
              ))
            ) : (
              <p className="text-gray-300 mt-4">
                No members found{searchTerm && ` for “${searchTerm}”`}.
              </p>
            )}
          </ul>

          <InviteModal
            isOpen={showInviteModal}
            onClose={() => setShowInviteModal(false)}
            onInvite={handleInvite}
            boards={boards.map((b) => ({ id: b._id, title: b.title }))}
          />

          {selectedUser && (
            <UserDetailModal
              user={selectedUser}
              onClose={() => setSelectedUser(null)}
            />
          )}
        </div>
      </div>

      <ToastContainer theme="dark" position="bottom-right" />
    </>
  );
}
