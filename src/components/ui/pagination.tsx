"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { uiTranslations } from "@/utils/translations";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
}

export function Pagination({ currentPage, totalPages }: PaginationProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const navigateToPage = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", page.toString());
    router.push(`/?${params.toString()}`);
  };

  const getVisiblePages = () => {
    const visiblePages = [];
    const maxVisiblePages = 5;

    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        visiblePages.push(i);
      }
    } else {
      const halfVisible = Math.floor(maxVisiblePages / 2);
      let startPage = Math.max(1, currentPage - halfVisible);
      const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

      if (endPage - startPage + 1 < maxVisiblePages) {
        startPage = Math.max(1, endPage - maxVisiblePages + 1);
      }

      for (let i = startPage; i <= endPage; i++) {
        visiblePages.push(i);
      }
    }

    return visiblePages;
  };

  const visiblePages = getVisiblePages();
  const hasPrevious = currentPage > 1;
  const hasNext = currentPage < totalPages;

  return (
    <div className="flex items-center justify-center gap-1 mt-8">
      <button
        onClick={() => navigateToPage(currentPage - 1)}
        disabled={!hasPrevious}
        className="flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg transition-all text-gray-700 hover:text-gray-900 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <ChevronLeft className="w-4 h-4" />
        {uiTranslations.pagination.previous}
      </button>

      <div className="flex items-center gap-1">
        {visiblePages.map((page) => (
          <button
            key={page}
            onClick={() => navigateToPage(page)}
            className={`w-10 h-10 text-sm font-medium rounded-lg transition-all flex items-center justify-center ${
              page === currentPage
                ? "bg-gray-900 text-white"
                : "text-gray-700 hover:text-gray-900 hover:bg-gray-100"
            }`}
          >
            {page}
          </button>
        ))}
      </div>

      <button
        onClick={() => navigateToPage(currentPage + 1)}
        disabled={!hasNext}
        className="flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg transition-all text-gray-700 hover:text-gray-900 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {uiTranslations.pagination.next}
        <ChevronRight className="w-4 h-4" />
      </button>
    </div>
  );
}
