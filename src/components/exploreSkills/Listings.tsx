// Listings.tsx
"use client";
import { apiGet } from "@/utils/api";
import ListingCard from "./ListingCard";
import { useEffect, useState } from "react";
import LoaderSpinner from "../ui/loader";

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
}

interface ListingsResponse {
  listings: Listing[];
  pagination: {
    currentPage: number;
    totalPages: number;
    totalListings: number;
  };
}

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
        <LoaderSpinner />;
      </div>
    );
  }

  if (error) {
    return <div className="text-center py-8 text-red-500">{error}</div>;
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
