"use client";

import React from "react";
import { SongProps } from "@/types";
import SongItem from "../../../components/SongItem";

interface Props {
  songs: SongProps[];
}

const PageContent = ({ songs }: Props) => {
  if (songs.length === 0) {
    return <div className="mt-4 text-neutral-400">No songs available!</div>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-8 gap-4 mt-5">
      {songs.map((song) => (
        <SongItem key={song.id} song={song} onClick={() => {}} />
      ))}
    </div>
  );
};

export default PageContent;
