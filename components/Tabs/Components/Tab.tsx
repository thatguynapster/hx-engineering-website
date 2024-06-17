"use client";

import { classNames } from "@/libs";
import { useNavItem, NavItemProps } from "@restart/ui/NavItem";

export interface TabProps extends NavItemProps {}

export function Tab({ eventKey, as: Component = "a", ...props }: TabProps) {
  const [navItemProps, meta] = useNavItem({
    key: eventKey as string,
  });

  return (
    <Component
      {...props}
      {...navItemProps}
      className={classNames(
        "py-3 px-6 rounded-full",
        "text-lg lg:text-xl text-center font-medium",
        "lg:py-4 lg:px-6",
        "cursor-pointer",
        "bg-white",
        meta.isActive
          ? "bg-primary text-white"
          : "border border-primary text-primary"
      )}
    />
  );
}

export default Tab;
