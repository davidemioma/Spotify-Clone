import { SongProps } from "@/types";
import { cookies } from "next/headers";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";

export const getSongs = async (): Promise<SongProps[]> => {
  try {
    const supabase = createServerComponentClient({
      cookies,
    });

    const { data, error } = await supabase
      .from("songs")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) return [];

    return (data as any) || [];
  } catch (err) {
    return [];
  }
};
