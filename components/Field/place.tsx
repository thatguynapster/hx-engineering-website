"use client";

import { InputHTMLAttributes } from "react";
import { camelCase } from "lodash";

import { Input } from ".";
import { Places } from "../Map";

type ValueProps = {
  lat: unknown;
  lng: unknown;
  location: string;
  address?: string;
  country_code?: string;
};

export interface PlaceProps
  extends Partial<Omit<InputHTMLAttributes<HTMLInputElement>, "value">> {
  setFieldValue?: any;
  setFieldTouched?: any;
  name: string;
  value: ValueProps;
  country?: string[];
}

export function Place({
  name,
  value,
  country,
  placeholder = "",
  setFieldValue,
  setFieldTouched,
  ...props
}: PlaceProps) {
  return (
    <Places
      country={country}
      id={camelCase(name)}
      onChange={(value) => {
        console.log(value);
        setFieldValue?.(name, value);
        setTimeout(() => setFieldTouched?.(name, true), 500);
      }}
    >
      <Input
        withFormik={false}
        placeholder={placeholder}
        defaultValue={value?.location || value?.address || ""}
        {...props}
      />
    </Places>
  );
}
