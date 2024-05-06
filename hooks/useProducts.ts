"use client";

import useSWR, { SWRResponse } from "swr";
import queryString from "query-string";

import { IProduct } from "@/types";

export type ProductsProps = {
  docs: IProduct[];
  limit: number;
  page: number;
  pages: number;
  total: number;
};

export function useProducts(queries?: {
  [x: string]: any;
}): SWRResponse<ProductsProps> {
  /**
   * variables
   */
  const key = `/public/products?${queryString.stringify(
    { ...queries },
    { skipEmptyString: true, skipNull: true }
  )}`;
  console.log(key);

  /**
   * api
   */
  return useSWR<ProductsProps>(key, null, {
    refreshInterval: 1000 * 60 * 60 * 10,
  });
}

export default useProducts;
