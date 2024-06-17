"use client";

import { Form, Formik } from "formik";
import toast from "react-hot-toast";
import { object } from "yup";
import React from "react";

import { purchaseProductService } from "@/services";
import { Button, Field } from "@/components";
import { CartCheckoutSection } from ".";
import { useStore } from "@/hooks";
import { ISales } from "@/types";
import { schema } from "@/libs";
import { CheckCircleIcon } from "@heroicons/react/24/outline";

export const OrderComplete = ({
  setOpen,
  setSection,
}: {
  setOpen: (open: boolean) => void;
  setSection: (section: CartCheckoutSection["section"]) => void;
}) => {
  const { store, setStore } = useStore();

  const subtotal = store.cart
    ?.reduce((acc, item) => acc + item.quantity * item.price, 0)
    .toFixed(2);
  const total = subtotal;

  return (
    <>
      <div className="flex flex-col divide-y">
        {/* <div className="flex items-center justify-center w-20 h-20 rounded-full border-2 border-success"> */}
        <CheckCircleIcon className="w-32 h-32 text-success" />
        {/* </div> */}
      </div>

      <div className="flex flex-col">
        <h1 className="text-lg font-semibold">Your order is confirmed</h1>
        <p className="font-medium text-neutral-40">
          You will be contacted soon
        </p>
      </div>

      <div className="flex flex-col gap-4 sticky bottom-0 bg-white dark:bg-neutral-gray w-full">
        <Button
          className="btn-lg btn-primary w-full"
          type="button"
          onClick={() => {
            setSection("cart");
            setTimeout(() => {
              setOpen(false);
            });
          }}
        >
          Close
        </Button>
      </div>
    </>
  );
};
