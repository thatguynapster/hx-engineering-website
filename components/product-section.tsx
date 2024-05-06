// "use client";

import { classNames } from "@/libs";
import React from "react";

import { sectionPadding } from "@/app/page";
import { useProducts } from "@/hooks";
import { ProductCard } from ".";
import { IProduct } from "@/types";

const ProductSection = () => {
  //   const { data: products, isLoading, error } = useProducts();
  //   console.log(products);

  return (
    <div
      className={classNames(
        sectionPadding,
        "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4"
      )}
    >
      {/* {products?.docs.map((product: IProduct, i: number) => (
        <ProductCard {...{ product }} key={i} />
      ))} */}
    </div>
  );
};

export default ProductSection;
