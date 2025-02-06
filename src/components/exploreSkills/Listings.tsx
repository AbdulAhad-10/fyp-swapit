// Listings.tsx
"use client";
import { apiGet } from "@/utils/api";
import ListingCard from "./ListingCard";
import { useEffect, useState } from "react";
import LoaderSpinner from "../ui/loader";
import { Inbox } from "lucide-react";

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
  };
}

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

const Listings = () => {
  const [listings, setListings] = useState<Listing[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchListings = async () => {
    try {
      setLoading(true);
      const response = await apiGet<ListingsResponse>("/api/listings");
      if (response.error) {
        setError(response.error);
        return;
      }
      if (response.data) {
        setListings(response.data?.listings);
      }
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "An error occurred";
      setError(errorMessage);
      console.error("Error fetching listings:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchListings();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[70vh]">
        <LoaderSpinner />
      </div>
    );
  }

  if (error) {
    return <div className="text-center py-8 text-red-500">{error}</div>;
  }

  if (listings.length === 0) {
    return <EmptyState />;
  }

  return (
    <div className="grid grid-cols-3 gap-4 max-lg:grid-cols-2 max-sm:grid-cols-1">
      {listings.map((listing) => (
        <ListingCard key={listing._id} listing={listing} />
      ))}
    </div>
  );
};

export default Listings;
