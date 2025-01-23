import Image from "next/image";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { Clock, User, CalendarDays } from "lucide-react";
import AcceptRequest from "./requestActions/AcceptRequest";
import RejectRequest from "./requestActions/RejectRequest";
import CancelRequest from "./requestActions/CancelRequest";

interface Request {
  _id: string;
  instructorId: {
    _id: string;
    username: string;
    profileImageUrl: string;
  };
  learnerId: {
    _id: string;
    username: string;
    profileImageUrl: string;
  };
  listingId: {
    _id: string;
    title: string;
    duration: string;
  };
  proposedDateTime: string;
  note?: string;
  status: "pending" | "accepted" | "rejected" | "expired";
  createdAt: string;
}

interface RequestCardProps {
  request: Request;
  isSentRequest?: boolean;
}

const getStatusBadgeColor = (status: Request["status"]) => {
  switch (status) {
    case "pending":
      return "bg-yellow-100 text-yellow-800";
    case "accepted":
      return "bg-green-100 text-green-800";
    case "rejected":
      return "bg-red-100 text-red-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

const RequestCard = ({ request, isSentRequest = false }: RequestCardProps) => {
  // Determine which user details to display based on whether it's a sent or received request
  const displayUser = isSentRequest ? request.instructorId : request.learnerId;
  const userRole = isSentRequest ? "Instructor" : "Sender";

  return (
    <Card className="w-full bg-white rounded-[8px]">
      <CardContent className="p-6">
        <div className="flex flex-col space-y-4">
          {/* Header: Title and Status */}
          <div className="flex justify-between items-start">
            <h3 className="text-lg font-semibold">{request.listingId.title}</h3>
            <div className="flex items-center space-x-2">
              <Badge
                variant="secondary"
                className={getStatusBadgeColor(request.status)}
              >
                {request.status.charAt(0).toUpperCase() +
                  request.status.slice(1)}
              </Badge>
              {isSentRequest && request.status === "pending" && (
                <CancelRequest id={request._id} />
              )}
            </div>
          </div>

          {/* User Info */}
          <div className="flex items-center space-x-3">
            <div className="relative h-10 w-10 rounded-full overflow-hidden">
              <Image
                src={displayUser.profileImageUrl}
                alt={displayUser.username}
                fill
                className="object-cover"
              />
            </div>
            <div>
              <p className="font-medium">{displayUser.username}</p>
              <div className="flex items-center text-sm text-gray-500">
                <User className="h-4 w-4 mr-1" />
                {userRole}
              </div>
            </div>
          </div>

          {/* DateTime and Duration
          <div>
            <div className="flex items-center text-sm text-gray-600">
              <CalendarDays className="h-4 w-4 mr-2" />
              {format(new Date(request.proposedDateTime), "MMM d, yyyy")}
            </div>
            <div className="flex items-center text-sm text-gray-600">
              <Clock className="h-4 w-4 mr-2" />
              {format(new Date(request.proposedDateTime), "h:mm a")}
            </div>
          </div> */}

          {/* DateTime and Duration */}
          <div>
            <div className="flex items-center text-sm text-gray-600">
              <CalendarDays className="h-4 w-4 mr-2" />
              {format(new Date(request.proposedDateTime), "MMM d, yyyy")}
            </div>
            <div className="flex items-center text-sm text-gray-600">
              <Clock className="h-4 w-4 mr-2" />
              {format(new Date(request.proposedDateTime), "h:mm a")}
            </div>
          </div>

          {/* Duration */}
          <div className="text-sm text-gray-600">
            Duration: {request.listingId.duration} minutes
          </div>

          {/* Note if exists */}
          {request.note && (
            <div className="mt-2 p-3 bg-gray-50 rounded-md">
              <p className="text-sm font-medium text-gray-700">Note:</p>
              <p className="text-sm text-gray-600">{request.note}</p>
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter className="flex justify-end">
        {!isSentRequest && request.status === "pending" && (
          <div className="flex gap-3">
            <RejectRequest id={request._id} />
            <AcceptRequest id={request._id} />
          </div>
        )}
      </CardFooter>
    </Card>
  );
};

export default RequestCard;
