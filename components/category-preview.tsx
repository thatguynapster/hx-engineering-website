import Image from "next/image";
import React from "react";

export const CategoryPreview = ({ data }: { data: any }) => {
  return (
    <div className="relative flex-none pr-4 sm:pr-0">
      <div className="flex gap-4 p-4 rounded-2xl border border-neutral-30 dark:border-white items-center">
        <div className="w-[122px] h-[94px] relative hidden sm:block">
          <Image src="/img/sample_product.png" alt="Sample Product" fill />
        </div>
        <div className="w-full flex flex-col gap-1">
          <h3 className="text-2xl font-semibold tracking-tight truncate">
            Category name
          </h3>
          <p className="mt-1.5 text-base tracking-tight">(6 items)</p>
        </div>
      </div>
    </div>
  );
};
