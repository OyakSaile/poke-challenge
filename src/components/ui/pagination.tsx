"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
}

export function Pagination({ currentPage, totalPages }: PaginationProps) {
  const searchParams = useSearchParams();

  if (totalPages <= 1) return null;

  const createPageURL = (page: number) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", page.toString());
    return `/?${params.toString()}`;
  };

  const getVisiblePages = () => {
    const pages = [];
    const maxVisiblePages = 5;

    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      let start = Math.max(1, currentPage - 2);
      const end = Math.min(totalPages, start + maxVisiblePages - 1);

      if (end - start < maxVisiblePages - 1) {
        start = Math.max(1, end - maxVisiblePages + 1);
      }

      for (let i = start; i <= end; i++) {
        pages.push(i);
      }
    }

    return pages;
  };

  const canGoPrevious = currentPage > 1;
  const canGoNext = currentPage < totalPages;
  const visiblePages = getVisiblePages();

  return (
    <div className="flex items-center justify-center gap-1 mt-8">
      <PreviousButton
        canGoPrevious={canGoPrevious}
        previousPageUrl={canGoPrevious ? createPageURL(currentPage - 1) : ""}
      />

      <div className="flex items-center gap-1">
        {visiblePages.map((page) => (
          <PageButton
            key={page}
            page={page}
            isCurrentPage={page === currentPage}
            pageUrl={createPageURL(page)}
          />
        ))}
      </div>

      <NextButton
        canGoNext={canGoNext}
        nextPageUrl={canGoNext ? createPageURL(currentPage + 1) : ""}
      />
    </div>
  );
}

function PreviousButton({
  canGoPrevious,
  previousPageUrl,
}: {
  canGoPrevious: boolean;
  previousPageUrl: string;
}) {
  const ArrowIcon = () => (
    <svg
      className="w-4 h-4"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M15 19l-7-7 7-7"
      />
    </svg>
  );

  if (canGoPrevious) {
    return (
      <Link
        href={previousPageUrl}
        className="flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg transition-all text-gray-700 hover:text-gray-900 hover:bg-gray-100"
      >
        <ArrowIcon />
        Anterior
      </Link>
    );
  }

  return (
    <span className="flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg text-gray-400 cursor-not-allowed">
      <ArrowIcon />
      Anterior
    </span>
  );
}

function PageButton({
  page,
  isCurrentPage,
  pageUrl,
}: {
  page: number;
  isCurrentPage: boolean;
  pageUrl: string;
}) {
  if (isCurrentPage) {
    return (
      <span className="w-10 h-10 text-sm font-medium rounded-lg bg-gray-900 text-white flex items-center justify-center">
        {page}
      </span>
    );
  }

  return (
    <Link
      href={pageUrl}
      className="w-10 h-10 text-sm font-medium rounded-lg transition-all text-gray-700 hover:text-gray-900 hover:bg-gray-100 flex items-center justify-center"
    >
      {page}
    </Link>
  );
}

function NextButton({
  canGoNext,
  nextPageUrl,
}: {
  canGoNext: boolean;
  nextPageUrl: string;
}) {
  const ArrowIcon = () => (
    <svg
      className="w-4 h-4"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M9 5l7 7-7 7"
      />
    </svg>
  );

  if (canGoNext) {
    return (
      <Link
        href={nextPageUrl}
        className="flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg transition-all text-gray-700 hover:text-gray-900 hover:bg-gray-100"
      >
        Próximo
        <ArrowIcon />
      </Link>
    );
  }

  return (
    <span className="flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg text-gray-400 cursor-not-allowed">
      Próximo
      <ArrowIcon />
    </span>
  );
}
