"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { Search } from "lucide-react";

interface SearchInputProps {
  placeholder?: string;
  className?: string;
  defaultValue?: string;
}

export function SearchInput({
  placeholder = "Pesquise por um pokémon",
  className = "",
  defaultValue = "",
}: SearchInputProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [searchTerm, setSearchTerm] = useState(defaultValue);

  const updateSearchParams = useCallback(
    (search: string) => {
      const params = new URLSearchParams(searchParams.toString());

      if (search.trim()) {
        params.set("search", search.trim());
      } else {
        params.delete("search");
      }

      params.delete("page");

      const newUrl = `/?${params.toString()}`;
      router.push(newUrl);
    },
    [router, searchParams]
  );

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (searchTerm !== defaultValue) {
        updateSearchParams(searchTerm);
      }
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [searchTerm, updateSearchParams, defaultValue]);

  return (
    <div className={`relative ${className}`}>
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full px-6 py-4 pr-12 text-gray-700 bg-gray-100 rounded-full border-0 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white placeholder-gray-500"
        placeholder={placeholder}
      />
      <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
        <Search className="h-5 w-5 text-gray-400" />
      </div>
    </div>
  );
}
