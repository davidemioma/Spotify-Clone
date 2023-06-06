"use client";

import React from "react";
import { FieldValues, UseFormRegister, FieldErrors } from "react-hook-form";

interface Props {
  id: string;
  className?: string;
  placeholder?: string;
  type?: string;
  accept?: string;
  disabled?: boolean;
  required?: boolean;
  register: UseFormRegister<FieldValues>;
}

const Input = ({
  id,
  placeholder,
  type = "text",
  accept,
  disabled,
  required,
  register,
  className,
}: Props) => {
  return (
    <input
      className={`${className} w-full bg-neutral-700 file:bg-transparent p-3 text-sm file:font-medium placeholder:text-neutral-400 border file:border-0 border-transparent rounded-md disabled:cursor-not-allowed disabled:opacity-50 focus:outline-none`}
      id={id}
      accept={accept}
      {...register(id, { required })}
      placeholder={placeholder}
      type={type}
      disabled={disabled}
    />
  );
};

export default Input;
