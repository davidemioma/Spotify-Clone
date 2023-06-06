"use client";

import React from "react";
import { SongProps } from "@/types";
import MediaItem from "@/components/MediaItem";

interface Props {
  songs: SongProps[];
}

const SearchContent = ({ songs }: Props) => {
  if (songs.length === 0) {
    return <div className="w-full px-6 text-neutral-400">No songs found.</div>;
  }

  return (
    <div className="w-full flex flex-col gap-2 px-6">
      {songs.map((song) => (
        <div key={song.id} className="w-full flex items-center gap-4">
          <div className="flex-1">
            <MediaItem song={song} onClick={() => {}} />
          </div>
        </div>
      ))}
    </div>
  );
};

export default SearchContent;
