import Image from "next/image";
import Header from "@/components/Header";
import { getLikedSongsByUserId } from "@/actions/getLikedSongsByUserId";
import LikedContent from "./components/LikedContent";

export const revalidate = 0;

export default async function Liked() {
  const songs = await getLikedSongsByUserId();

  return (
    <div className="bg-neutral-900 w-full h-full rounded-lg overscroll-y-auto overflow-x-hidden">
      <Header>
        <div className="w-full flex justify-center md:justify-start mt-20">
          <div className="flex flex-col md:flex-row items-center gap-5">
            <div className="relative w-32 h-32 lg:w-44 lg:h-44 overflow-hidden">
              <Image
                className="object-cover"
                src="/assets/liked.png"
                fill
                alt="playlists"
              />
            </div>

            <div className="flex flex-col gap-2 items-center md:items-start">
              <span className="hidden md:block text-sm font-semibold">
                Playlist
              </span>

              <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold">
                Liked Songs
              </h1>
            </div>
          </div>
        </div>
      </Header>

      <LikedContent songs={songs} />
    </div>
  );
}
