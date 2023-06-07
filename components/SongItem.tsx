"use client";

import React from "react";
import Image from "next/image";
import { SongProps } from "@/types";
import { FaPlay } from "react-icons/fa";
import useLoadImage from "@/hooks/useLoadImage";

interface Props {
  song: SongProps;
  onClick: (id: string) => void;
}

const SongItem = ({ song, onClick }: Props) => {
  const imagePath = useLoadImage(song);

  return (
    <div
      onClick={() => onClick(song.id)}
      className="relative group flex flex-col gap-5 bg-neutral-400/5 p-3 rounded-md cursor-pointer overflow-hidden hover:bg-neutral-400/10 transition"
    >
      <div className="relative w-full h-full aspect-square rounded-md overflow-hidden">
        <Image
          className="object-cover"
          src={imagePath || "/assets/liked.png"}
          fill
          alt=""
        />

        <div className="absolute bottom-1 right-1 z-10 opacity-0 hover:scale-110 group-hover:opacity-100 translate-y-1/4 group-hover:translate-y-0 flex items-center justify-center bg-green-500 text-black drop-shadow-md p-4 rounded-full transition">
          <FaPlay />
        </div>
      </div>

      <div className="flex flex-col gap-1 pb-4">
        <p className="w-full font-medium truncate">{song.title}</p>

        <p className="w-full text-sm text-neutral-400 truncate">
          {song.author}
        </p>
      </div>
    </div>
  );
};

export default SongItem;
