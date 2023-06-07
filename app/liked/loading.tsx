"use client";

import React from "react";
import Box from "@/components/Box";

const Loading = () => {
  return (
    <Box className="h-full flex items-center justify-center">
      <div className="w-20 h-20 rounded-full border-l border-t border-[#22c55e] animate-spin" />
    </Box>
  );
};

export default Loading;
