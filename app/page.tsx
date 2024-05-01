import {
  Button,
  CategorySlider,
  DiscountBanner,
  ProductCard,
} from "@/components";
import { classNames } from "@/libs";
import { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "HX Engineering",
  description: "HX Engineering Online Mall",
};

export default function Home() {
  const products = [
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
  ];
  const sectionPadding = "px-4 sm:px-6 md:px-12";

  return (
    <>
      <div
        className={classNames(
          "flex flex-col lg:flex-row gap-8 items-center justify-between",
          sectionPadding,
          "lg:px-44"
        )}
      >
        <div className="flex flex-col gap-12">
          <h1 className="text-5xl font-bold text-primary line line-clamp-2">
            Canon camera
          </h1>
          <div className="flex gap-5">
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
            src={"/img/sample_product.png"}
            alt="Product Image"
            width={331}
            height={356}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <div className="absolute bottom-10 right-0 bg-primary rounded-full p-6 text-center text-white font-semibold">
            only <br /> &#8373;2500
          </div>
        </div>
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
        {products.map((product, i) => (
          <ProductCard {...{ product }} key={i} />
        ))}
      </div>

      <div className={sectionPadding}>
        <DiscountBanner />
      </div>
    </>
  );
}
