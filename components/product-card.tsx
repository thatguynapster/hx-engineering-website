"use client";

import { ShoppingBagIcon, ShoppingCartIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";
import React from "react";

import { Button, CartCheckout, ImageSlider } from ".";
import { addToCart, buyNow } from "@/functions";
import { classNames } from "@/libs";
import { IProduct } from "@/types";
import { useStore } from "@/hooks";
import { routes } from "@/routes";

export const ProductCard = ({ product }: { product: IProduct }) => {
  const router = useRouter();
  const { store, setStore } = useStore();

  return (
    <div
      className={classNames(
        "border border-neutral-30 dark:border-white",
        "group cursor-pointer",
        "flex flex-col gap-2",
        "py-5 px-3.5 w-full h-fit",
        "rounded-3xl"
      )}
      onClick={() => {
        router.push(
          routes.products.details.replace(":product_id", product._id)
        );
      }}
    >
      <div className="w-full h-[107px] relative">
        <ImageSlider images={product.images} alt={product.name} />

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
        <h2 className="font-medium text-primary capitalize truncate">
          {product.name}
        </h2>
        <p className="font-semibold">&#8373;{product.sale_price.toFixed(2)}</p>
      </div>

      <div
        className={classNames(
          "hidden group-hover:flex",
          "justify-between gap-4"
        )}
      >
        <Button
          className="bg-primary text-white rounded-full flex items-center justify-between w-full"
          onClick={(ev) => {
            ev.stopPropagation();
            addToCart({ product, store, setStore });
          }}
        >
          <p className="text-sm font-semibold">Add to cart</p>
          <div className="flex items-center justify-center w-8 h-8 bg-white rounded-full">
            <ShoppingCartIcon className={"w-5 h-5 stroke-2 text-primary"} />
          </div>
        </Button>

        <CartCheckout view="checkout">
          {({ proceed }) => (
            <Button
              className="w-[56px] h-[56px] bg-primary text-white rounded-full flex items-center justify-center"
              onClick={(ev) => {
                ev.stopPropagation();
                buyNow({ product, store, setStore });
                setTimeout(proceed);
              }}
            >
              <ShoppingBagIcon className="w-6 h-6 stroke-2" />
            </Button>
          )}
        </CartCheckout>
      </div>
    </div>
  );
};
