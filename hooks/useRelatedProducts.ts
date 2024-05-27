"use client";

import queryString from "query-string";
import useSWR, { SWRResponse } from "swr";

import { IApiResponse } from "@/types";

export const useRelatedProducts = (
  id?: string,
  queries?: {
    [x: string]: any;
  }
): SWRResponse<IApiResponse> => {
  /**
   * variables
   */
  const key =
    id &&
    `public/products/${id}/related?${queryString.stringify(
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
