"use client";

import { InputHTMLAttributes } from "react";
import { CheckIcon } from "@heroicons/react/24/outline";
import { Field } from "formik";
import { classNames } from "@/libs";

export interface CheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
  withFormik?: boolean;
}

export function Checkbox({
  children,
  className,
  withFormik = true,
  checked: isChecked,
  ...props
}: CheckboxProps) {
  /**
   * variables
   */
  const Input = withFormik ? Field : "input";

  return (
    <label
      className={classNames(
        className,
        "inline-flex gap-2 items-center relative cursor-pointer"
      )}
    >
      <Input
        {...props}
        type="checkbox"
        checked={isChecked}
        className="sr-only peer cursor-pointer"
      />
      <div
        className={classNames(
          "w-[30px] h-[30px]",
          "flex rounded-lg border transition border-neutral-30",
          "peer-checked:bg-primary peer-checked:border-primary"
        )}
      >
        <CheckIcon
          className={classNames(
            isChecked ? "text-white" : "text-transparent",
            "w-3.5 h-3.5 m-auto stroke-[2.5px]"
          )}
        />
      </div>
      <div className="select-none">{children}</div>
    </label>
  );
}
