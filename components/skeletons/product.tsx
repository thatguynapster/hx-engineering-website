import { classNames } from "@/libs";
import React from "react";

export const Product = () => {
  return (
    <div
      className={classNames(
        "flex flex-col gap-2",
        "bg-neutral-20",
        "animate-pulse",
        "w-full h-56",
        "rounded-3xl"
      )}
    ></div>
  );
};

export const ProductImagePreview = () => {
  return (
    <div className="flex flex-col gap-4 animate-pulse">
      <div className="w-full h-96 lg:h-[561px] rounded-lg bg-neutral-30"></div>
      <div className="grid grid-cols-3 gap-4 w-full">
        {Array.from({ length: 3 }, (_, i) => (
          <div key={i} className="h-28 w-full rounded-lg bg-neutral-30"></div>
        ))}
      </div>
    </div>
  );
};

export const ProductDetails = () => {
  return (
    <div className="w-full flex flex-col divide-y divide-neutral-30">
      <div className="flex flex-col gap-4 p-4 animate-pulse">
        <div className="w-40 h-11 bg-neutral-30 rounded-md"></div>
        <div className="w-20 h-11 bg-neutral-30 rounded-md"></div>
        <div className="w-28 h-7 bg-neutral-30 rounded-md"></div>
      </div>

      <div className="flex flex-col gap-4 p-4 animate-pulse">
        <div className="w-24 h-7 bg-neutral-30 rounded-md"></div>

        <div className="flex gap-4">
          <div className="w-32 h-10 bg-neutral-30 rounded-md"></div>
          <div className="w-16 h-10 bg-neutral-30 rounded-md"></div>
        </div>
      </div>

      <div className="flex flex-col gap-4 p-4 animate-pulse">
        <div className="w-28 h-9 bg-neutral-30 rounded-md"></div>

        <div className="flex gap-4 items-center">
          <div className="w-14 h-7 bg-neutral-30 rounded-md"></div>

          <div className="w-6 h-6 bg-neutral-30 rounded-md"></div>
        </div>
      </div>
    </div>
  );
};
