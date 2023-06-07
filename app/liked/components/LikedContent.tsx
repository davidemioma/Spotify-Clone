"use client";

import React, { useEffect } from "react";
import { SongProps } from "@/types";
import { useRouter } from "next/navigation";
import LikeBtn from "@/components/LikeBtn";
import MediaItem from "@/components/MediaItem";
import { useCurrentUser } from "@/context/useCurrentUser";
import useOnPlay from "@/hooks/useOnPlay";

interface Props {
  songs: SongProps[];
}

const LikedContent = ({ songs }: Props) => {
  const router = useRouter();

  const currentUser = useCurrentUser();

  const onPlay = useOnPlay(songs);

  useEffect(() => {
    if (!currentUser?.isLoading && !currentUser?.user) {
      router.replace("/");
    }
  }, [currentUser?.isLoading, currentUser?.user, router]);

  if (songs.length === 0) {
    return <div className="w-full px-6 text-neutral-400">No liked songs.</div>;
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

export default LikedContent;
