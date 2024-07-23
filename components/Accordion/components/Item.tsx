"use client";

import { HtmlHTMLAttributes, useState } from "react";
import { ChevronDownIcon, MinusIcon } from "@heroicons/react/24/outline";
import { AnimatePresence, motion } from "framer-motion";
import { v4 } from "uuid";
import styled from "styled-components";
import { classNames } from "@/libs";

// eslint-disable-next-line
export interface ItemProps extends HtmlHTMLAttributes<HTMLElement> {
  header: any;
  defaultOpen?: boolean;
  headerClassName?: string;
  contentClassName?: string;
}

export default function Item({
  header,
  children,
  className,
  headerClassName,
  contentClassName,
  defaultOpen = false,
  ...props
}: ItemProps) {
  /**
   * variables
   */
  const id = v4();

  /**
   * state
   */
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className={classNames(className)}>
      <button
        type="button"
        aria-controls={id}
        onClick={() => setOpen(!open)}
        aria-expanded={open ? "true" : "false"}
        className={classNames(
          "flex items-center justify-between w-full py-[3px]"
        )}
      >
        <div className={classNames("font-medium text-sm", headerClassName)}>
          {header}
        </div>
        <span role="img" className="text-muted">
          {open ? (
            <MinusIcon className="w-5 h-5 stroke-[2.5px]" />
          ) : (
            <ChevronDownIcon className="w-5 h-5 stroke-[2.5px]" />
          )}
        </span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id={id}
            exit="closed"
            initial="closed"
            animate="opened"
            aria-labelledby={id}
            variants={{
              closed: { opacity: 0, height: 0 },
              opened: { opacity: 1, height: "auto" },
            }}
            className={classNames("overflow-hidden", "pt-2")}
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
