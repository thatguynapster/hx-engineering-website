"use client";

import React, { useRef, useState } from "react";
import parse from "html-react-parser";
import toast from "react-hot-toast";
import { CheckIcon, ShareIcon, XMarkIcon } from "@heroicons/react/24/outline";

import {
  Button,
  ImagePreviewSlider,
  LocalTabsProps,
  ProductCard,
  Skeleton,
  Slider,
  Tabs,
} from "@/components";
import { useProduct, useRelatedProducts, useStore } from "@/hooks";
import { CartCheckout, CartQuantity } from "@/components";
import { classNames } from "@/libs";
import { addToCart, buyNow } from "@/functions";
import Pill from "@/components/pill";
import { IProduct } from "@/types";

export default function Page({ params }: { params: { productID: string } }) {
  const { store, setStore } = useStore();
  const detailsRef = useRef<HTMLDivElement>();

  const [itemQty, setItemQty] = useState(1);
  const { productID } = params;

  const {
    data: product,
    isLoading,
    error,
  } = useProduct(productID, { category_details: true });

  const {
    data: relatedProducts,
    isLoading: relatedProductsLoading,
    error: relatedProductsError,
  } = useRelatedProducts(productID);
  console.log(relatedProducts);

  const tabs: LocalTabsProps["tabs"] = [
    {
      name: "Description",
      slug: "description",
      component: (
        <div
          ref={detailsRef}
          className={classNames("border border-neutral-30", "p-4 rounded-2xl")}
        >
          {parse(product?.details ?? "")}
        </div>
      ),
    },
    // {
    //   name: "Reviews",
    //   slug: "reviews",
    //   component: <></>,
    // },
  ];
  const [activeTab, setActiveTab] = useState(tabs[0]);

  return (
    <div className="flex flex-col gap-16">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 w-full">
        {isLoading && (
          <>
            <Skeleton.ProductImagePreview />
            <Skeleton.ProductDetails />
          </>
        )}
        {product && (
          <>
            <ImagePreviewSlider images={product.images} alt={product.name} />
            <div className="w-full flex flex-col divide-y divide-neutral-30">
              <div className="flex flex-col gap-4 p-4">
                <h1 className="text-3xl font-medium capitalize">
                  {product.name}
                </h1>
                <h1 className="text-3xl font-medium capitalize">
                  &#8373;{product.sale_price.toFixed(2)}
                </h1>
                <p
                  className={classNames(
                    product.quantity > 0 ? "text-success" : "text-error",
                    "text-lg font-medium flex items-center gap-3.5"
                  )}
                >
                  {product.quantity > 0 ? (
                    <CheckIcon className="w-5 h-5" />
                  ) : (
                    <XMarkIcon className="w-5 h-5" />
                  )}
                  {product.quantity > 0 ? "In stock" : "Out of stock"}
                </p>
              </div>

              <div className="flex flex-col gap-4 p-4">
                <CartQuantity
                  incrementQuantity={() => {
                    if (itemQty < product.quantity) {
                      return setItemQty(itemQty + 1);
                    }
                    toast("You've added all the items available", {
                      duration: 3000,
                    });
                  }}
                  decrementQuantity={() => {
                    setItemQty(itemQty - 1);
                  }}
                  quantity={itemQty}
                />

                <div className="flex gap-4">
                  <Button
                    className="w-max btn-outline-primary"
                    onClick={(ev) => {
                      ev.stopPropagation();
                      addToCart({
                        product,
                        quantity: itemQty,
                        store,
                        setStore,
                      });
                    }}
                  >
                    Add to cart
                  </Button>

                  <CartCheckout view="checkout">
                    {({ proceed }) => (
                      <Button
                        className="w-max btn-primary"
                        onClick={(ev) => {
                          ev.stopPropagation();
                          buyNow({
                            product,
                            quantity: itemQty,
                            store,
                            setStore,
                          });
                          setTimeout(proceed);
                        }}
                      >
                        Buy
                      </Button>
                    )}
                  </CartCheckout>
                </div>
              </div>

              <div className="flex flex-col gap-4 p-4">
                {product?.category_details && (
                  <Pill>{product?.category_details?.name}</Pill>
                )}

                <div className="flex gap-4 items-center">
                  <p className="text-lg font-medium">Share:</p>
                  <ShareIcon
                    className="w-6 h-6 cursor-pointer"
                    onClick={(ev: any) => {
                      ev.stopPropagation();
                      console.log(detailsRef.current.innerText);
                      let shareData = {
                        title: `${product.name} | HX ENGINEERING`,
                        text: `${product.details} ...`,
                        url: `/product-details/${product._id}`,
                      };
                      navigator.share(shareData);
                    }}
                  />
                </div>
              </div>
            </div>
          </>
        )}
      </div>
      <div className="flex flex-col gap-8">
        <Tabs
          tabs={tabs}
          activeKey={activeTab.slug}
          navClassName={classNames("flex justify-center w-full ")}
          onSelect={(key) => {
            setActiveTab(tabs.find((tab) => key === tab.slug)!);
          }}
        />
      </div>

      <div>
        <h2 className="flex justify-between text-3xl font-semibold text-primary">
          Related products
        </h2>
      </div>

      {!relatedProducts && relatedProductsError && <>Error</>}

      {!relatedProducts && relatedProductsLoading && (
        <div
          className={classNames(
            "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4"
          )}
        >
          {Array.from({ length: 4 }, (_, j) => (
            <Skeleton.Product key={j} />
          ))}
        </div>
      )}

      <Slider
        loading={relatedProductsLoading}
        error={relatedProductsError}
        options={{ showButtons: false, offset: 0.75 }}
      >
        {relatedProducts?.docs.map((product: IProduct, i: number) => (
          <ProductCard {...{ product }} key={i} />
        ))}
      </Slider>
    </div>
  );
}
