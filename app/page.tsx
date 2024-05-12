"use client";

import {
  Button,
  CategorySlider,
  DiscountBanner,
  ProductCard,
} from "@/components";
import { useFeaturedProducts } from "@/hooks";
import { classNames } from "@/libs";
import { IProduct } from "@/types";
import Image from "next/image";

const sectionPadding = "px-4 sm:px-6 md:px-12";

export default function Home() {
  const {
    data: products,
    isLoading,
    error,
  } = useFeaturedProducts({ limit: 12 });

  const mainFeature = (() => {
    return products?.docs[0];
  })();

  return (
    <>
      <div
        className={classNames(
          "flex flex-col lg:flex-row gap-8 items-center justify-between",
          sectionPadding,
          "lg:px-44"
        )}
      >
        {mainFeature ? (
          <>
            <div className="flex flex-col gap-12">
              <h1 className="text-5xl font-bold text-primary line line-clamp-2 capitalize">
                {mainFeature.name}
              </h1>

              <div className="flex gap-5 justify-center lg:justify-start">
                <Button className="btn btn-lg btn-primary rounded-full font-semibold">
                  Shop now
                </Button>
                <Button className="btn btn-lg btn-outline-primary rounded-full font-semibold">
                  View more
                </Button>
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
        ) : (
          <>
            <div className="flex flex-col gap-12 animate-pulse">
              <div className="h-12 w-96 bg-neutral-40 dark:bg-neutral-30 rounded-md"></div>
              <div className="flex gap-8">
                <div className="h-12 w-32 bg-neutral-40 dark:bg-neutral-30 rounded-full"></div>
                <div className="h-12 w-32 bg-neutral-40 dark:bg-neutral-30 rounded-full"></div>
              </div>
            </div>
            <div className="w-80 h-80 bg-neutral-4o dark:bg-neutral-30 rounded-3xl animate-pulse"></div>
          </>
        )}
      </div>

      <div className={classNames(sectionPadding, "lg:px-[90px]")}>
        <CategorySlider />
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
        {!products && error && <>Error</>}
        {!products &&
          isLoading &&
          Array.from({ length: 10 }, (_, j) => (
            <div
              key={j}
              className={classNames(
                "flex flex-col gap-2",
                "bg-neutral-20",
                "animate-pulse",
                "w-full h-56",
                "rounded-3xl"
              )}
            ></div>
          ))}

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
