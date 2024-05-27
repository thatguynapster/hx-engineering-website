"use client";

import { useEffect, useState } from "react";

import {
  DiscountBanner,
  FilterGroup,
  Pagination,
  ProductCard,
} from "@/components";
import { useCategories, useProducts, useStore } from "@/hooks";
import { Filters, ICategory, IProduct } from "@/types";
// import { sectionPadding } from "@/app/page";
import { classNames, sectionPadding } from "@/libs";

export default function Page() {
  const [filters, setFilters] = useState<Partial<Filters>>({ page: 1 });
  const { store, setStore } = useStore();

  const {
    data: products,
    isLoading: productsLoading,
    error: productsError,
  } = useProducts({
    ...filters,
    limit: 12,
    categories: filters.categories?.join(","),
  });

  const pages = products?.totalPages;

  const {
    data: categories,
    isLoading: categoriesLoading,
    error: categoriesError,
  } = useCategories({ product_count: true });

  useEffect(() => {
    console.log(filters);
  }, [filters]);

  return (
    <>
      <div
        className={classNames(
          sectionPadding,
          "flex flex-col md:flex-row gap-4"
        )}
      >
        <div className="md:max-w-56 w-full">
          {productsLoading && (
            <div className="flex flex-col gap-4 w-full animate-pulse">
              <div className="flex justify-between gap-4">
                <div className="w-2/3 h-6 bg-neutral-20 rounded-xl"></div>
                <div className="w-1/3 h-6 bg-neutral-20 rounded-xl"></div>
              </div>
              {Array.from({ length: 4 }, (_, j) => (
                <div className="flex gap-4 w-full">
                  <div
                    key={j}
                    className="w-12 h-10 bg-neutral-20 rounded-xl"
                  ></div>
                  <div
                    key={j}
                    className="w-full h-10 bg-neutral-20 rounded-xl"
                  ></div>
                </div>
              ))}
            </div>
          )}

          {categories && (
            <FilterGroup
              item={{
                title: "Categories",
                type: "checkbox",
                slug: "categories",
                filters: categories?.docs.map((cat: ICategory) => ({
                  label: cat.name,
                  value: cat._id,
                })),
              }}
              withSearch={false}
              {...{ filters, setFilters }}
            />
          )}
        </div>

        <div className="flex flex-col gap-6 items-center w-full">
          <div
            className={classNames(
              "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4 w-full"
            )}
          >
            {!products && productsError && <>Error</>}

            {!products &&
              productsLoading &&
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

          {products && <Pagination {...{ filters, pages, setFilters }} />}
        </div>
      </div>
      <div className={sectionPadding}>
        <DiscountBanner />
      </div>
    </>
  );
}
