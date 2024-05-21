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
