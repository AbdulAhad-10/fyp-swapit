import { Clock, User, Star } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import Link from "next/link";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import { usePathname } from "next/navigation";

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

interface ListingCardProps {
  listing: Listing;
}

const ListingCard = ({ listing }: ListingCardProps) => {
  const pathname = usePathname();

  const isMyListing = pathname.startsWith("/my-listings") ? true : false;

  const formatAvailability = (
    days: string[],
    timeFrom: string,
    timeTo: string,
    timezone: string
  ) => {
    return `${days.join(", ")} (${timeFrom} - ${timeTo} ${timezone})`;
  };

  const truncateText = (text: string, maxLength: number) => {
    if (text.length <= maxLength) return text;
    return `${text.slice(0, maxLength)}...`;
  };

  const renderRating = (rating: number, totalRatings: number) => {
    return (
      <div className="flex items-center gap-1.5">
        <div className="flex">
          {[1, 2, 3, 4, 5].map((star) => (
            <Star
              key={star}
              className={`w-4 h-4 ${
                star <= rating
                  ? "text-yellow-400 fill-yellow-400"
                  : "text-gray-300"
              }`}
            />
          ))}
        </div>
        <span className="text-sm text-gray-500">
          ({totalRatings} {totalRatings === 1 ? "review" : "reviews"})
        </span>
      </div>
    );
  };

  return (
    <Card className="w-full max-w-sm bg-white rounded-[8px] flex flex-col h-[340px]">
      <CardHeader className="flex-none">
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1 min-w-0">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <h3 className="text-lg font-bold truncate">
                    {listing.title}
                  </h3>
                </TooltipTrigger>
                <TooltipContent className="bg-white">
                  <p>{listing.title}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            {!isMyListing && (
              <p className="text-sm text-gray-500 flex items-center gap-1">
                <User className="w-4 h-4 flex-shrink-0" />
                <span className="truncate">{listing.creator.username}</span>
              </p>
            )}
            {/* Add rating display here */}
            {renderRating(listing.averageRating, listing.totalRatings)}
          </div>
          <Badge className="bg-sky-1 flex-shrink-0">
            {truncateText(listing.category, 15)}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-3 flex-1">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <p className="text-sm line-clamp-3">{listing.description}</p>
            </TooltipTrigger>
            <TooltipContent className="bg-white">
              <p className="max-w-xs">{listing.description}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <div className="flex items-center text-sm text-gray-600">
          <Clock className="w-4 h-4 mr-2 flex-shrink-0" />
          <span>{listing.duration} mins</span>
        </div>
        <div className="text-sm">
          <span className="font-medium">Available:</span>{" "}
          <span className="inline-block">
            {truncateText(
              formatAvailability(
                listing.availableDays,
                listing.timeFrom,
                listing.timeTo,
                listing.timezone
              ),
              50
            )}
          </span>
        </div>
      </CardContent>
      <CardFooter className="flex-none">
        <Button className="w-full primary-btn">
          <Link
            href={`/explore-skills/${listing._id}`}
            className="w-full block text-center"
          >
            View Details
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ListingCard;
