"use client";

import React from "react";
import Button from "./Button";
import { toast } from "react-hot-toast";
import { HiHome } from "react-icons/hi";
import { BiSearch } from "react-icons/bi";
import { FaUserAlt } from "react-icons/fa";
import { useRouter } from "next/navigation";
import useAuthModal from "@/hooks/useAuthModal";
import { useCurrentUser } from "@/context/useCurrentUser";
import { RxCaretLeft, RxCaretRight } from "react-icons/rx";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import usePlayer from "@/hooks/usePlayer";

interface Props {
  children: React.ReactNode;
  className?: string;
}

const Header = ({ children, className }: Props) => {
  const router = useRouter();

  const authModal = useAuthModal();

  const supabaseClient = useSupabaseClient();

  const currentUser = useCurrentUser();

  const player = usePlayer();

  const handleLogout = async () => {
    const { error } = await supabaseClient.auth.signOut();

    player.reset();

    router.refresh();

    if (error) {
      toast.error(error.message);
    } else {
      toast.success("Logged Out!");
    }
  };

  return (
    <div className={`h-fit bg-gradient-to-b from-emerald-800 p-6 ${className}`}>
      <div className="w-full flex items-center justify-between mb-4">
        <div className="hidden md:flex items-center gap-2">
          <button
            onClick={() => router.back()}
            className="bg-black flex items-center justify-center rounded-full hover:opacity-75 transition"
          >
            <RxCaretLeft size={35} />
          </button>

          <button
            onClick={() => router.forward()}
            className="bg-black flex items-center justify-center rounded-full hover:opacity-75 transition"
          >
            <RxCaretRight size={35} />
          </button>
        </div>

        <div className="md:hidden flex items-center gap-2">
          <button
            onClick={() => router.push("/")}
            className="bg-white text-black flex items-center justify-center rounded-full p-2 hover:opacity-75 transition"
          >
            <HiHome size={20} />
          </button>

          <button
            onClick={() => router.push("/search")}
            className="bg-white text-black flex items-center justify-center rounded-full p-2 hover:opacity-75 transition"
          >
            <BiSearch size={20} />
          </button>
        </div>

        <div className="flex items-center justify-between gap-4">
          {currentUser?.user ? (
            <div className="flex items-center gap-4">
              <Button
                onClick={handleLogout}
                className="bg-white text-black px-5 py-2 whitespace-nowrap"
              >
                Logout
              </Button>

              <Button
                onClick={() => router.push("/account")}
                className="bg-white text-black"
              >
                <FaUserAlt />
              </Button>
            </div>
          ) : (
            <div className="flex items-center gap-4">
              <Button
                onClick={() => authModal.onOpen()}
                className="bg-transparent text-neutral-300 font-medium whitespace-nowrap"
              >
                Sign Up
              </Button>

              <Button
                onClick={() => authModal.onOpen()}
                className="bg-white text-black px-5 py-2 whitespace-nowrap"
              >
                Log In
              </Button>
            </div>
          )}
        </div>
      </div>

      {children}
    </div>
  );
};

export default Header;
