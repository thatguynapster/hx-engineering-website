"use client";

import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/24/outline";
import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import type SwiperType from "swiper";
import Image from "next/image";

import { classNames } from "@/libs";
import { Button } from "./button";

import "swiper/css";
import "swiper/css/pagination";

export const ImageSlider = ({
  images,
  alt,
}: {
  images: string[];
  alt: string;
}) => {
  const [swiper, setSwiper] = useState<null | SwiperType>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [slideConfig, setSlideConfig] = useState({
    isBeginning: true,
    isEnd: activeIndex === (images.length ?? 0) - 1,
  });

  useEffect(() => {
    swiper?.on("slideChange", ({ activeIndex }) => {
      setActiveIndex(activeIndex);
      setSlideConfig({
        isBeginning: activeIndex === 0,
        isEnd: activeIndex === (images.length ?? 0) - 1,
      });
    });
  }, [swiper, images]);

  const activeStyles =
    "active:scale-[0.97] grid opacity-100 hover:scale-105 absolute top-1/2 -translate-y-1/2 aspect-square h-8 w-8 z-50 place-items-center rounded-full text-white bg-neutral-20";

  const inactiveStyles = "hidden";

  return (
    <div className={classNames("group relative")}>
      <div className="absolute z-10 inset-0">
        <Button
          className={classNames(
            activeStyles,
            "right-0 transition",
            {
              [inactiveStyles]: slideConfig.isEnd,
              "hover:bg-primary hover:text-neutral-10 text-neutral-50 opacity-100":
                !slideConfig.isEnd,
            },
            "!p-0"
          )}
          aria-label="next category"
          onClick={(ev) => {
            ev.preventDefault();
            ev.stopPropagation();
            swiper?.slideNext();
          }}
        >
          <ArrowRightIcon className="w-4 h-4 text-inherit" />
        </Button>

        <Button
          className={classNames(
            activeStyles,
            "left-0 transition",
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
            ev.stopPropagation();
            swiper?.slidePrev();
          }}
        >
          <ArrowLeftIcon className="w-4 h-4" />
        </Button>
      </div>

      <Swiper
        className="w-full h-full"
        spaceBetween={16}
        slidesPerView={1}
        onSwiper={(swiper) => setSwiper(swiper)}
        modules={[Pagination]}
      >
        {images.map((data: any, index: number) => (
          <SwiperSlide key={index} className="-z-10 relative w-full h-full">
            <div className="relative w-full h-[107px]"></div>
            <Image
              src={data}
              alt={`${alt} Image`}
              fill
              priority
              className="object-contain"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
