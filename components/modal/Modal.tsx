"use client";

import React from "react";
import { IoMdClose } from "react-icons/io";

interface Props {
  children: React.ReactNode;
  title?: string;
  description?: string;
  isOpen?: boolean;
  onClose: () => void;
}

const Modal = ({ children, title, description, isOpen, onClose }: Props) => {
  if (!isOpen) return null;

  return (
    <>
      <div
        className="fixed inset-0 z-40 w-screen h-screen backdrop-blur-sm bg-neutral-900/90"
        onClick={onClose}
      />

      <div className="fixed z-50 h-full md:h-fit md:max-h-[90vh] w-full md:max-w-[450px] top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 bg-neutral-800 rounded-md drop-shadow-md border border-neutral-700">
        <div className="relative p-6">
          <button
            className="absolute top-3 right-3 w-6 h-6 flex items-center justify-center rounded-full focus:outline-none text-neutral-400 hover:text-white transition"
            onClick={onClose}
          >
            <IoMdClose />
          </button>

          <h1 className="text-xl text-center font-bold mb-4">{title}</h1>

          <p className="text-sm text-center leading-normal mb-5">
            {description}
          </p>

          <div>{children}</div>
        </div>
      </div>
    </>
  );
};

export default Modal;
