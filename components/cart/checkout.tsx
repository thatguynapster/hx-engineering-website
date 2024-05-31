"use client";

import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import React from "react";

import { checkoutInstantBuy, mergeInstantBuyWithCart } from "@/functions";
import { CartCheckoutSection, CartItem } from ".";
import { Button } from "@/components";
import CartTotal from "./cart-total";
import { classNames } from "@/libs";
import { useStore } from "@/hooks";

export const Checkout = ({
  setOpen,
  setSection,
}: {
  setOpen: (open: boolean) => void;
  setSection: (section: CartCheckoutSection["section"]) => void;
}) => {
  const { store, setStore } = useStore();
  const cart = store.cart ?? [];

  return (
    <>
      <div className="flex flex-col divide-y">
        {store.instant_buy ? (
          <CartItem checkout item={store.instant_buy} />
        ) : null}

        {!store.instant_buy &&
          cart?.map((item, i) => <CartItem checkout {...{ item }} key={i} />)}
      </div>

      {store.instant_buy && cart?.length ? (
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
                checkoutInstantBuy(store, setStore);
                setSection("delivery");
              }}
            >
              Buy just this item
            </Button>

            {cart.length ? (
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
        <CartTotal />

        {!(store.instant_buy && cart) ? (
          <Button
            className="btn-lg btn-outline-primary w-full"
            onClick={() => {
              setSection("cart");
              setOpen(false);
            }}
          >
            Continue shopping
          </Button>
        ) : (
          <Button
            className="btn-lg btn-primary w-full"
            onClick={() => {
              setSection("delivery");
            }}
          >
            Proceed to delivery
          </Button>
        )}
      </div>
    </>
  );
};
