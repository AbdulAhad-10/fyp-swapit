"use client";

import { apiGet } from "@/utils/api";
import ListingCard from "./ListingCard";
import { useEffect } from "react";

const Listings = () => {
  const fetchListings = async () => {
    try {
      const response = await apiGet("/api/listings");
      if (response.error) {
        console.error("Error fetching listings:", response.error);
        return null;
      }
      console.log("listings data: ", response.data);
    } catch (err) {
      console.log("Error fetching listings:", err);
    }
  };

  useEffect(() => {
    fetchListings();
  }, []);

  return (
    <div className="grid grid-cols-3 gap-4 max-lg:grid-cols-2 max-sm:grid-cols-1">
      <ListingCard />
      <ListingCard />
      <ListingCard />
      <ListingCard />
      <ListingCard />
      <ListingCard />
      <ListingCard />
    </div>
  );
};

export default Listings;
