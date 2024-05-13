"use client";

import React from "react";

import { useStore } from "@/hooks";

const CartTotal = () => {
  const { store, setStore } = useStore();

  const subtotal = store.instant_buy
    ? (store.instant_buy?.quantity * store.instant_buy?.price).toFixed(2)
    : store.cart
        ?.reduce((acc, item) => acc + item.quantity * item.price, 0)
        .toFixed(2);

  const total = subtotal;
  return (
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
          <p>Total</p>
          <p>
            &#8373;
            {total}
          </p>
        </div>
      </div>
    </div>
  );
};

export default CartTotal;
