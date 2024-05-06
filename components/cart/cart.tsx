"use client";

import React, { useState } from "react";

import { CartCheckoutSection, CartItem } from ".";
import { Button } from "@/components";
import { useStore } from "@/hooks";

export const Cart = ({
  setOpen,
  setSection,
}: {
  setOpen: (open: boolean) => void;
  setSection: (section: CartCheckoutSection["section"]) => void;
}) => {
  const { store } = useStore();

  return (
    <>
      <div className="flex flex-col divide-y">
        {store.cart?.map((item, i) => (
          <CartItem {...{ item }} key={i} />
        ))}
      </div>

      <div className="flex flex-col gap-4 sticky bottom-0 bg-white dark:bg-neutral-gray">
        <div className="flex justify-between">
          <p className="text-2xl font-semibold">Total</p>
          <p className="text-2xl font-semibold text-primary">
            &#8373;
            {store.cart
              ?.reduce((acc, item) => acc + item.quantity * item.price, 0)
              .toFixed(2)}
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-4">
          <Button
            className="btn-lg btn-outline-primary w-full"
            onClick={() => {
              setSection("cart");
              setOpen(false);
            }}
          >
            Continue shopping
          </Button>

          <Button
            className="btn-lg btn-primary w-full"
            onClick={() => {
              setSection("checkout");
            }}
          >
            Checkout
          </Button>
        </div>
      </div>
    </>
  );
};
