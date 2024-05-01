"use client";

import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import Image from "next/image";

import { usePathname } from "next/navigation";
import { classNames } from "@/libs";
import { routes } from "@/routes";

const navigation = [
  {
    name: "Home",
    href: routes.home.index,
    current: true,
  },
  {
    name: "About us",
    href: routes.about.index,
    current: false,
  },
  {
    name: "Shop",
    href: routes.shop.index,
    current: false,
  },
];

export const Sidebar = ({
  toggle,
  setToggle,
}: {
  toggle: boolean;
  setToggle: (t: boolean) => void;
}) => {
  const pathname = usePathname();

  const handleActive = (link: string) => {
    return pathname.startsWith(link);
  };

  return (
    <Transition.Root show={toggle} as={Fragment}>
      <Dialog as="div" className="relative z-50 lg:hidden" onClose={setToggle}>
        <Transition.Child
          as={Fragment}
          enter="transition-opacity ease-linear duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-opacity ease-linear duration-300"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-neutral-gray/50" />
        </Transition.Child>

        <div className="fixed inset-0 flex">
          <Transition.Child
            as={Fragment}
            enter="transition ease-in-out duration-300 transform"
            enterFrom="-translate-x-full"
            enterTo="translate-x-0"
            leave="transition ease-in-out duration-300 transform"
            leaveFrom="translate-x-0"
            leaveTo="-translate-x-full"
          >
            <Dialog.Panel className="relative mr-16 flex w-full max-w-xs flex-1">
              <Side {...{ handleActive }} />
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

const Side = ({ handleActive }: { handleActive: (key: string) => boolean }) => {
  return (
    <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-white dark:bg-neutral-gray px-6 pb-4">
      <div className="flex h-16 shrink-0 items-center">
        <Image
          src={"/img/logo-long.png"}
          alt={"HX logo"}
          width={232}
          height={48}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw"
          priority
        />
      </div>
      <nav className="flex flex-1 flex-col">
        <ul role="list" className="flex flex-1 flex-col gap-y-7">
          <li>
            <ul role="list" className="-mx-2 space-y-1">
              {navigation.map((item, i) => (
                <NavItem key={i} {...{ item, handleActive }} />
              ))}
            </ul>
          </li>
        </ul>
      </nav>
    </div>
  );
};

const NavItem = ({
  item,
  handleActive,
}: {
  item: any;
  handleActive: (key: string) => boolean;
}) => {
  return (
    <li key={item.name}>
      <a
        href={item.href}
        className={classNames(
          handleActive(item.href)
            ? "text-primary"
            : "text-neutral-40 dark:text-neutral-30",
          "text-sm leading-6 font-semibold",
          "group hover:text-primary",
          "flex items-center gap-x-3",
          "rounded-md p-2"
        )}
      >
        {item.icon && (
          <item.icon
            className={classNames(
              "h-8 w-8 shrink-0",
              "group-hover:text-primary"
            )}
            aria-hidden="true"
          />
        )}
        {item.name}
      </a>
    </li>
  );
};
