import { classNames } from "@/libs";
import { routes } from "@/routes";
import Image from "next/image";
import Link from "next/link";
import React from "react";

// import { Button } from ".";

export const DiscountBanner = () => {
  return (
    <div
      className={classNames(
        "justify-evenly items-center",
        "flex flex-col lg:flex-row",
        "bg-neutral-dark",
        "rounded-3xl",
        "gap-4 p-8 lg:p-0"
      )}
    >
      <Image
        src={"/img/banner-bg.png"}
        alt="Product Image"
        width={331}
        height={356}
        // sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      />

      <div className="flex flex-col gap-8 items-center">
        <div className="flex flex-col gap-3 text-center">
          <h1 className="font-bold text-5xl text-primary">
            Sale up to 50% off
          </h1>
          <p className="text-lg font-medium text-white">12 inch hd display</p>
        </div>
        <Link
          href={routes.products.all}
          className="btn btn-lg bg-primary text-white rounded-full flex items-center justify-center w-max"
        >
          <p className="text-sm font-medium">Shop now</p>
        </Link>
      </div>
    </div>
  );
};
