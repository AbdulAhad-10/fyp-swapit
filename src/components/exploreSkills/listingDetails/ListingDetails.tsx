"use client";
import { Clock, MessagesSquare, Calendar, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useEffect, useState } from "react";
import SessionRequestDialog from "../SessionRequestDialog";
import { apiGet } from "@/utils/api";
import { useParams, usePathname } from "next/navigation";
import LoaderSpinner from "@/components/ui/loader";
import { cn } from "@/lib/utils";

interface Creator {
  _id: string;
  username: string;
  profileImageUrl: string;
}

interface Review {
  _id: string;
  user: {
    _id: string;
    username: string;
    profileImageUrl: string;
  };
  rating: number;
  review: string;
  createdAt: string;
}

interface Listing {
  _id: string;
  title: string;
  description: string;
  category: string;
  language: string;
  prerequisites: string;
  duration: string;
  timeFrom: string;
  timeTo: string;
  timezone: string;
  availableDays: string[];
  creator: Creator;
  createdAt: string;
  updatedAt: string;
  averageRating: number;
  totalRatings: number;
  feedback: Review[];
}

const RatingStars = ({ rating }: { rating: number }) => {
  return (
    <div className="flex">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={`w-4 h-4 ${
            star <= rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
          }`}
        />
      ))}
    </div>
  );
};

