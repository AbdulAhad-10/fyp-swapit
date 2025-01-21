import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { Clock, User, CalendarDays } from "lucide-react";

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
  proposedDateTime: Date;
  note?: string;
  status: "pending" | "accepted" | "rejected";
  createdAt: Date;
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

const RequestCard = ({ request }: { request: Request }) => (
  <Card className="mb-4 bg-white rounded-[8px]">
    <CardContent className="p-4">
      <div className="flex justify-between items-start">
        <div className="space-y-2">
          {/* Title and Status */}
          <div className="flex items-center gap-2">
            <h3 className="font-semibold text-lg">{request.listingId.title}</h3>
            <Badge
              className={`${getStatusBadgeColor(request.status)} capitalize`}
            >
              {request.status}
            </Badge>
          </div>

          {/* User Info */}
          <div className="flex items-center text-gray-600 gap-2">
            <User className="h-4 w-4" />
            <span className="text-sm">{request.instructorId.username}</span>
          </div>

          {/* DateTime */}
          <div className="flex items-center gap-4 text-sm text-gray-600">
            <div className="flex items-center gap-1">
              <CalendarDays className="h-4 w-4" />
              {format(new Date(request.proposedDateTime), "MMM d, yyyy")}
            </div>
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              {format(new Date(request.proposedDateTime), "h:mm a")}
            </div>
          </div>

          {/* Duration */}
          <div className="text-sm text-gray-600">
            Duration: {request.listingId.duration} minutes
          </div>

          {/* Note if exists */}
          {request.note && (
            <div className="mt-2 text-sm text-gray-600 bg-gray-50 p-2 rounded">
              <p className="font-medium">Note:</p>
              <p>{request.note}</p>
            </div>
          )}
        </div>

        {/* User Avatar */}
        <Image
          src={request.instructorId.profileImageUrl}
          alt={request.instructorId.username}
          className="w-10 h-10 rounded-full"
          width={30}
          height={30}
        />
        {/* <div className="bg-sky-1 rounded-full p-2">
          <User className="w-6 h-6 " />
        </div> */}
      </div>
    </CardContent>
  </Card>
);

export default RequestCard;
