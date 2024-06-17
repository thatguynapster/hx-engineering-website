import { routes } from "@/routes";

export const navigation = [
  {
    name: "About us",
    href: routes.about,
    current: false,
  },
  {
    name: "Shop",
    href: routes.products.all,
    current: false,
  },
];
