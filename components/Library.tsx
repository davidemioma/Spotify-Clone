"use client";

import React from "react";
import { SongProps } from "@/types";
import { TbPlaylist } from "react-icons/tb";
import { AiOutlinePlus } from "react-icons/ai";
import useAuthModal from "@/hooks/useAuthModal";
import useUploadModal from "@/hooks/useUploadModal";
import { useCurrentUser } from "@/context/useCurrentUser";
import MediaItem from "./MediaItem";

interface Props {
  songs: SongProps[];
}

const Library = ({ songs }: Props) => {
  const authModal = useAuthModal();

  const uploadModal = useUploadModal();

  const currentUser = useCurrentUser();

  const onClickHandler = () => {
    if (!currentUser?.user) return authModal.onOpen();

    return uploadModal.onOpen();
  };

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

      <div className="flex flex-col gap-2 mt-4 px-3">
        {songs.map((song) => (
          <MediaItem key={song.id} song={song} onClick={() => {}} />
        ))}
      </div>
    </div>
  );
};

export default Library;
