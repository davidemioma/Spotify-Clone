import { useEffect, useMemo, useState } from "react";
import { SongProps } from "@/types";
import { toast } from "react-hot-toast";
import { useSessionContext } from "@supabase/auth-helpers-react";

const useGetSongById = (id?: string) => {
  const { supabaseClient } = useSessionContext();

  const [song, setSong] = useState<SongProps | null>(null);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!id) return;

    setLoading(true);

    const fetchSong = async () => {
      const { data, error } = await supabaseClient
        .from("songs")
        .select("*")
        .eq("id", id)
        .single();

      if (error) {
        setLoading(false);

        return toast.error(error.message);
      }

      setSong(data as SongProps);

      setLoading(false);
    };

    fetchSong();
  }, [id, supabaseClient]);

  return useMemo(
    () => ({
      song,
      loading,
    }),
    [song, loading]
  );
};

export default useGetSongById;
