"use client";

import { forwardRef } from "react";
import { Field, FieldAttributes } from "formik";
import { classNames } from "@/libs";

export interface InputProps extends FieldAttributes<any> {
  withFormik?: boolean;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, withFormik = true, ...props }, ref) => {
    console.log(props);
    /**
     * variables
     */
    const Component = withFormik ? Field : "input";

    return (
      <Component
        ref={ref}
        className={classNames(
          className,
          "text-sm h-full w-full px-4 py-3",
          "!outline-0 !outline-none !border-0 rounded-3xl",
          "disabled:bg-neutral-30 disabled:text-neutral-400",
          "placeholder:text-neutral-400"
        )}
        {...props}
      />
    );
  }
);

export default Input;
