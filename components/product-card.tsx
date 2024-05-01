import { ShoppingBagIcon, ShoppingCartIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import React from "react";

import { classNames } from "@/libs";
import { Button } from ".";

export const ProductCard = () => {
  return (
    <div
      className={classNames(
        "border border-neutral-30",
        "group overflow-",
        "flex flex-col gap-2",
        "cursor-pointer",
        "py-5 px-3.5",
        "rounded-3xl",
        "w-full"
      )}
    >
      <div className="w-full h-[107px] relative">
        <Image
          src={"/img/sample_product.png"}
          alt="Product Name Image"
          fill
          className="object-contain"
        />

        {/* wishlist icon */}
        {/* <div
            className={classNames(
                "bg-primary/50 rounded-full",
                "absolute top-0 right-0",
                "hover:bg-primary",
                "cursor-pointer",
                "w-6 h-6"
            )}
            >
            <div className="flex items-center justify-center w-full h-full">
                <HeartIcon className={"w-4 h-4 text-white"} />
            </div>
        </div> */}
      </div>

      <div className="flex flex-col gap-2 group-hover:hidden transition">
        <h2 className="font-medium text-primary">Wireless headphones</h2>
        <p className="font-semibold">&#8373;11.70</p>
      </div>

      <div
        className={classNames(
          "hidden group-hover:flex",
          "justify-between gap-4"
        )}
      >
        <Button className="bg-primary text-white rounded-full flex items-center justify-between w-full">
          <p className="text-sm font-semibold">Add to cart</p>
          <div className="flex items-center justify-center w-8 h-8 bg-white rounded-full">
            <ShoppingCartIcon className={"w-5 h-5 stroke-2 text-primary"} />
          </div>
        </Button>

        <Button className="w-[56px] h-[56px] bg-primary text-white rounded-full flex items-center justify-center">
          <ShoppingBagIcon className="w-6 h-6 stroke-2" />
        </Button>
      </div>
    </div>
  );
};
