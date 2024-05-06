"use client";

import { TrashIcon } from "@heroicons/react/24/outline";
import Image from "next/image";

import { useStore } from "@/hooks";
import { ICart } from "@/types";

export const CartItem = ({
  checkout = false,
  item,
}: //   remove,
{
  checkout?: boolean;
  item: ICart;
  //   remove: () => void;
}) => {
  const { store, setStore } = useStore();
  const items = store.cart ?? [];
  const itemIdx = items?.findIndex((itm) => itm._id === item._id)!;

  const incrementQuantity = () => {
    if (items) {
      items[itemIdx] = {
        ...items[itemIdx],
        quantity: items[itemIdx].quantity + 1,
      };
      setStore({ ...store, cart: items });
    }
  };

  const decrementQuantity = () => {
    if (items && item.quantity > 1) {
      items[itemIdx] = {
        ...items[itemIdx],
        quantity: items[itemIdx].quantity - 1,
      };
      setStore({ ...store, cart: items });
    }
  };

  const removeItem = () => {
    if (items) {
      items.splice(itemIdx, 1);
      setStore({ ...store, cart: items });
    }
  };

  return (
    <div className="flex gap-4 items-center py-2">
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
          <div className="flex gap-2 font-medium">
            <span className="px-2 cursor-pointer" onClick={decrementQuantity}>
              -
            </span>
            <span className="px-2">{item.quantity}</span>
            <span className="px-2 cursor-pointer" onClick={incrementQuantity}>
              +
            </span>
          </div>
        )}

        <p className="font-medium">
          &#8373;{(item.price * item.quantity).toFixed(2)}
        </p>
      </div>

      <div className="w-max cursor-pointer" onClick={removeItem}>
        <TrashIcon className="w-6 h-6 text-error" />
      </div>
    </div>
  );
};
