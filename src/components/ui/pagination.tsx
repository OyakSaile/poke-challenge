"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { ChevronLeft, ChevronRight } from "lucide-react";

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
    <div className="flex items-center justify-center gap-2">
      <button
        onClick={() => navigateToPage(currentPage - 1)}
        disabled={!hasPrevious}
        className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-500 border-gray-300 hover:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed  cursor-pointer"
      >
        <ChevronLeft className="w-4 h-4" />
        Anterior
      </button>

      <div className="flex gap-1">
        {visiblePages.map((page) => (
          <button
            key={page}
            onClick={() => navigateToPage(page)}
            className={`px-3 py-2 text-sm font-medium rounded-lg ${
              page === currentPage
                ? "text-white bg-black"
                : "text-gray-500 bg-white hover:bg-gray-50 hover:text-gray-700"
            }`}
          >
            {page}
          </button>
        ))}
      </div>

      <button
        onClick={() => navigateToPage(currentPage + 1)}
        disabled={!hasNext}
        className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-500 rounded-lg hover:text-gray-700 disabled:opacity-50 cursor-pointer disabled:cursor-not-allowed"
      >
        Próximo
        <ChevronRight className="w-4 h-4" />
      </button>
    </div>
  );
}
