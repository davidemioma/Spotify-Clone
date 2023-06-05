"use client";

import React from "react";

interface Props {
  children: React.ReactNode;
  className?: string;
}

const Box = ({ children, className }: Props) => {
  return (
    <div className={`bg-neutral-900 w-full h-fit rounded-lg ${className}`}>
      {children}
    </div>
  );
};

export default Box;
