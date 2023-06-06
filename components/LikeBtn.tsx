"use client";

import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import useAuthModal from "@/hooks/useAuthModal";
import { useCurrentUser } from "@/context/useCurrentUser";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { useSessionContext } from "@supabase/auth-helpers-react";

interface Props {
  songId: string;
}

const LikeBtn = ({ songId }: Props) => {
  const router = useRouter();

  const currentUser = useCurrentUser();

  const { supabaseClient } = useSessionContext();

  const authModal = useAuthModal();

  const [hasLiked, setHasLiked] = useState(false);

  useEffect(() => {
    if (!currentUser?.user?.id) return;

    const fetchData = async () => {
      const { data, error } = await supabaseClient
        .from("liked_songs")
        .select("*")
        .eq("user_id", currentUser?.user?.id)
        .eq("song_id", songId)
        .single();

      if (!error && data) {
        setHasLiked(true);
      }
    };

    fetchData();
  }, [currentUser?.user?.id, songId, supabaseClient]);

  const Icon = hasLiked ? AiFillHeart : AiOutlineHeart;

  const handleLike = async () => {
    if (!currentUser?.user?.id) return authModal.onOpen();

    if (hasLiked) {
      const { error } = await supabaseClient
        .from("liked_songs")
        .delete()
        .eq("user_id", currentUser.user.id)
        .eq("song_id", songId);

      if (error) {
        toast.error(error.message);
      } else {
        setHasLiked(false);
      }
    } else {
      const { error } = await supabaseClient.from("liked_songs").insert({
        user_id: currentUser.user.id,
        song_id: songId,
      });

      if (error) {
        toast.error(error.message);
      } else {
        setHasLiked(true);

        toast.success("Liked");
      }
    }

    router.refresh();
  };

  return (
    <button className="hover:opacity-75 transition" onClick={handleLike}>
      <Icon color={hasLiked ? "#22c55e" : "white"} size={25} />
    </button>
  );
};

export default LikeBtn;
