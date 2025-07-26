import React from "react";

const Board = ({ title, color, onClick }) => {
  return (
    <div
      onClick={onClick}
      className={`w-60 h-32 rounded-lg cursor-pointer flex items-center justify-center text-white font-semibold text-lg shadow-md hover:scale-105 transition transform ${color}`}
    >
      {title}
    </div>
  );
};

export default Board;
