"use client";

import { ReactNode, useEffect, useState } from "react";
import { motion } from "framer-motion";

import { Cart, Checkout, DeliveryDetails } from ".";
import { OrderComplete } from "./order-complete";
import { SlideOver } from "..";
import { useStore } from "@/hooks";

export interface CartCheckoutSection {
  section: "cart" | "checkout" | "delivery" | "complete";
}

export const CartCheckout = ({
  view = "cart",
  children,
}: {
  view?: CartCheckoutSection["section"];
  children: (props: { proceed: () => void }) => ReactNode;
}) => {
  const { setStore } = useStore();
  const [open, setOpen] = useState(false);
  const [section, setSection] = useState<CartCheckoutSection["section"]>(view);

  return (
    <>
      {children({ proceed: () => setOpen(true) })}

      <SlideOver
        show={open}
        title={section}
        onHide={() => {
          if (view === "checkout") {
            setSection("checkout");
          } else {
            setSection("cart");
          }
          setStore((prev) => {
            return { ...prev, instant_buy: null };
          });
          setOpen(false);
        }}
      >
        {section === "cart" && (
          <motion.span
            animate="show"
            exit="hidden"
            initial="hidden"
            transition={{ delay: 0.1, duration: 0.3 }}
            variants={{
              show: { x: 0, opacity: 1 },
              hidden: { x: "100%", opacity: 0 },
            }}
            className="flex flex-col px-4 sm:px-6 gap-4 h-full justify-between"
          >
            <Cart {...{ setOpen, setSection }} />
          </motion.span>
        )}

        {section === "checkout" && (
          <motion.div
            animate="show"
            exit="hidden"
            initial="hidden"
            transition={{ delay: 0.1, duration: 0.3 }}
            variants={{
              show: { x: 0, opacity: 1 },
              hidden: { x: "100%", opacity: 0 },
            }}
            className="flex flex-col px-4 sm:px-6 gap-4 h-full justify-between"
          >
            <Checkout {...{ setOpen, setSection }} />
          </motion.div>
        )}

        {section === "delivery" && (
          <motion.div
            animate="show"
            exit="hidden"
            initial="hidden"
            transition={{ delay: 0.1, duration: 0.3 }}
            variants={{
              show: { x: 0, opacity: 1 },
              hidden: { x: "100%", opacity: 0 },
            }}
            className="flex flex-col px-4 sm:px-6 gap-4 h-full justify-between"
          >
            <DeliveryDetails {...{ setOpen, setSection }} />
          </motion.div>
        )}

        {section === "complete" && (
          <motion.span
            animate="show"
            exit="hidden"
            initial="hidden"
            transition={{ delay: 0.1, duration: 0.3 }}
            variants={{
              show: { x: 0, opacity: 1 },
              hidden: { x: "100%", opacity: 0 },
            }}
            className="flex flex-col px-4 sm:px-6 gap-8 h-full justify-center items-center"
          >
            <OrderComplete {...{ setOpen, setSection }} />
          </motion.span>
        )}
      </SlideOver>
    </>
  );
};
``;
