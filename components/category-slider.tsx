"use client";

import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/24/outline";
import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import type SwiperType from "swiper";

import { CategoryPreview } from "./category-preview";

import { classNames } from "@/libs";

import "swiper/css";
import "swiper/css/pagination";
import { useCategories, useWidth } from "@/hooks";
import { Button } from "./button";

export const CategorySlider = () => {
  const width = useWidth();

  const base = (width as number) < 640;
  const sm = (width as number) < 768;
  const md = (width as number) < 1024;
  const lg = (width as number) < 1280;
  const xl = (width as number) < 1536;

  const svp = base ? 1 : sm ? 2 : md ? 2 : lg ? 3 : xl ? 4 : 5;

  const {
    data: categories,
    isLoading,
    error,
  } = useCategories({ product_count: true });

  const [swiper, setSwiper] = useState<null | SwiperType>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [slideConfig, setSlideConfig] = useState({
    isBeginning: true,
    isEnd: activeIndex === (categories?.docs.length ?? 0) - svp,
  });

  useEffect(() => {
    swiper?.on("slideChange", ({ activeIndex }) => {
      setActiveIndex(activeIndex);
      setSlideConfig({
        isBeginning: activeIndex === 0,
        isEnd: activeIndex === (categories?.docs.length ?? 0) - svp,
      });
    });
  }, [swiper, categories]);

  const activeStyles =
    "active:scale-[0.97] grid opacity-100 hover:scale-105 absolute top-1/2 -translate-y-1/2 aspect-square h-8 w-8 z-50 place-items-center rounded-full text-white bg-neutral-20";

  const inactiveStyles = "hidden";

  return (
    <div className={classNames("group relative")}>
      <div className="absolute z-10 inset-0">
        <Button
          className={classNames(
            activeStyles,
            "-right-4 transition",
            {
              [inactiveStyles]:
                slideConfig.isEnd || categories?.docs.length <= svp,
              "hover:bg-primary hover:text-neutral-10 text-neutral-50 opacity-100":
                !slideConfig.isEnd,
            },
            "!p-0"
          )}
          aria-label="next category"
          onClick={(ev) => {
            ev.preventDefault();
            swiper?.slideNext();
          }}
        >
          <ArrowRightIcon className="w-4 h-4 text-inherit" />
        </Button>

        <Button
          className={classNames(
            activeStyles,
            "-left-4 transition",
            {
              [inactiveStyles]: slideConfig.isBeginning,
              "hover:bg-primary hover:text-neutral-10 text-neutral-50 opacity-100":
                !slideConfig.isBeginning,
            },
            "!p-0"
          )}
          aria-label="previous category"
          onClick={(ev) => {
            ev.preventDefault();
            swiper?.slidePrev();
          }}
        >
          <ArrowLeftIcon className="w-4 h-4" />
        </Button>
      </div>

      <Swiper
        className="w-full h-full"
        spaceBetween={16}
        slidesPerView={svp}
        onSwiper={(swiper) => setSwiper(swiper)}
        modules={[Pagination]}
      >
        {categories?.docs.map((data: any, index: number) => (
          <SwiperSlide className="-z-10 relative w-full h-full" key={index}>
            <CategoryPreview {...{ data }} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
