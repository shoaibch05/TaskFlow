import React from "react";
import { toast } from "react-toastify";
import GoogleIcon from "../../assets/Google.png";
import TwitterIcon from "../../assets/X Twitter.png";
import TikTokIcon from "../../assets/tik-tok.png";
import DiscordIcon from "../../assets/discord.png";

export const OthersSignin = () => {
  const handleClick = () => {
    toast.info("These Methods are not Implemented Yet");
  };
  return (
    <div className="others flex justify-center gap-4 " onClick={handleClick}>
      <img src={GoogleIcon} alt="" className="rounded-full h-8 w-10  " />
      <img src={TwitterIcon} alt="" className="rounded-full h-8 w-10  " />
      <img src={TikTokIcon} alt="" className="rounded-full h-8 w-10  " />
      <img src={DiscordIcon} alt="" className="rounded-full h-8 w-10   " />
    </div>
  );
};
