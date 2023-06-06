import { SongProps } from "@/types";
import { cookies } from "next/headers";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";

export const getSongsByUserId = async (): Promise<SongProps[]> => {
  try {
    const supabase = createServerComponentClient({
      cookies,
    });

    const { data: sessionData, error: sesssionError } =
      await supabase.auth.getSession();

    if (sesssionError) return [];

    const { data, error } = await supabase
      .from("songs")
      .select("*")
      .eq("user_id", sessionData.session?.user.id)
      .order("created_at", { ascending: false });

    if (error) return [];

    return (data as any) || [];
  } catch (err) {
    return [];
  }
};
