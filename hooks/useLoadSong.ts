import { SongProps } from "@/types";
import { useSupabaseClient } from "@supabase/auth-helpers-react";

const useLoadSong = (song: SongProps) => {
  const supabaseClient = useSupabaseClient();

  if (!song) return null;

  const { data } = supabaseClient.storage
    .from("songs")
    .getPublicUrl(song.song_path);

  return data.publicUrl;
};

export default useLoadSong;
