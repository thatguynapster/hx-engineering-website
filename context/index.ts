"use client";

import { ICart } from "@/types";
import { Dispatch, SetStateAction, createContext } from "react";

export interface StoreInterface {
  cart: ICart[];
  instant_buy: ICart;
  unavailable_products?: string[];
  missing_products?: string[];
}

export const StoreContext = createContext<{
  store: Partial<StoreInterface>;
  setStore: Dispatch<SetStateAction<Partial<StoreInterface>>>;
}>({
  store: {},
  setStore: () => null,
});
