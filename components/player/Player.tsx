"use client";

import React from "react";
import usePlayer from "@/hooks/usePlayer";
import useLoadSong from "@/hooks/useLoadSong";
import useGetSongById from "@/hooks/useGetSongById";
import PlayerContent from "./PlayerContent";

const Player = () => {
  const player = usePlayer();

  const { loading, song } = useGetSongById(player.activeId);

  const songUrl = useLoadSong(song!);

  if (!player.activeId || !song || !songUrl) return null;

  return (
    <div className="fixed bottom-0 z-30 w-full h-20 bg-black py-2 px-4">
      <PlayerContent
        key={songUrl} //We used key because use sound hooks does not change when we play a new song, So with key we are rendering a new component
        song={song}
        songUrl={songUrl}
        loading={loading}
      />
    </div>
  );
};

export default Player;
