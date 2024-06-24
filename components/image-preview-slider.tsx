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
      <Swiper
        className="w-full h-max"
        spaceBetween={16}
        navigation
        thumbs={{ swiper }}
        modules={[FreeMode, Thumbs]}
      >
        {images.map((data: any, index: number) => (
          <SwiperSlide key={index}>
            <div className="relative w-full aspect-square">
              {/* <Image
                src={data}
                alt={`${alt} Image`}
                fill
                priority
                className="w-full h-full object-contain border border-neutral-30 rounded-2xl"
              /> */}
              <Image
                src={data}
                alt={`${alt} Image`}
                fill
                priority
                className="object-cover border border-neutral-30 rounded-2xl"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <Swiper
        className="w-full h-max"
        onSwiper={setSwiper}
        spaceBetween={10}
        slidesPerView={4.4}
        freeMode={true}
        watchSlidesProgress={true}
        modules={[FreeMode, Thumbs]}
      >
        {images.map((data: any, index: number) => (
          <SwiperSlide key={index}>
            <div className="relative w-full aspect-square">
              <Image
                src={data}
                alt={`${alt} Image`}
                fill
                priority
                className="object-contain border border-neutral-30 rounded-2xl"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
