"use client";

import React, { useEffect, useState } from "react";
import Slider from "./Slider";
import useSound from "use-sound";
import LikeBtn from "../LikeBtn";
import { SongProps } from "@/types";
import MediaItem from "../MediaItem";
import usePlayer from "@/hooks/usePlayer";
import { BsPauseFill, BsPlayFill } from "react-icons/bs";
import { HiSpeakerXMark, HiSpeakerWave } from "react-icons/hi2";
import { AiFillStepBackward, AiFillStepForward } from "react-icons/ai";

interface Props {
  song: SongProps;
  songUrl: string;
  loading: boolean;
}

const PlayerContent = ({ song, songUrl, loading }: Props) => {
  const player = usePlayer();

  const [volume, setVolume] = useState(10);

  const [isPlaying, setIsPlaying] = useState(false);

  const Icon = isPlaying ? BsPauseFill : BsPlayFill;

  const VolumeIcon = volume === 0 ? HiSpeakerXMark : HiSpeakerWave;

  const onPlayNext = () => {
    if (player.ids.length === 0) return;

    const currentIndex = player.ids.findIndex((id) => id === player.activeId);

    const nextSong = player.ids[currentIndex + 1];

    if (!nextSong) {
      player.setActiveId(player.ids[0]);
    } else {
      player.setActiveId(nextSong);
    }
  };

  const onPlayPrevious = () => {
    if (player.ids.length === 0) return;

    const currentIndex = player.ids.findIndex((id) => id === player.activeId);

    const prevSong = player.ids[currentIndex - 1];

    if (!prevSong) {
      player.setActiveId(player.ids[player.ids.length - 1]);
    } else {
      player.setActiveId(prevSong);
    }
  };

  const [play, { pause, sound }] = useSound(songUrl, {
    volume,
    onplay: () => setIsPlaying(true),
    onpause: () => setIsPlaying(false),
    onend: () => {
      setIsPlaying(false);

      onPlayNext();
    },
    format: ["mp3"],
  });

  useEffect(() => {
    sound?.play();

    return () => {
      sound?.unload();
    };
  }, [sound]);

  const handlePlay = () => {
    if (isPlaying) {
      pause();
    } else {
      play();
    }
  };

  const toggleMute = () => {
    if (volume === 0) {
      setVolume(10);
    } else {
      setVolume(0);
    }
  };

  return (
    <div className="w-full h-full">
      {loading ? (
        <div className="w-full h-full flex items-center justify-center">
          <div className="w-10 h-10 rounded-full border-t border-l border-white animate-spin" />
        </div>
      ) : (
        <div className="w-full h-full grid grid-cols-2 md:grid-cols-3">
          <div className="w-full flex justify-start">
            <div className="flex items-center gap-4">
              <MediaItem song={song} />

              <LikeBtn songId={song.id} />
            </div>
          </div>

          <div className="w-full col-auto flex items-center justify-end md:hidden">
            <button
              className="w-10 h-10 bg-white flex items-center justify-center p-1 rounded-full text-black"
              onClick={handlePlay}
            >
              <Icon size={30} />
            </button>
          </div>

          <div className="hidden md:flex items-center justify-center gap-4 h-full w-full max-w-[722px]">
            <AiFillStepBackward
              className="text-neutral-400 hover:text-white cursor-pointer transition"
              size={30}
              onClick={onPlayPrevious}
            />

            <button
              className="w-10 h-10 bg-white flex items-center justify-center p-1 rounded-full text-black"
              onClick={handlePlay}
            >
              <Icon size={30} />
            </button>

            <AiFillStepForward
              className="text-neutral-400 hover:text-white cursor-pointer transition"
              size={30}
              onClick={onPlayNext}
            />
          </div>

          <div className="hidden md:flex justify-end w-full pr-2">
            <div className="w-[120px] flex items-center gap-2">
              <VolumeIcon
                className="cursor-pointer"
                size={34}
                onClick={toggleMute}
              />

              <Slider value={volume} onChange={(value) => setVolume(value)} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PlayerContent;
