"use client";

import { Dispatch, Fragment, SetStateAction, useState } from "react";
import { Field } from ".";
import { Filters } from "@/types";

export interface FiltersProps {
  filters: Partial<Filters>;
  setFilters: Dispatch<SetStateAction<Partial<Filters>>>;
}

export type FilterTypes = {
  slug: string;
  title: string;
  type: "radio" | "checkbox";
  with_search?: boolean;
  filters: { label: string; value: string }[];
};

export function FilterGroup({
  item,
  withSearch,
  filters,
  setFilters,
}: {
  item: FilterTypes;
  withSearch?: boolean;
} & FiltersProps) {
  /**
   * state
   */
  const [search, setSearch] = useState("");

  return (
    <div className="flex flex-col gap-2.5">
      <div className="flex justify-between gap-2 text-primary">
        {item.title}

        <span
          className="text-neutral-40 text-sm cursor-pointer"
          onClick={() => {
            setFilters({ ...filters, [item.slug]: null, page: 1 });
          }}
        >
          Reset
        </span>
      </div>
      {withSearch && (
        <div className="mb-4">
          <Field.Search
            delay={0}
            onSearch={(key) => setSearch(key)}
            placeholder="search rider"
          />
        </div>
      )}
      <div className="grid">
        {item?.filters
          ?.filter((i) => i.label.toLowerCase().includes(search.toLowerCase()))
          ?.map((jtem, key) => (
            <Fragment key={key}>
              {item.type === "radio" && (
                <Field.Radio
                  key={key}
                  name={item.slug}
                  className="py-2"
                  withFormik={false}
                  value={jtem.value}
                  checked={filters[item.slug] === jtem.value}
                  onChange={({ currentTarget: { name, value } }) =>
                    setFilters({ ...(filters || {}), [name]: value })
                  }
                >
                  {jtem.label}
                </Field.Radio>
              )}
              {item.type === "checkbox" && (
                <Field.Checkbox
                  key={key}
                  className="py-2"
                  withFormik={false}
                  value={jtem.value}
                  name={`${item.slug}`}
                  checked={
                    filters[item.slug]
                      ? filters[item.slug].includes(jtem.value)
                      : false
                  }
                  onChange={({ currentTarget: { checked, value } }) => {
                    setFilters({
                      ...(filters || {}),
                      [item.slug]: checked
                        ? [
                            ...(filters[item.slug] ? filters[item.slug] : []),
                            value,
                          ]
                        : filters[item.slug].filter((i) => i !== value),
                      page: 1,
                    });
                  }}
                >
                  {jtem.label}
                </Field.Checkbox>
              )}
            </Fragment>
          ))}
      </div>
    </div>
  );
}
