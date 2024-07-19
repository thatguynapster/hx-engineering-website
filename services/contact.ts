import { http } from "@/libs";

export const contactService = (payload: {
  name: string;
  email: string;
  message: string;
}) => http.post<never, any>(`/public/contact`, payload);
