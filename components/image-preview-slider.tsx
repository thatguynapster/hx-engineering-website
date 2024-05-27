"use client";

import { FreeMode, Navigation, Thumbs } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { useEffect, useRef, useState } from "react";
import type SwiperType from "swiper";
import Image from "next/image";

// swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/thumbs";

export const ImagePreviewSlider = ({
  images,
  alt,
}: {
  images: string[];
  alt: string;
}) => {
  const [swiper, setSwiper] = useState<null | SwiperType>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    swiper?.on("slideChange", ({ activeIndex }) => {
      console.log(activeIndex);
      setActiveIndex(activeIndex);
    });
  }, [swiper, images]);

  return (
    <div className="flex flex-col gap-4">
      <div className="w-full h-max md:h-[400px] lg:h-[561px]">
        <Swiper
          className="w-full h-full"
          spaceBetween={16}
          navigation
          thumbs={{ swiper }}
          modules={[FreeMode, Thumbs]}
        >
          {images.map((data: any, index: number) => (
            <SwiperSlide key={index}>
              <Image
                src={data}
                alt={`${alt} Image`}
                width={647}
                height={561}
                priority
                className="w-full h-full object-contain border border-neutral-30 rounded-2xl"
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <div className="w-full h-max md:h-[110px] lg:h-[157px]">
        <Swiper
          className="w-full h-full"
          onSwiper={setSwiper}
          spaceBetween={10}
          slidesPerView={2.8}
          freeMode={true}
          watchSlidesProgress={true}
          modules={[FreeMode, Thumbs]}
        >
          {images.map((data: any, index: number) => (
            <SwiperSlide key={index}>
              <Image
                src={data}
                alt={`${alt} Image`}
                width={215}
                height={157}
                priority
                className="w-full h-full object-contain border border-neutral-30 rounded-2xl"
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};
