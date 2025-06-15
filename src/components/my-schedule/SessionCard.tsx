import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, Clock, Video } from "lucide-react";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { useState, useEffect } from "react";
import { apiPatch } from "@/utils/api";

interface User {
  _id: string;
  username: string;
  profileImageUrl: string;
}

interface Session {
  _id: string;
  title: string;
  scheduledFor: string;
  duration: string;
  callId: string;
  instructorId: User;
  learnerId: User;
}

interface SessionCardProps {
  session: Session;
  status: "upcoming" | "completed" | "expired";
}

const SessionCard = ({ session, status }: SessionCardProps) => {
  const router = useRouter();
  const [canJoin, setCanJoin] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState<string>("");

  const updateSessionStatus = async () => {
    const response = await apiPatch(`/api/sessions/status/${session._id}`, {
      status: "expired",
    });

    if (response.error) {
      console.error("Failed to update session status:", response.error);
    }
  };

  const checkSessionAvailability = () => {
    const now = new Date();
    const sessionTime = new Date(session.scheduledFor);
    const timeDiff = sessionTime.getTime() - now.getTime();

    // Can join from 5 minutes before until 30 minutes after
    const earlyWindow = 5 * 60 * 1000; // 5 minutes in milliseconds
    const lateWindow = 30 * 60 * 1000; // 30 minutes in milliseconds

    const canJoinTime =
      timeDiff <= earlyWindow && // Within 5 minutes before
      timeDiff > -lateWindow && // Within 30 minutes after
      timeDiff > -(parseInt(session.duration) * 60 * 1000); // Not past session duration

    setCanJoin(canJoinTime);

    // Update time remaining or late message
    if (timeDiff > 0) {
      const minutes = Math.floor(timeDiff / (1000 * 60));
      const hours = Math.floor(minutes / 60);
      setTimeRemaining(
        `Starts in ${hours > 0 ? `${hours}h ` : ""}${minutes % 60}m`
      );
    } else if (timeDiff < -lateWindow && status === "upcoming") {
      setTimeRemaining("Session expired");
      updateSessionStatus();
    } else {
      setTimeRemaining("Join now");
    }
  };

  useEffect(() => {
    checkSessionAvailability();
    const timer = setInterval(checkSessionAvailability, 60000); // Update every minute
    return () => clearInterval(timer);
  }, [session.scheduledFor]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const formatTime = (dateString: string) => {
    return new Date(dateString).toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getInitials = (username: string) => {
    return username.slice(0, 2).toUpperCase();
  };

  return (
    <Card className="hover:shadow-lg transition-shadow rounded-[8px] bg-white">
      <CardHeader>
        <CardTitle className="text-lg truncate">{session.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-gray-600">
            <Calendar className="w-4 h-4" />
            <span>{formatDate(session.scheduledFor)}</span>
          </div>
          <div className="flex items-center gap-2 text-gray-600">
            <Clock className="w-4 h-4" />
            <span>{formatTime(session.scheduledFor)}</span>
          </div>
          <div className="text-sm text-gray-500">
            Duration: {session.duration} mins
          </div>
          <div className="flex items-center justify-between pt-2">
            <div className="flex items-center gap-4">
              <div className="flex flex-col items-center gap-1">
                <Avatar className="w-8 h-8">
                  <AvatarImage
                    src={session.instructorId.profileImageUrl}
                    alt={session.instructorId.username}
                  />
                  <AvatarFallback>
                    {getInitials(session.instructorId.username)}
                  </AvatarFallback>
                </Avatar>
                <span className="text-xs text-gray-500">Instructor</span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <Avatar className="w-8 h-8">
                  <AvatarImage
                    src={session.learnerId.profileImageUrl}
                    alt={session.learnerId.username}
                  />
                  <AvatarFallback>
                    {getInitials(session.learnerId.username)}
                  </AvatarFallback>
                </Avatar>
                <span className="text-xs text-gray-500">Learner</span>
              </div>
            </div>
          </div>
          {status === "upcoming" && (
            <Button
              onClick={() =>
                router.push(
                  `/meeting/${session.callId}?sessionId=${session._id}`
                )
              }
              className={`w-full ${
                canJoin
                  ? "primary-btn hover:primary-btn"
                  : "bg-gray-300 cursor-not-allowed rounded-xl"
              }`}
              disabled={!canJoin}
            >
              <Video className="w-4 h-4 mr-2" />
              {canJoin ? "Join Meeting" : timeRemaining}
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default SessionCard;
