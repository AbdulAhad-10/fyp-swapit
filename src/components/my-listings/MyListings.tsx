"use client";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Plus, ExternalLink, Calendar, Clock } from "lucide-react";
import Link from "next/link";
import { apiGet } from "@/utils/api";
import { useEffect, useState } from "react";
import LoaderSpinner from "../ui/loader";

interface Listing {
  _id: string;
  title: string;
  description: string;
  category: string;
  duration: string;
  language: string;
  availableDays: string[];
  timeFrom: string;
  timeTo: string;
  timezone: string;
  prerequisites: string;
  creator: {
    _id: string;
    username: string;
    email: string;
  };
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
        <Card
          key={listing._id}
          className="border shadow-sm hover:shadow-md transition-shadow bg-white rounded-[8px] h-[350px] flex flex-col"
        >
          <CardContent className="p-6 flex-1 overflow-hidden">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-2 line-clamp-1">
                  {listing.title}
                </h2>
                <div className="flex gap-2 mb-4">
                  <Badge className="px-2 py-0.5 bg-sky-1">
                    {listing.language}
                  </Badge>
                  <Badge className="px-2 py-0.5 bg-sky-1">
                    {listing.category}
                  </Badge>
                </div>
              </div>
            </div>

            <p className="text-gray-600 mb-6 line-clamp-2">
              {listing.description}
            </p>

            <div className="space-y-2 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 flex-shrink-0" />
                <span className="truncate">{listing.duration} minutes</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 flex-shrink-0" />
                <span className="truncate">
                  {listing.availableDays.join(", ")} ({listing.timeFrom} -{" "}
                  {listing.timeTo} {listing.timezone})
                </span>
              </div>
            </div>
          </CardContent>

          <CardFooter className="p-6 pt-0 flex gap-3">
            {/* <Button variant="outline" className="flex-1" asChild>
              <Link href={`/edit-listing/${listing._id}`}>
                <Edit className="w-4 h-4 mr-2" />
                Edit
              </Link>
            </Button> */}
            <Button
              variant="outline"
              className="flex-1 primary-btn hover:primary-btn"
              asChild
            >
              <Link href={`/my-listings/${listing._id}`}>
                <ExternalLink className="w-4 h-4 mr-2" />
                View
              </Link>
            </Button>
          </CardFooter>
        </Card>
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
