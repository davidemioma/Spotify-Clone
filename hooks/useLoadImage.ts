import { SongProps } from "@/types";
import { useSupabaseClient } from "@supabase/auth-helpers-react";

const useLoadImage = (song: SongProps) => {
  const supabaseClient = useSupabaseClient();

  if (!song) return null;

  const { data } = supabaseClient.storage
    .from("images")
    .getPublicUrl(song.img_path);

  return data.publicUrl;
};

export default useLoadImage;
