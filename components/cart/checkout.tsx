"use client";

import React from "react";

import { CartCheckoutSection, CartItem } from ".";
import { Button } from "@/components";
import { useStore } from "@/hooks";
import { classNames } from "@/libs";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import { addToCart, mergeInstantBuyWithCart } from "@/functions";

export const Checkout = ({
  setSection,
}: {
  setSection: (section: CartCheckoutSection["section"]) => void;
}) => {
  const { store, setStore } = useStore();

  const subtotal = store.instant_buy
    ? (store.instant_buy?.quantity * store.instant_buy?.price).toFixed(2)
    : store.cart
        ?.reduce((acc, item) => acc + item.quantity * item.price, 0)
        .toFixed(2);

  const total = subtotal;

  return (
    <>
      <div className="flex flex-col divide-y">
        {store.instant_buy ? (
          <CartItem checkout item={store.instant_buy} />
        ) : null}

        {!store.instant_buy &&
          store.cart?.map((item, i) => (
            <CartItem checkout {...{ item }} key={i} />
          ))}
      </div>

      {store.instant_buy && store.cart.length ? (
        <div className="flex flex-col gap-4 justify-between">
          <div
            className={classNames(
              "bg-warning/10 rounded-lg",
              "text-warning",
              "flex flex-col",
              "py-2 px-4",
              "gap-4 items-center"
            )}
          >
            <ExclamationTriangleIcon className="w-12 h-12" />
            <p className={classNames("text-sm text-center", "font-medium")}>
              You have items in your cart. Complete the purchase for them.
            </p>
          </div>

          <div className="flex flex-col lg:flex-row gap-4">
            <Button
              className="btn-outline-primary w-full"
              onClick={() => {
                setSection("delivery");
              }}
            >
              Buy just this item
            </Button>

            {store.cart.length ? (
              <Button
                className="btn-primary w-full"
                onClick={() => {
                  mergeInstantBuyWithCart(store.instant_buy, store, setStore);
                }}
              >
                Add cart items
              </Button>
            ) : null}
          </div>
        </div>
      ) : null}

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
