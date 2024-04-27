import {
  Bars3Icon,
  MapPinIcon,
  ShoppingCartIcon,
} from "@heroicons/react/24/outline";
import Image from "next/image";
import React from "react";

import { business } from "@/configs/business";
import { classNames } from "@/libs";
import Link from "next/link";

export const Navbar = ({ setToggle }: { setToggle: (t: boolean) => void }) => {
  return (
    <div
      className={classNames(
        "sticky top-0 z-40 flex flex-col gap-x-4 px-4 sm:px-6 md:px-12",

        "bg-white dark:bg-neutral-gray"
      )}
    >
      {/* top bar */}
      <div className="flex justify-between">
        <p className="text-sm">Need help? Call {business.phone}</p>
        <div className="flex gap-5">
          <MapPinIcon className="w-5 h-5" />
          Our Store
        </div>
      </div>

      {/* main nav */}
      <div className="flex justify-between">
        <button
          type="button"
          className="-m-2.5 p-2.5 dark:text-neutral-10 lg:hidden"
          onClick={() => setToggle(true)}
        >
          <span className="sr-only">Open sidebar</span>
          <Bars3Icon className="h-6 w-6" aria-hidden="true" />
        </button>

        <div className="hidden lg:flex flex-1 justify-between gap-6">
          <div className="flex items-center gap-6">
            <div className="relative h-[48px] w-[232px]">
              <Image src="/img/logo-long.png" fill alt="HX Logo" />
            </div>
            <div className="flex gap-6">
              <Link href="#">Home</Link>
              <Link href="#">About us</Link>
              <Link href="#">Shop</Link>
            </div>
          </div>

          <div className="flex gap-1 items-center">
            <ShoppingCartIcon className="w-6 h-6 text-primary" />
            <div className="bg-secondary px-1.5 py-0.5 text-xs text-white rounded-full">
              0
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
