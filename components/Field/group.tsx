"use client";

import React, { HtmlHTMLAttributes } from "react";
import styled from "styled-components";

import { classNames } from "@/libs";
import { Field } from "..";

export interface GroupProps
  extends Omit<HtmlHTMLAttributes<HTMLDivElement>, "prefix"> {
  name: string;
  error?: string;
  label?: string;
  disabled?: boolean;
  children?: any;
  withFormik?: boolean;
  errorClassName?: string;
  labelClassName?: string;
  wrapperClassName?: string;
  containerClassName?: string;
  containerPlacementClass?: string;
  required?: boolean;
}

export function Group({
  name,
  error,
  label,
  children,
  disabled,
  withFormik,
  errorClassName,
  labelClassName,
  wrapperClassName,
  containerClassName,
  containerPlacementClass,
  required,
  ...props
}: GroupProps) {
  return (
    <StyledGroup
      className={classNames(`min-h-6 ${wrapperClassName}`)}
      {...props}
    >
      {label && (
        <label
          htmlFor={name}
          className={classNames(
            "text-sm mb-1 font-medium block text-neutral-40 dark:text-neutral-30",
            labelClassName
          )}
        >
          {label}{" "}
          {required && <span className="text-danger-main text-error">*</span>}
        </label>
      )}
      <div className={classNames("rounded-3xl", "border border-neutral-30")}>
        {children && (
          <>
            {React.Children.map(
              children,
              (child) =>
                child && React.cloneElement(child, { ...child.props, disabled })
            )}
          </>
        )}
      </div>
      <Field.Error
        className={classNames(`field-error`, errorClassName)}
        {...{ name, error, withFormik }}
      />
    </StyledGroup>
  );
}

/**
 * styles
 */

const StyledGroup = styled.div`
  &:has(small.field-error) {
    & > div {
      border-color: rgba(var(--color-red-600-rgb), 1);
    }
  }

  &:last-child {
    margin-bottom: 0;
  }
`;
