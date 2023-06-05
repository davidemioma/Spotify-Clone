"use client";

import React from "react";
import Image from "next/image";
import { FaPlay } from "react-icons/fa";
import { useRouter } from "next/navigation";

interface Props {
  image: string;
  name: string;
  href: string;
}

const LikedListBtn = ({ image, name, href }: Props) => {
  const router = useRouter();

  const onClickHandler = () => {
    router.push(href);
  };

  return (
    <button
      onClick={onClickHandler}
      className="relative group bg-neutral-100/10 flex items-center gap-4 rounded-lg overflow-hidden hover:bg-neutral-100/20 transition"
    >
      <div className="relative h-[64px] w-[64px]">
        <Image className="object-cover" fill src={image} alt="Image" />
      </div>

      <p className="font-medium whitespace-nowrap">{name}</p>

      <div className="absolute right-5 opacity-0 hover:scale-110 group-hover:opacity-100 flex items-center justify-center bg-green-500 text-black p-4 rounded-full transition">
        <FaPlay />
      </div>
    </button>
  );
};

export default LikedListBtn;
