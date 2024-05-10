import { Dispatch, SetStateAction } from "react";
import { StoreInterface } from "@/context";
import { ICart, IProduct } from "@/types";
import toast from "react-hot-toast";

export const addToCart = (
  product: IProduct,
  store: Partial<StoreInterface>,
  setStore: Dispatch<SetStateAction<Partial<StoreInterface>>>
) => {
  const cart = store.cart;
  let cartItems: ICart[] = [];
  if (cart) {
    cartItems = cart;
  }

  let existingItemIndex = cartItems.findIndex(
    (item) => item._id === product._id
  );

  // update cart based when product already exists
  if (existingItemIndex !== -1) {
    cartItems[existingItemIndex] = {
      ...cartItems[existingItemIndex],
      quantity: cartItems[existingItemIndex].quantity + 1,
    };
  } else {
    // product does not exist
    cartItems.push({
      _id: product._id,
      name: product.name,
      quantity: 1,
      available_quantity: product.quantity,
      price: product.sale_price,
      image: product.images?.[0],
    });
  }

  setStore({ ...store, cart: cartItems });
  toast.success(`"${product.name}" added to cart`);
};
