"use client";

import { ReactNode, useState } from "react";
import { motion } from "framer-motion";

import { Cart, Checkout, DeliveryDetails } from ".";
import { OrderComplete } from "./order-complete";
import { SlideOver } from "..";

export interface CartCheckoutSection {
  section: "cart" | "checkout" | "delivery" | "complete";
}

export const CartCheckout = ({
  view,
  children,
}: {
  view?: CartCheckoutSection["section"];
  children: (props: { proceed: () => void }) => ReactNode;
}) => {
  const [open, setOpen] = useState(false);
  const [section, setSection] = useState<CartCheckoutSection["section"]>(
    view ?? "cart"
  );

  return (
    <>
      {children({ proceed: () => setOpen(true) })}

      <SlideOver
        show={open}
        title="Cart"
        onHide={() => {
          setSection("cart");
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
