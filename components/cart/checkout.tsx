"use client";

import React, { useState } from "react";

import { CartCheckoutSection, CartItem } from ".";
import { Button } from "@/components";
import { useStore } from "@/hooks";

export const Checkout = ({
  setOpen,
  setSection,
}: {
  setOpen: (open: boolean) => void;
  setSection: (section: CartCheckoutSection["section"]) => void;
}) => {
  const { store } = useStore();

  const subtotal = store.cart
    ?.reduce((acc, item) => acc + item.quantity * item.price, 0)
    .toFixed(2);
  const total = subtotal;

  return (
    <>
      <div className="flex flex-col divide-y">
        {store.cart?.map((item, i) => (
          <CartItem checkout {...{ item }} key={i} />
        ))}
      </div>

      <div className="flex flex-col gap-4 sticky bottom-0 bg-white dark:bg-neutral-gray">
        <div className="flex flex-col">
          <div className="py-3 bg-primary/10 dark:bg-neutral-gray dark:border dark:border-white">
            <p className="text-lg font-medium text-center">Cart total</p>
          </div>

          <div className="flex flex-col divide-y px-4">
            <div className="flex justify-between py-3">
              <p>Subtotal</p>
              <p>
                &#8373;
                {subtotal}
              </p>
            </div>
            <div className="flex justify-between py-3 text-lg font-medium">
              <p>Subtotal</p>
              <p>
                &#8373;
                {total}
              </p>
            </div>
          </div>
        </div>

        <Button
          className="btn-lg btn-primary w-full"
          onClick={() => {
            setSection("delivery");
          }}
        >
          Proceed to delivery
        </Button>
      </div>
    </>
  );
};
