"use client";

import React, { useMemo } from "react";
import Link from "next/link";
import Box from "./Box";
import Library from "./Library";
import { SongProps } from "@/types";
import { HiHome } from "react-icons/hi";
import { BiSearch } from "react-icons/bi";
import { usePathname } from "next/navigation";

interface Props {
  children: React.ReactNode;
  songs: SongProps[];
}

const Sidebar = ({ children, songs }: Props) => {
  const pathname = usePathname();

  const routes = useMemo(
    () => [
      {
        label: "Home",
        icon: HiHome,
        active: pathname === "/",
        href: "/",
      },
      {
        label: "Search",
        icon: BiSearch,
        active: pathname === "/search",
        href: "/search",
      },
    ],
    [pathname]
  );

  return (
    <div className="h-screen w-screen flex">
      <div className="hidden bg-black h-full w-[300px] md:flex flex-col gap-y-2 p-2">
        <Box className="flex flex-col gap-4 px-5 py-4">
          {routes.map((route) => (
            <Link href={route.href} key={route.label}>
              <div
                className={`flex items-center gap-4 py-1 font-medium ${
                  route.active ? "text-white" : "text-neutral-400"
                } hover:text-white transition`}
              >
                <route.icon size={24} />

                <span>{route.label}</span>
              </div>
            </Link>
          ))}
        </Box>

        <Box className="flex-1 overflow-y-auto scrollbar-hide">
          <Library songs={songs} />
        </Box>
      </div>

      <main className="h-full flex-1 py-2 overflow-y-auto">{children}</main>
    </div>
  );
};

export default Sidebar;
