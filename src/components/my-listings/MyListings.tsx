"use client";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import Link from "next/link";
import { apiGet } from "@/utils/api";
import { useEffect, useState } from "react";
import LoaderSpinner from "../ui/loader";
import ListingCard from "../exploreSkills/ListingCard";

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

const MyListings = () => {
  const [listings, setListings] = useState<Listing[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const GetMyListings = async () => {
    try {
      setIsLoading(true);
      const response = await apiGet("/api/listings/user");

      if (response.data?.listings) {
        setListings(response.data.listings);
      }
    } catch (err) {
      console.log("Error fetching user listings:", err);
      setError(err instanceof Error ? err.message : "Failed to fetch listings");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    GetMyListings();
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-[60vh]">
        <LoaderSpinner />
      </div>
    );
  }

  if (error) {
    return <div className="text-center py-8 text-red-600">Error: {error}</div>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {listings.map((listing) => (
        <ListingCard key={listing._id} listing={listing} />
      ))}

      {listings.length === 0 && (
        <div className="col-span-full">
          <Card className="border-2 border-dashed">
            <CardContent className="p-12 text-center">
              <div className="mx-auto w-16 h-16 mb-4 rounded-full bg-blue-50 flex items-center justify-center">
                <Plus className="w-8 h-8 text-blue-500" />
              </div>
              <h3 className="text-xl font-semibold mb-2">No listings yet</h3>
              <p className="text-gray-600 mb-6">
                Create your first listing to start sharing your skills with
                others
              </p>
              <Link href="/create-listing">
                <Button className="primary-btn">Create New Listing</Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default MyListings;