const ReviewsSection = ({
  reviews,
  averageRating,
  totalRatings,
}: {
  reviews: Review[];
  averageRating: number;
  totalRatings: number;
}) => {
  if (!reviews || reviews.length === 0) {
    return (
      <div className="py-12 text-center">
        <p className="text-lg text-gray-500">No reviews yet.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Overall Rating Summary */}
      <div className="flex items-center gap-4 p-4 rounded-[8px] bg-white">
        <div className="flex items-center gap-2">
          <span className="text-2xl font-bold">{averageRating.toFixed(1)}</span>
          <RatingStars rating={averageRating} />
        </div>
        <span className="text-gray-600">
          ({totalRatings} {totalRatings === 1 ? "review" : "reviews"})
        </span>
      </div>

      {/* Individual Reviews */}
      <div className="space-y-6">
        {reviews.map((review) => (
          <div key={review._id} className="p-4 border bg-white rounded-[8px]">
            <div className="flex items-center gap-3 mb-3">
              <Avatar className="w-10 h-10 border">
                <AvatarImage src={review.user.profileImageUrl} />
                <AvatarFallback>
                  {review.user.username.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div>
                <h4 className="font-medium">{review.user.username}</h4>
                <div className="flex items-center gap-2">
                  <RatingStars rating={review.rating} />
                  <span className="text-sm text-gray-500">
                    {new Date(review.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </div>
            <p className="text-gray-600">{review.review}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

const ListingDetails = () => {
  const params = useParams();
  const listingId = params.id;
  const [showRequestDialog, setShowRequestDialog] = useState(false);
  const [listing, setListing] = useState<Listing | null>(null);
  const pathname = usePathname();

  const isMyListing = pathname.startsWith("/my-listings") ? true : false;

  const getListingDetails = async () => {
    try {
      const response = await apiGet(`/api/listings/${listingId}`);
      if (response.data.success) {
        setListing(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching listing details:", error);
    }
  };

  useEffect(() => {
    getListingDetails();
  }, [listingId]);

  if (!listing) {
    return (
      <div className="flex items-center justify-center h-[60vh]">
        <LoaderSpinner />
      </div>
    );
  }

  function capitalizeFirstLetter(string: string) {
    if (!string) return string;
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
  }

  function capitalizeWords(string: string) {
    if (!string) return string;
    return string
      .split(" ")
      .map((word) => capitalizeFirstLetter(word))
      .join(" ");
  }

  return (
    <>
      <div
        className={cn(
          !isMyListing && "grid grid-cols-3 gap-4 max-lg:grid-cols-1"
        )}
      >
        {/* Main Content */}
        <div className="col-span-2 space-y-4">
          {/* Title Section */}
          <div className="p-8 bg-white border shadow-sm rounded-[8px]">
            <h1 className="text-4xl font-bold text-gray-900">
              {listing.title}
            </h1>
            <div className="flex gap-2 mt-4">
              <Badge variant="secondary" className="px-3 py-1 bg-sky-1">
                {listing.category}
              </Badge>
              <Badge variant="secondary" className="px-3 py-1 bg-sky-1">
                {listing.language}
              </Badge>
            </div>
            <div className="flex items-center gap-2 mt-4">
              <RatingStars rating={listing.averageRating} />
              <span className="text-gray-600">
                ({listing.totalRatings}{" "}
                {listing.totalRatings === 1 ? "review" : "reviews"})
              </span>
            </div>
            <p className="mt-4 leading-relaxed text-gray-600">
              {listing.description}
            </p>
          </div>

          {/* Tabs Section */}
          <Card className="border shadow-sm rounded-[8px]">
            <CardContent className="p-0">
              <Tabs defaultValue="overview" className="w-full rounded-[8px]">
                <TabsList className="justify-start w-full h-auto p-0 border-b bg-gray-50/50 rounded-[8px]">
                  <TabsTrigger
                    value="overview"
                    className="px-8 py-4 data-[state=active]:bg-white rounded-tl-[8px]"
                  >
                    Overview
                  </TabsTrigger>
                  <TabsTrigger
                    value="syllabus"
                    className="px-8 py-4 data-[state=active]:bg-white"
                  >
                    What You&apos;ll Learn
                  </TabsTrigger>
                  <TabsTrigger
                    value="reviews"
                    className="px-8 py-4 data-[state=active]:bg-white"
                  >
                    Reviews
                  </TabsTrigger>
                </TabsList>

                <div className="p-8">
                  <TabsContent value="overview" className="mt-0 space-y-6">
                    <div className="grid grid-cols-2 gap-6">
                      <Card className="border-2 border-gray-100 bg-white rounded-[8px]">
                        <CardHeader>
                          <CardTitle className="text-lg font-semibold">
                            Prerequisites
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="text-gray-600">
                            {listing.prerequisites}
                          </div>
                        </CardContent>
                      </Card>

                      <Card className="border-2 border-gray-100 bg-white rounded-[8px]">
                        <CardHeader>
                          <CardTitle className="text-lg font-semibold">
                            Session Details
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <ul className="space-y-3 text-gray-600">
                            <li className="flex items-center gap-2">
                              <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
                              Duration: {listing.duration} minutes
                            </li>
                            <li className="flex items-center gap-2">
                              <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
                              Time: {listing.timeFrom} - {listing.timeTo}
                            </li>
                            <li className="flex items-center gap-2">
                              <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
                              Timezone: {listing.timezone}
                            </li>
                          </ul>
                        </CardContent>
                      </Card>
                    </div>
                  </TabsContent>

                  <TabsContent value="syllabus" className="mt-0">
                    <div className="py-12 text-center">
                      <p className="text-lg text-gray-500">
                        Syllabus details coming soon.
                      </p>
                    </div>
                  </TabsContent>

                  <TabsContent value="reviews" className="mt-0">
                    <ReviewsSection
                      reviews={listing.feedback}
                      averageRating={listing.averageRating}
                      totalRatings={listing.totalRatings}
                    />
                  </TabsContent>
                </div>
              </Tabs>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        {!isMyListing && (
          <div>
            <Card className="sticky bg-white border shadow-sm top-8 rounded-[8px]">
              <CardContent className="p-6 space-y-6">
                <div className="flex items-start gap-4">
                  <Avatar className="w-16 h-16 border-2 border-gray-100">
                    <AvatarImage src={listing?.creator?.profileImageUrl} />
                    <AvatarFallback className="text-lg">
                      {listing?.creator?.username.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900">
                      {listing?.creator?.username}
                    </h3>
                    <p className="text-gray-600">
                      {capitalizeWords(listing.category)} Mentor
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 rounded-[8px] bg-gray-50">
                    <div className="flex items-center gap-2 text-gray-600">
                      <Clock className="w-4 h-4" />
                      <span className="font-medium">
                        {listing.duration} mins
                      </span>
                    </div>
                  </div>
                  <div className="p-4 rounded-[8px] bg-gray-50">
                    <div className="flex items-center gap-2 text-gray-600">
                      <MessagesSquare className="w-4 h-4" />
                      <span className="font-medium">
                        {capitalizeWords(listing.language)}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-gray-600">
                    <Calendar className="flex-shrink-0 w-4 h-4" />
                    <div>
                      <p className="font-medium text-gray-900">
                        Available Times:
                      </p>
                      <p>
                        {listing.availableDays.join(", ")} ({listing.timeFrom} -{" "}
                        {listing.timeTo} {listing.timezone})
                      </p>
                    </div>
                  </div>
                </div>

                <Button
                  className="w-full primary-btn"
                  onClick={() => setShowRequestDialog(true)}
                >
                  Request Session
                </Button>
              </CardContent>
            </Card>
          </div>
        )}
      </div>

      {!isMyListing && (
        <SessionRequestDialog
          open={showRequestDialog}
          onOpenChange={setShowRequestDialog}
          duration={listing.duration}
          creatorId={listing?.creator?._id}
          listingId={listing._id}
        />
      )}
    </>
  );
};

export default ListingDetails;
