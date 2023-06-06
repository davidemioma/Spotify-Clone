import { SongProps } from "@/types";
import { cookies } from "next/headers";
import { getSongs } from "./getSongs";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";

export const getSongsByTitle = async (title?: string): Promise<SongProps[]> => {
  try {
    const supabase = createServerComponentClient({
      cookies,
    });

    if (!title) {
      const allSongs = await getSongs();

      return allSongs;
    }

    const { data, error } = await supabase
      .from("songs")
      .select("*")
      .ilike("title", `%${title}%`)
      .order("created_at", { ascending: false });

    if (error) return [];

    return (data as any) || [];
  } catch (err) {
    return [];
  }
};
