import React from "react";
import { toast } from "react-toastify";

export const OthersSignin = () => {
  const handleClick = () => {
    toast.info("These Methods are not Implemented Yet");
  };
  return (
    <div className="others flex justify-center gap-4 " onClick={handleClick}>
      <img
        src="src/assets/Google.png"
        alt=""
        className="rounded-full h-8 w-10  "
      />
      <img
        src="src/assets/X Twitter.png"
        alt=""
        className="rounded-full h-8 w-10  "
      />
      <img
        src="src/assets/tik-tok.png"
        alt=""
        className="rounded-full h-8 w-10  "
      />
      <img
        src="src/assets/discord.png"
        alt=""
        className="rounded-full h-8 w-10   "
      />
    </div>
  );
};
