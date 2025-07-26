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
import { AiOutlineDelete } from "react-icons/ai";

const Dashboard = () => {
  const { searchTerm } = useSearch();
  const [boards, setBoards] = useState([]);
  const [selectedBoard, setSelectedBoard] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);

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

  // DELETE handler
  const handleDeleteBoard = async (boardId) => {
    const ok = window.confirm("Are you sure you want to delete this board?");
    if (!ok) return;

    try {
      const token = localStorage.getItem("token");
      await deleteBoard(boardId, token);
      // remove from state
      setBoards((prev) => prev.filter((b) => b._id !== boardId));
      toast.success("Board deleted");
      // if we were viewing it, go back
      if (selectedBoard?._id === boardId) {
        setSelectedBoard(null);
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete board");
    }
  };

  // Filter by search
  const visibleBoards = boards.filter((b) =>
    b.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <TopBar />
      <div className="flex bg-gray-700 min-h-screen">
        <Sidebar />

        <div className="p-8 flex-1">
          {loading ? (
            <p className="text-white">Loading boards...</p>
          ) : selectedBoard ? (
            <BoardView board={selectedBoard} />
          ) : (
            <>
              <div className="flex items-center justify-between mb-6">
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

              <div className="flex gap-4 flex-wrap">
                {visibleBoards.length > 0 ? (
                  visibleBoards.map((board) => (
                    <div key={board._id} className="relative">
                      {/* Your existing Board tile */}
                      <Board
                        title={board.title}
                        color={board.color || "bg-gray-500"}
                        onClick={() => handleBoardClick(board)}
                      />
                      {/* Delete icon */}
                      <AiOutlineDelete
                        onClick={() => handleDeleteBoard(board._id)}
                        className="absolute top-2 right-2 text-white cursor-pointer hover:text-red-400"
                        size={20}
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
