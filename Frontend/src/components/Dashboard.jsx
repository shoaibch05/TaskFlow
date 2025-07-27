// src/components/Dashboard.jsx
import React, { useState, useEffect } from "react";
import TopBar from "./TopBar";
import Sidebar from "./Sidebar";
import { BoardView } from "./BoardView";
import CreateBoardModal from "./SmallComponents/CreateBoardModal";
import Board from "./Board";
import { ToastContainer, toast } from "react-toastify";
import { createBoard, getBoards, deleteBoard } from "../api/boards";
import { useSearch } from "../context/searchContext";
const Dashboard = () => {
  const { searchTerm } = useSearch();
  const [boards, setBoards] = useState([]);
  const [selectedBoard, setSelectedBoard] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Fetch boards on mount
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;
    (async () => {
      try {
        setLoading(true);
        const result = await getBoards(token);
        setBoards(result || []);
      } catch (err) {
        console.error(err);
        toast.error("Failed to load boards");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const handleBoardClick = (board) => {
    setSelectedBoard(board);
  };

  const handleCreate = async (boardData) => {
    try {
      const token = localStorage.getItem("token");
      const newBoard = await createBoard(boardData, token);
      setBoards((prev) => [...prev, newBoard]);
      toast.success("Board created");
    } catch (err) {
      console.error(err);
      toast.error("Failed to create board");
    } finally {
      setModalOpen(false);
    }
  };

  const handleDeleteBoard = async (boardId) => {
    const ok = window.confirm("Are you sure you want to delete this board?");
    if (!ok) return;

    try {
      const token = localStorage.getItem("token");
      await deleteBoard(boardId, token);
      setBoards((prev) => prev.filter((b) => b._id !== boardId));
      toast.success("Board deleted");
      if (selectedBoard?._id === boardId) {
        setSelectedBoard(null);
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete board");
    }
  };

  const visibleBoards = boards.filter((b) =>
    b.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <TopBar onMenuClick={() => setSidebarOpen(true)} />
      <div className="flex bg-gray-700 min-h-screen relative">
        {/* Sidebar Drawer */}
        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

        {/* Main Content */}
        <div className="p-4 sm:p-8 flex-1">
          {loading ? (
            <p className="text-white">Loading boards...</p>
          ) : selectedBoard ? (
            <BoardView board={selectedBoard} />
          ) : (
            <>
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4">
                <h2 className="text-xl font-bold text-white">Your Boards</h2>
                <button
                  onClick={() => setModalOpen(true)}
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                  + Create Board
                </button>
              </div>

              <CreateBoardModal
                isOpen={isModalOpen}
                onClose={() => setModalOpen(false)}
                onCreate={handleCreate}
              />

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {visibleBoards.length > 0 ? (
                  visibleBoards.map((board) => (
                    <div key={board._id} className="relative">
                      <Board
                        key={board._id}
                        title={board.title}
                        color={board.color || "bg-gray-500"}
                        onClick={() => handleBoardClick(board)}
                        onDelete={() => handleDeleteBoard(board._id)}
                      />
                    </div>
                  ))
                ) : (
                  <p className="text-gray-300">
                    No boards match “{searchTerm}”
                  </p>
                )}
              </div>
            </>
          )}
        </div>
      </div>

      <ToastContainer theme="dark" position="bottom-right" />
    </>
  );
};

export default Dashboard;
