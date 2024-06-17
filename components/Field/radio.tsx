"use client";

import { InputHTMLAttributes } from "react";
import { Field } from "formik";

import { classNames } from "@/libs";

export interface RadioProps extends InputHTMLAttributes<HTMLInputElement> {
  withFormik?: boolean;
}

export function Radio({
  children,
  withFormik = true,
  className,
  ...props
}: RadioProps) {
  /**
   * variables
   */
  const Input = withFormik ? Field : "input";

  return (
    <label
      className={classNames(
        className,
        "inline-flex gap-4 items-center relative cursor-pointer"
      )}
    >
      <Input {...props} type="radio" className="sr-only peer" />
      <div className="w-4 h-4 flex rounded-full border transition border-neutral-200 peer-checked:border-primary peer-checked:border-secondary-main relative after:content-[''] after:w-2 after:h-2 after:rounded-full peer-checked:after:bg-primary peer-checked:after:bg-secondary-main after:m-auto after:transition" />
      <div className="text-sm text-neutral-700 select-none">{children}</div>
    </label>
  );
}
