import { ICategory } from "./category";

export interface IProduct {
  _id: string;
  category: string;
  category_details?: ICategory;
  details: string;
  features?: { [key: string]: string | number };
  is_deleted: boolean;
  is_dev: boolean;
  images: string[];
  name: string;
  sale_price: number;
  cost_price: number;
  quantity: number;
}
