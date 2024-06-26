import { Dispatch, SetStateAction } from "react";
import { StoreInterface } from "@/context";
import { ICart, IProduct } from "@/types";
import toast from "react-hot-toast";

export const addToCart = ({
  product,
  quantity = 1,
  store,
  setStore,
}: {
  product: IProduct;
  quantity?: number;
  store: Partial<StoreInterface>;
  setStore: Dispatch<SetStateAction<Partial<StoreInterface>>>;
}) => {
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
      quantity: cartItems[existingItemIndex].quantity + quantity,
    };
  } else {
    // product does not exist
    cartItems.push({
      _id: product._id,
      name: product.name,
      quantity,
      available_quantity: product.quantity,
      price: product.sale_price,
      image: product.images?.[0],
    });
  }

  setStore({ ...store, cart: cartItems });
  toast.success(`"${product.name}" added to cart`);
};

export const buyNow = ({
  product,
  quantity = 1,
  store,
  setStore,
}: {
  product: IProduct;
  quantity?: number;
  store: Partial<StoreInterface>;
  setStore: Dispatch<SetStateAction<Partial<StoreInterface>>>;
}) => {
  setStore({
    ...store,
    instant_buy: {
      _id: product._id,
      name: product.name,
      quantity,
      available_quantity: product.quantity,
      price: product.sale_price,
      image: product.images?.[0],
    },
  });
};

export const mergeInstantBuyWithCart = (
  item: ICart,
  store: Partial<StoreInterface>,
  setStore: Dispatch<SetStateAction<Partial<StoreInterface>>>
) => {
  const cart = store.cart;
  let cartItems: ICart[] = [];
  if (cart) {
    cartItems = cart;
  }

  let existingItemIndex = cartItems.findIndex(
    (c_item) => c_item._id === item._id
  );

  // update cart based when product already exists
  if (existingItemIndex !== -1) {
    cartItems[existingItemIndex] = {
      ...cartItems[existingItemIndex],
      quantity: cartItems[existingItemIndex].quantity + item.quantity,
    };
  } else {
    // product does not exist
    cartItems.push(item);
  }

  setStore((prev) => {
    return { ...prev, cart: cartItems, instant_buy: null };
  });

  toast.success(`cart added to checkout`);
};

export const checkoutInstantBuy = (
  store: Partial<StoreInterface>,
  setStore: Dispatch<SetStateAction<Partial<StoreInterface>>>
) => {
  let s_store = { ...store };
  delete s_store.cart;
  s_store.cart = [s_store.instant_buy];
  delete s_store.instant_buy;

  setStore((prev) => {
    return s_store;
  });
};
