"use client";

import React from "react";
import { TbPlaylist } from "react-icons/tb";
import { AiOutlinePlus } from "react-icons/ai";

const Library = () => {
  const onClickHandler = () => {};

  return (
    <div className="flex flex-col">
      <div className="flex items-center justify-between px-5 py-4">
        <div className="flex items-center gap-2 text-neutral-400">
          <TbPlaylist size={24} />

          <span className="font-medium">Your Library</span>
        </div>

        <button
          className="text-neutral-400 hover:text-white transition"
          onClick={onClickHandler}
        >
          <AiOutlinePlus size={20} />
        </button>
      </div>

      <div className="flex flex-col gap-2 mt-4 px-3">List of songs</div>
    </div>
  );
};

export default Library;
