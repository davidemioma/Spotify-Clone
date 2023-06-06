"use client";

import React, { useState } from "react";
import uniqid from "uniqid";
import Modal from "./Modal";
import Input from "./Input";
import Button from "./Button";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import useUploadModal from "@/hooks/useUploadModal";
import { useCurrentUser } from "@/context/useCurrentUser";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";

const UploadModal = () => {
  const router = useRouter();

  const uploadModal = useUploadModal();

  const currentUser = useCurrentUser();

  const supabaseClient = useSupabaseClient();

  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      title: "",
      author: "",
      song: null,
      img: null,
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    try {
      setLoading(true);

      const imgFile = data?.img?.[0];

      const songFile = data?.song?.[0];

      //Checking if there is a current user, img file and song file
      if (!currentUser?.user || !imgFile || !songFile) {
        toast.error("Missing fields");

        return;
      }

      //Unique id to store song in supabase storage bucket
      const uniqueId = uniqid();

      //Uploading song to supabase storage bucket
      const { data: songData, error: songError } = await supabaseClient.storage
        .from("songs")
        .upload(`song-${data.title}-${uniqueId}`, songFile, {
          cacheControl: "3600",
          upsert: false,
        });

      //Checking if there a song error
      if (songError) {
        setLoading(false);

        return toast.error("failed to upload song");
      }

      //Uploading image to supabase storage bucket
      const { data: imgData, error: imgError } = await supabaseClient.storage
        .from("images")
        .upload(`image-${data.title}-${uniqueId}`, imgFile, {
          cacheControl: "3600",
          upsert: false,
        });

      //Checking if there a image error
      if (imgError) {
        setLoading(false);

        return toast.error("failed to upload image");
      }

      //Adding a song to the supabase database
      const { error: supabaseErr } = await supabaseClient.from("songs").insert({
        user_id: currentUser?.user?.id,
        title: data.title,
        author: data.author,
        song_path: songData.path,
        img_path: imgData.path,
      });

      if (supabaseErr) {
        setLoading(false);

        return toast.error(supabaseErr.message);
      }

      router.refresh();

      setLoading(false);

      toast.success("Song created!");

      reset();

      uploadModal.onClose();
    } catch (err) {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      title="Add a song"
      description="Upload a song file"
      isOpen={uploadModal.isOpen}
      onClose={() => {
        reset();

        uploadModal.onClose();
      }}
    >
      <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
        <Input
          id="title"
          placeholder="Song title"
          register={register}
          disabled={loading}
          required
        />

        <Input
          id="author"
          placeholder="Song author"
          register={register}
          disabled={loading}
          required
        />

        <div className="space-y-1">
          <label>Select a song file</label>

          <Input
            id="song"
            type="file"
            accept=".mp3,.mp4,.wav,.ogg"
            register={register}
            disabled={loading}
            required
          />
        </div>

        <div className="space-y-1">
          <label>Select an image</label>

          <Input
            id="img"
            type="file"
            accept=".jpg,.jpeg,.png,.gif"
            register={register}
            disabled={loading}
            required
          />
        </div>

        <Button
          className="bg-green-500 text-black"
          type="submit"
          disabled={loading}
        >
          Create
        </Button>
      </form>
    </Modal>
  );
};

export default UploadModal;
