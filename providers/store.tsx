"use client";

import { useEffect, useState } from "react";
import { useSWRConfig } from "swr";

import { StoreContext, StoreInterface } from "@/context";
import { injectLogout, injectStore } from "@/libs";

export function StoreProvider({ children }: { children: any }) {
  const { mutate } = useSWRConfig();

  const [store, setStore] = useState<Partial<StoreInterface>>(() => {
    if (typeof window !== "undefined") {
      const store = window.localStorage.getItem(
        process.env["NEXT_PUBLIC_STORAGE_KEY"]!
      );

      if (store) {
        return JSON.parse(store);
      }
    }

    return null;
  });

  const logout = () => {
    setStore({});

    if (typeof window !== undefined) {
      window.localStorage.clear();
    }

    mutate(() => true, undefined, false);
  };

  useEffect(() => {
    if (store) {
      window.localStorage.setItem(
        process.env["NEXT_PUBLIC_STORAGE_KEY"]!,
        JSON.stringify(store)
      );
    }

    injectStore({ ...store });
    injectLogout(() => logout());
  }, [store]);

  return (
    <StoreContext.Provider value={{ store: { ...store }, setStore }}>
      {children}
    </StoreContext.Provider>
  );
}
