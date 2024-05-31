"use client";

import Image from "next/image";
import Link from "next/link";

import {
  Button,
  CartCheckout,
  CategorySlider,
  DiscountBanner,
  ProductCard,
  Skeleton,
} from "@/components";
import { useCategories, useFeaturedProducts, useStore } from "@/hooks";
import { classNames, sectionPadding } from "@/libs";
import { buyNow } from "@/functions";
import { IProduct } from "@/types";

export default function Home() {
  const { store, setStore } = useStore();

  const {
    data: products,
    isLoading: productsLoading,
    error: productsError,
  } = useFeaturedProducts({ limit: 12 });

  const mainFeature = (() => {
    return products?.docs[0];
  })();

  const {
    data: categories,
    isLoading: categoriesLoading,
    error: categoriesError,
  } = useCategories({ product_count: true });

  return (
    <>
      <div
        className={classNames(
          "flex flex-col lg:flex-row gap-8 items-center justify-between",
          sectionPadding,
          "lg:px-44"
        )}
      >
        {!products && productsLoading && (
          <>
            <div className="flex flex-col gap-12 animate-pulse">
              <div className="h-12 w-96 bg-neutral-20 rounded-md"></div>
              <div className="flex gap-8">
                <div className="h-12 w-32 bg-neutral-20 rounded-full"></div>
                <div className="h-12 w-32 bg-neutral-20 rounded-full"></div>
              </div>
            </div>
            <div className="w-80 h-80 bg-neutral-20 rounded-3xl animate-pulse"></div>
          </>
        )}

        {mainFeature && (
          <>
            <div className="flex flex-col gap-12">
              <h1 className="text-5xl font-bold text-primary line-clamp-2 leading-snug capitalize">
                {mainFeature.name}
              </h1>

              <div className="flex gap-5 justify-center lg:justify-start">
                <CartCheckout view="checkout">
                  {({ proceed }) => (
                    <Button
                      className="btn btn-lg btn-primary rounded-full font-semibold"
                      onClick={() => {
                        buyNow({ product: mainFeature, store, setStore });
                        setTimeout(proceed);
                      }}
                    >
                      Buy now
                    </Button>
                  )}
                </CartCheckout>

                <Link
                  href={"/all-products"}
                  className="btn btn-lg btn-outline-primary rounded-full font-semibold"
                >
                  View more
                </Link>
              </div>
            </div>

            <div className="relative">
              <Image
                src={mainFeature.images[0]}
                alt={`${mainFeature.name} Image`}
                width={331}
                height={356}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
              <div className="absolute bottom-10 right-0 bg-primary rounded-full p-6 text-center text-white font-semibold">
                only <br /> &#8373;{mainFeature.sale_price}
              </div>
            </div>
          </>
        )}
      </div>

      <div className={classNames(sectionPadding, "lg:px-[90px]")}>
        <CategorySlider
          categories={categories?.docs}
          loading={categoriesLoading}
          error={categoriesError}
        />
      </div>

      <div className={sectionPadding}>
        <h2 className="flex justify-between text-3xl font-semibold text-primary">
          Featured products
        </h2>
      </div>

      <div
        className={classNames(
          sectionPadding,
          "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4"
        )}
      >
        {!products && productsError && <>Error</>}

        {!products &&
          productsLoading &&
          Array.from({ length: 10 }, (_, j) => <Skeleton.Product key={j} />)}

        {products?.docs.map((product: IProduct, i: number) => (
          <ProductCard {...{ product }} key={i} />
        ))}
      </div>

      <div className={sectionPadding}>
        <DiscountBanner />
      </div>
    </>
  );
}
