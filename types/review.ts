export type IReview = {
  _id: string;
  text: string;
  product: string;
  rating: number;
  is_dev: boolean;
  user: {
    _id?: string;
    name: string;
    phone: string;
    email?: string;
  };
};
