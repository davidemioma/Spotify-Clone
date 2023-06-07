"use client";

import React from "react";
import { SongProps } from "@/types";
import MediaItem from "@/components/MediaItem";
import LikeBtn from "@/components/LikeBtn";
import useOnPlay from "@/hooks/useOnPlay";

interface Props {
  songs: SongProps[];
}

const SearchContent = ({ songs }: Props) => {
  const onPlay = useOnPlay(songs);

  if (songs.length === 0) {
    return <div className="w-full px-6 text-neutral-400">No songs found.</div>;
  }

  return (
    <div className="w-full flex flex-col gap-2 px-6">
      {songs.map((song) => (
        <div key={song.id} className="w-full flex items-center gap-4">
          <div className="flex-1">
            <MediaItem song={song} onClick={(id: string) => onPlay(id)} />
          </div>

          <LikeBtn songId={song.id} />
        </div>
      ))}
    </div>
  );
};

export default SearchContent;
