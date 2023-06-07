"use client";

import React, { useEffect, useState } from "react";
import qs from "query-string";
import { useRouter } from "next/navigation";
import useDebounce from "@/hooks/useDebounce";

const SearchInput = () => {
  const router = useRouter();

  const [value, setValue] = useState("");

  const debounceValue = useDebounce(value, 500);

  useEffect(() => {
    const query = {
      title: debounceValue,
    };

    const url = qs.stringifyUrl({
      url: "/search",
      query,
    });

    router.push(url);
  }, [debounceValue, router]);

  return (
    <input
      className="w-full bg-neutral-700 p-3 text-sm placeholder:text-neutral-400 border border-transparent rounded-md disabled:cursor-not-allowed disabled:opacity-50 focus:outline-none"
      value={value}
      type="text"
      placeholder="What do you want to listen to?"
      onChange={(e) => setValue(e.target.value)}
    />
  );
};

export default SearchInput;
