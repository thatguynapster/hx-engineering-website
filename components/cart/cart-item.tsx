"use client";

import { TrashIcon } from "@heroicons/react/24/outline";
import Image from "next/image";

import { useStore } from "@/hooks";
import { ICart } from "@/types";
import { classNames } from "@/libs";

export const CartItem = ({
  checkout = false,
  item,
}: //   remove,
{
  checkout?: boolean;
  item: ICart;
  //   remove: () => void;
}) => {
  if (!item) {
    // If item is null or undefined, return null to render nothing
    return null;
  }

  const { store, setStore } = useStore();
  let items = store.cart ?? [];
  if (store.instant_buy) {
    items = [store.instant_buy];
  }
  const itemIdx = items?.findIndex((itm) => itm._id === item._id);

  const removeItem = () => {
    if (items) {
      items.splice(itemIdx, 1);
      if (store.instant_buy) {
        return setStore({ ...store, instant_buy: items[0] });
      }
      setStore({ ...store, cart: items });
    }
  };

  const productErrorMessage = () => {
    if (store.unavailable_products?.includes(item._id)) {
      return "Low stock";
    }
    if (store.missing_products?.includes(item._id)) {
      return "Product not available";
    }
    return null;
  };

  return (
    <div className="flex flex-col gap-1 py-2">
      <div className="flex gap-4 items-center">
        <div className="flex gap-4 w-full">
          <Image
            width={80}
            height={80}
            alt=""
            src={item.image ?? "/img/sample_product.png"}
            className="object-contain rounded-lg lg:rounded-2xl"
            sizes="(max-width: 768px) 10vw, (max-width: 1024px) 20vw"
          />

          <div className="w-full h-full flex-grow">
            <h1 className="line-clamp-2 text-primary font-semibold text-sm">
              {item.name}
            </h1>
          </div>
        </div>

        <div className="flex flex-col gap-2 items-center">
          {checkout && (
            <span className="px-2 text-neutral-40">x {item.quantity}</span>
          )}
          {!checkout && (
            <CartQuantity
              incrementQuantity={() => {
                incrementQuantity(items, itemIdx).then((items) => {
                  setStore({ ...store, cart: items });
                });
              }}
              decrementQuantity={() => {
                decrementQuantity(items, item, itemIdx).then((items) => {
                  items && setStore({ ...store, cart: items });
                });
              }}
              quantity={item.quantity}
            />
          )}

          <p className="font-medium">
            &#8373;{(item.price * item.quantity).toFixed(2)}
          </p>
        </div>

        <div className="w-max cursor-pointer" onClick={removeItem}>
          <TrashIcon className="w-6 h-6 text-error" />
        </div>
      </div>
      {productErrorMessage && (
        <p
          className={classNames(
            "text-error text-sm text-center",
            "bg-error/10 rounded-lg",
            "font-medium"
          )}
        >
          {productErrorMessage()}
        </p>
      )}
    </div>
  );
};

const incrementQuantity = async (
  items: ICart[],
  itemIdx: number
): Promise<ICart[]> => {
  if (items) {
    items[itemIdx] = {
      ...items[itemIdx],
      quantity: items[itemIdx].quantity + 1,
    };
    return items;
  }
};

const decrementQuantity = async (
  items: ICart[],
  item: ICart,
  itemIdx: number
): Promise<ICart[]> => {
  if (items && item.quantity > 1) {
    items[itemIdx] = {
      ...items[itemIdx],
      quantity: items[itemIdx].quantity - 1,
    };
    return items;
  }
};

export const CartQuantity = ({
  quantity,
  decrementQuantity,
  incrementQuantity,
}: {
  quantity: ICart["quantity"];
  decrementQuantity: () => void;
  incrementQuantity: () => void;
}) => {
  return (
    <div className="flex gap-2 font-medium">
      <button
        className="px-2 cursor-pointer disabled:text-neutral-30"
        disabled={quantity <= 1}
        onClick={decrementQuantity}
      >
        -
      </button>
      <span className="px-2">{quantity}</span>
      <button
        disabled={quantity === 0}
        className="px-2 cursor-pointer disabled:text-neutral-30"
        onClick={incrementQuantity}
      >
        +
      </button>
    </div>
  );
};
