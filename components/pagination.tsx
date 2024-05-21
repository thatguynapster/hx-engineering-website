"use client";

import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import React, { Dispatch, ReactNode, SetStateAction, useState } from "react";

import { FiltersProps } from "./filter-group";
import { useStore, useWidth } from "@/hooks";
import { classNames } from "@/libs";

interface PaginationButtonProps {
  // currentPage: number;
  page: number;
  setCurrentPage: Dispatch<SetStateAction<number>>;
  children?: ReactNode;
}

const PaginationButton: React.FC<PaginationButtonProps & FiltersProps> = ({
  page,
  setCurrentPage,
  children,
  filters,
  setFilters,
}) => {
  const { store } = useStore();

  const handleClick = () => {
    if (typeof page === "number") {
      setCurrentPage(page);
    }
  };

  return (
    <button
      className={classNames(
        "flex items-center justify-center",
        "bg-[#E1E1E1] rounded-lg",
        "min-w-10 h-10",
        "px-2 py-1.5",
        "font-medium",
        filters.page === page && "bg-primary text-white"
      )}
      onClick={handleClick}
    >
      {children || page}
    </button>
  );
};

interface PaginationProps {
  pages: number;
}

export const Pagination: React.FC<PaginationProps & FiltersProps> = ({
  pages,
  filters,
  setFilters,
}) => {
  const { store, setStore } = useStore();
  const [currentPage, setCurrentPage] = useState(filters.page ?? 1);

  const width = useWidth();
  console.log(width);

  const base = (width as number) <= 320;
  const xs = (width as number) <= 425;

  const paginationButtonOffset = base ? 0 : xs ? 2 : 3;

  const updateFilters = (page: number) => {
    setCurrentPage(page);
    setFilters({ ...filters, page });
  };

  const getDisplayPages = () => {
    const displayedPages: (number | string)[] = [];

    if (pages <= 10) {
      for (let i = 1; i <= pages; i++) {
        displayedPages.push(i);
      }
    } else {
      if (currentPage <= paginationButtonOffset + 1) {
        for (let i = 1; i <= paginationButtonOffset + 1; i++) {
          displayedPages.push(i);
        }
        displayedPages.push("...");
        displayedPages.push(pages);
      } else if (currentPage >= pages - paginationButtonOffset) {
        displayedPages.push(1);
        displayedPages.push("...");
        for (let i = pages - paginationButtonOffset; i <= pages; i++) {
          displayedPages.push(i);
        }
      } else {
        displayedPages.push(1);
        displayedPages.push("...");
        for (
          let i = currentPage - Math.ceil(paginationButtonOffset / 2);
          i <= currentPage;
          i++
        ) {
          displayedPages.push(i);
        }

        for (
          let i = currentPage + 1;
          i <= currentPage + Math.floor(paginationButtonOffset / 2);
          i++
        ) {
          displayedPages.push(i);
        }

        displayedPages.push("...");
        displayedPages.push(pages);
      }
    }

    return displayedPages;
  };

  const handleNextPage = () => {
    if (currentPage < pages) {
      updateFilters(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      updateFilters(currentPage - 1);
    }
  };

  return (
    <div className="flex justify-between md:justify-start gap-2.5">
      <button
        onClick={handlePrevPage}
        disabled={currentPage === 1}
        aria-label="Previous Page"
        className={classNames(
          "flex items-center justify-center",
          "bg-[#E1E1E1] rounded-lg",
          "min-w-10 h-10"
        )}
      >
        <ChevronLeftIcon className="w-5 h-5" />
      </button>
      {getDisplayPages().map((page, index) =>
        typeof page === "number" ? (
          <PaginationButton
            key={index}
            page={page}
            setCurrentPage={(page) => {
              updateFilters(page as number);
            }}
            {...{ filters, setFilters }}
          />
        ) : (
          <div key={index} className="text-3xl font-medium">
            ...
          </div>
        )
      )}
      <button
        onClick={handleNextPage}
        disabled={currentPage === pages}
        aria-label="Next Page"
        className={classNames(
          "flex items-center justify-center",
          "bg-[#E1E1E1] rounded-lg",
          "min-w-10 h-10"
        )}
      >
        <ChevronRightIcon className="w-5 h-5" />
      </button>
    </div>
  );
};
