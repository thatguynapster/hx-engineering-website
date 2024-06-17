"use client";

import { Toaster } from "react-hot-toast";
import { SWRConfig } from "swr";

import { useStore } from "../hooks";
import { http } from "@/libs";
import { MapProvider } from "./map";

export function AppProvider({ children }: { children: any }) {
  return (
    <>
      <SWRConfig
        value={{
          fetcher: (url) =>
            http
              .get(url, {
                params: {},
                headers: {},
              })
              .then((response) => response),
          dedupingInterval: 1000 * 60 * 1,
          shouldRetryOnError: false,
          revalidateOnFocus: false,
        }}
      >
        <MapProvider>{children}</MapProvider>
      </SWRConfig>
      <Toaster position="top-right" toastOptions={{ duration: 5000 }} />
    </>
  );
}
