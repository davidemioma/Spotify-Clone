"use client";

import React from "react";
import Image from "next/image";
import { SongProps } from "@/types";
import useLoadImage from "@/hooks/useLoadImage";

interface Props {
  song: SongProps;
  onClick?: (id: string) => void;
}

const MediaItem = ({ song, onClick }: Props) => {
  const imagePath = useLoadImage(song);

  const handleClick = () => {
    if (onClick) {
      return onClick(song.id);
    }
  };

  return (
    <div
      className="w-full flex items-center gap-3 p-2 rounded-md cursor-pointer hover:bg-neutral-800/50 transition"
      onClick={handleClick}
    >
      <div className="relative w-10 h-10 sm:w-12 sm:h-12 rounded-md overflow-hidden">
        <Image
          className="object-cover"
          fill
          src={imagePath || "/assets/liked.png"}
          alt="media_item"
        />
      </div>

      <div className="flex flex-col gap-1 overflow-hidden">
        <p className="text-sm sm:text-base font-medium truncate">
          {song.title}
        </p>

        <p className="text-xs sm:text-sm text-neutral-400 truncate">
          {song.author}
        </p>
      </div>
    </div>
  );
};

export default MediaItem;
