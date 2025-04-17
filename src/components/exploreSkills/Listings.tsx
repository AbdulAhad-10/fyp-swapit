"use client";
import { apiGet } from "@/utils/api";
import ListingCard from "./ListingCard";
import { useEffect, useState, useCallback } from "react";
import LoaderSpinner from "../ui/loader";
import { Inbox, Search, Filter as FilterIcon } from "lucide-react";
import { Input } from "@/components/ui/input";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useDebounce } from "@/hooks/use-debounce";

interface Creator {
  _id: string;
  username: string;
  profileImageUrl: string;
}

interface Listing {
  _id: string;
  title: string;
  description: string;
  creator: Creator;
  category: string;
  duration: string;
  availableDays: string[];
  timeFrom: string;
  timeTo: string;
  timezone: string;
  language: string;
  prerequisites: string;
  averageRating: number;
  totalRatings: number;
}

interface ListingsResponse {
  listings: Listing[];
  pagination: {
    currentPage: number;
    totalPages: number;
    totalListings: number;
    limit: number;
  };
}

const CATEGORIES = [
  "programming",
  "design",
  "business",
  "marketing",
  "communication",
  "languages",
  "music",
  "other",
];
const LANGUAGES = [
  "english",
  "spanish",
  "french",
  "german",
  "chinese",
  "japanese",
];
const ALL_VALUE = "all";
const ITEMS_PER_PAGE = 9;

const EmptyState = () => (
  <div className="flex flex-col items-center justify-center h-[70vh] text-center p-4">
    <Inbox className="w-16 h-16 text-gray-400 mb-4" />
    <h3 className="text-xl font-semibold text-gray-700 mb-2">
      No Listings Available
    </h3>
    <p className="text-gray-500 max-w-md">
      There are currently no listings available. Check back later for new
      opportunities.
    </p>
  </div>
);

const generatePaginationItems = (currentPage: number, totalPages: number) => {
  const items = [];
  const maxVisiblePages = 5;

  if (totalPages <= maxVisiblePages) {
    for (let i = 1; i <= totalPages; i++) {
      items.push(i);
    }
  } else {
    if (currentPage <= 3) {
      for (let i = 1; i <= 4; i++) {
        items.push(i);
      }
      items.push("ellipsis");
      items.push(totalPages);
    } else if (currentPage >= totalPages - 2) {
      items.push(1);
      items.push("ellipsis");
      for (let i = totalPages - 3; i <= totalPages; i++) {
        items.push(i);
      }
    } else {
      items.push(1);
      items.push("ellipsis");
      for (let i = currentPage - 1; i <= currentPage + 1; i++) {
        items.push(i);
      }
      items.push("ellipsis");
      items.push(totalPages);
    }
  }

  return items;
};

