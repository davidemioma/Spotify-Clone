"use client";

import React from "react";
import * as RadixSlider from "@radix-ui/react-slider";

interface Props {
  value?: number;
  onChange?: (value: number) => void;
}

const Slider = ({ value = 10, onChange }: Props) => {
  const handleChange = (newValue: number[]) => {
    onChange?.(newValue[0]);
  };

  return (
    <RadixSlider.Root
      className="relative w-full h-10 flex items-center select-none touch-none"
      defaultValue={[10]}
      value={[value]}
      onValueChange={handleChange}
      max={10}
      step={0.1}
      aria-label="Volume"
    >
      <RadixSlider.Track className="relative bg-neutral-600 grow h-[3px] rounded-full">
        <RadixSlider.Range className="absolute bg-white h-full rounded-full" />
      </RadixSlider.Track>
    </RadixSlider.Root>
  );
};

export default Slider;
