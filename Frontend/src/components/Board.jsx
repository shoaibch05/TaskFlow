import React from "react";
import { AiOutlineDelete } from "react-icons/ai";

const Board = ({ title, color, onClick, onDelete }) => {
  return (
    <div
      className={`relative rounded-lg py-8 cursor-pointer flex flex-col justify-center items-center px-6 text-white font-semibold text-lg shadow-md hover:scale-105 transition-transform ${color}`}
      onClick={onClick}
    >
      <button
        onClick={(e) => {
          e.stopPropagation();
          onDelete();
        }}
        className="absolute top-2 right-2 text-white bg-black/30 hover:bg-black/50 p-1 rounded"
      >
        <AiOutlineDelete size={18} />
      </button>
      {title}
    </div>
  );
};

export default Board;
