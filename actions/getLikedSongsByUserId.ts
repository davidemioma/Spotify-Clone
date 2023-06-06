import { SongProps } from "@/types";
import { cookies } from "next/headers";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";

export const getLikedSongsByUserId = async (): Promise<SongProps[]> => {
  try {
    const supabase = createServerComponentClient({
      cookies,
    });

    const {
      data: { session },
      error: sesssionError,
    } = await supabase.auth.getSession();

    if (sesssionError) return [];

    const { data, error } = await supabase
      .from("liked_songs")
      .select("*, songs(*)")
      .eq("user_id", session?.user.id)
      .order("created_at", { ascending: false });

    if (error || !data) return [];

    return data.map((item) => ({
      ...item.songs,
    }));
  } catch (err) {
    return [];
  }
};
