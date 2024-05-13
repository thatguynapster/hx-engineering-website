"use client";

import queryString from "query-string";
import useSWR, { SWRResponse } from "swr";

import { IApiResponse } from "@/types";

export const useProducts = (queries?: {
  [x: string]: any;
}): SWRResponse<IApiResponse> => {
  /**
   * variables
   */
  const key = `/public/products?${queryString.stringify(
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
