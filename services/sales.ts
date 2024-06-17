import { http } from "@/libs";
import { ISales } from "@/types";

export const purchaseProductService = (payload: Partial<ISales>) =>
  http.post<never, any>(`/public/sales`, payload);