const Listings = () => {
  const [listings, setListings] = useState<Listing[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>(ALL_VALUE);
  const [selectedLanguage, setSelectedLanguage] = useState<string>(ALL_VALUE);
  const [currentPage, setCurrentPage] = useState(1);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalListings: 0,
    limit: ITEMS_PER_PAGE,
  });

  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  function capitalizeFirstLetter(str: string): string {
    if (!str) return "";
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  const fetchListings = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      // Build query parameters
      const params = new URLSearchParams();
      params.append("page", currentPage.toString());
      params.append("limit", ITEMS_PER_PAGE.toString());

      if (selectedCategory !== ALL_VALUE) {
        params.append("category", selectedCategory);
      }

      if (selectedLanguage !== ALL_VALUE) {
        params.append("language", selectedLanguage);
      }

      if (debouncedSearchTerm) {
        params.append("search", debouncedSearchTerm);
      }

      const response = await apiGet<ListingsResponse>(
        `/api/listings?${params.toString()}`
      );

      if (response.error) {
        setError(response.error);
        return;
      }

      if (response.data) {
        setListings(response.data.listings);
        setPagination(response.data.pagination);
      }
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "An error occurred";
      setError(errorMessage);
      console.error("Error fetching listings:", err);
    } finally {
      setLoading(false);
    }
  }, [currentPage, selectedCategory, selectedLanguage, debouncedSearchTerm]);

  useEffect(() => {
    fetchListings();
  }, [fetchListings]);

  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory, selectedLanguage, debouncedSearchTerm]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleCategoryChange = (value: string) => {
    setSelectedCategory(value);
  };

  const handleLanguageChange = (value: string) => {
    setSelectedLanguage(value);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  if (loading && listings.length === 0) {
    return (
      <div className="flex items-center justify-center h-[70vh]">
        <LoaderSpinner />
      </div>
    );
  }

  if (error) {
    return <div className="text-center py-8 text-red-500">{error}</div>;
  }

  return (
    <div className="space-y-6">
      {/* Search and Filter Section */}
      <div className="bg-white rounded-[8px] shadow-sm p-4">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search Input */}
          <div className="flex-1">
            <div className="relative">
              <Input
                type="text"
                placeholder="Search listings..."
                value={searchTerm}
                onChange={handleSearch}
                className="pl-10 rounded-[8px]"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            </div>
          </div>

          {/* Category Filter */}
          <div className="flex items-center gap-2">
            <FilterIcon className="h-5 w-5 text-gray-500" />
            <Select
              value={selectedCategory}
              onValueChange={handleCategoryChange}
            >
              <SelectTrigger className="w-[180px] rounded-[8px]">
                <SelectValue placeholder="All Categories" />
              </SelectTrigger>
              <SelectContent className="bg-white">
                <SelectItem value={ALL_VALUE}>All Categories</SelectItem>
                {CATEGORIES.map((category) => (
                  <SelectItem key={category} value={category}>
                    {capitalizeFirstLetter(category)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Language Filter */}
          <div className="flex items-center gap-2">
            <FilterIcon className="h-5 w-5 text-gray-500" />
            <Select
              value={selectedLanguage}
              onValueChange={handleLanguageChange}
            >
              <SelectTrigger className="w-[180px] rounded-[8px]">
                <SelectValue placeholder="All Languages" />
              </SelectTrigger>
              <SelectContent className="bg-white">
                <SelectItem value={ALL_VALUE}>All Languages</SelectItem>
                {LANGUAGES.map((language) => (
                  <SelectItem key={language} value={language}>
                    {capitalizeFirstLetter(language)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Results count */}
        <div className="mt-4 text-sm text-gray-600">
          Showing {listings.length} of {pagination.totalListings} results
          {selectedCategory !== ALL_VALUE &&
            ` in ${capitalizeFirstLetter(selectedCategory)}`}
          {selectedLanguage !== ALL_VALUE &&
            ` (${capitalizeFirstLetter(selectedLanguage)})`}
          {searchTerm && ` for "${searchTerm}"`}
        </div>
      </div>

      {/* Listings Grid */}
      {listings.length === 0 ? (
        <EmptyState />
      ) : (
        <>
          <div className="grid grid-cols-3 gap-4 max-lg:grid-cols-2 max-sm:grid-cols-1">
            {listings.map((listing) => (
              <ListingCard key={listing._id} listing={listing} />
            ))}
          </div>

          {/* Pagination */}
          {pagination.totalPages > 1 && (
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    onClick={() =>
                      currentPage > 1 && handlePageChange(currentPage - 1)
                    }
                    className={
                      currentPage === 1
                        ? "pointer-events-none opacity-50"
                        : "cursor-pointer"
                    }
                  />
                </PaginationItem>

                {generatePaginationItems(
                  currentPage,
                  pagination.totalPages
                ).map((item, index) => (
                  <PaginationItem key={index}>
                    {item === "ellipsis" ? (
                      <PaginationEllipsis />
                    ) : (
                      <PaginationLink
                        onClick={() => handlePageChange(Number(item))}
                        isActive={currentPage === item}
                        className="cursor-pointer"
                      >
                        {item}
                      </PaginationLink>
                    )}
                  </PaginationItem>
                ))}

                <PaginationItem>
                  <PaginationNext
                    onClick={() =>
                      currentPage < pagination.totalPages &&
                      handlePageChange(currentPage + 1)
                    }
                    className={
                      currentPage === pagination.totalPages
                        ? "pointer-events-none opacity-50"
                        : "cursor-pointer"
                    }
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          )}
        </>
      )}
    </div>
  );
};

export default Listings;
