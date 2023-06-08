import { SongProps } from "@/types";
import usePlayer from "./usePlayer";
import useAuthModal from "./useAuthModal";
import useSubscribeModal from "./useSubscribeModal";
import { useCurrentUser } from "@/context/useCurrentUser";

const useOnPlay = (songs: SongProps[]) => {
  const player = usePlayer();

  const authModal = useAuthModal();

  const currentUser = useCurrentUser();

  const subscribeModal = useSubscribeModal();

  const onPlay = (id: string) => {
    if (!currentUser?.user) return authModal.onOpen();

    if (currentUser.user && !currentUser.subscription) {
      return subscribeModal.onOpen();
    }

    player.setIds(songs.map((song) => song.id));

    player.setActiveId(id);
  };

  return onPlay;
};

export default useOnPlay;
