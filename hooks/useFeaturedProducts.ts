"use client";

import useSWR, { SWRResponse } from "swr";
import queryString from "query-string";

import { IApiResponse, IProduct } from "@/types";

export type ProductsProps = {
  docs: IProduct[];
  limit: number;
  page: number;
  pages: number;
  total: number;
};

export const useFeaturedProducts = (queries?: {
  [x: string]: any;
}): SWRResponse<IApiResponse> => {
  /**
   * variables
   */
  const key = `/public/products/featured?${queryString.stringify(
    { ...queries },
    { skipEmptyString: true, skipNull: true }
  )}`;

  /**
   * api
   */
  return useSWR<IApiResponse>(key, null, {
    refreshInterval: 1000 * 60 * 60 * 10,
  });
};
