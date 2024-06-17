"use client";

import { ReactNode } from "react";
import { Nav, Tabs as RestartTabs, TabsProps } from "@restart/ui";

import { Tab } from "./Components/Tab";
import { classNames } from "@/libs";

export interface LocalTabsProps extends TabsProps {
  tabs: { name: any; slug: string; component: ReactNode }[];
  navClassName?: string;
  componentClassName?: string;
}

export const Tabs = ({
  tabs,
  onSelect,
  activeKey,
  navClassName,
  componentClassName,
  ...props
}: LocalTabsProps) => {
  const tab = tabs.find((i) => i.slug === activeKey);
  return (
    <RestartTabs
      {...{ activeKey, ...props }}
      onSelect={(key, e) => key && onSelect?.(String(key), e)}
    >
      <Nav
        className={classNames(
          "overflow-x-auto whitespace-nowrap",
          "flex flex-col sm:flex-row",
          "gap-1 sm:gap-6",
          "px-6 w-full",
          navClassName
        )}
      >
        {tabs.map((tab, key) => (
          <Tab eventKey={tab.slug} key={key}>
            {tab.name}
          </Tab>
        ))}
      </Nav>
      <div className={classNames(componentClassName || "py-6")}>
        {tab && tab.component}
      </div>
    </RestartTabs>
  );
};
