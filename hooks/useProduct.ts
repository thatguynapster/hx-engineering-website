import useSWR, { SWRResponse } from "swr";
import queryString from "query-string";
import { IProduct } from "@/types";

export function useProduct(
  id?: string,
  queries?: Partial<{
    [x: string]: any;
  }>
): SWRResponse<IProduct> {
  const key =
    id && `/public/products/${id}?${queryString.stringify({ ...queries })}`;

  return useSWR<IProduct>(key, null, {
    refreshInterval: 1000 * 60 * 60 * 10,
  });
}
