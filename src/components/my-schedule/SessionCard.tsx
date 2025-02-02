import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, Clock, Video } from "lucide-react";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

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
}

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

const SessionCard = ({ session }: SessionCardProps) => {
  const router = useRouter();

  return (
    <Card
      key={session._id}
      className="hover:shadow-lg transition-shadow rounded-[8px] bg-white"
    >
      <CardHeader>
        <CardTitle className="text-lg truncate">{session.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-gray-600">
            <Calendar className="h-4 w-4" />
            <span>{formatDate(session.scheduledFor)}</span>
          </div>
          <div className="flex items-center gap-2 text-gray-600">
            <Clock className="h-4 w-4" />
            <span>{formatTime(session.scheduledFor)}</span>
          </div>
          <div className="text-sm text-gray-500">
            Duration: {session.duration} mins
          </div>

          {/* Participants section */}
          <div className="flex items-center justify-between pt-2">
            <div className="flex items-center gap-4">
              {/* Instructor */}
              <div className="flex flex-col items-center gap-1">
                <Avatar className="h-8 w-8">
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

              {/* Learner */}
              <div className="flex flex-col items-center gap-1">
                <Avatar className="h-8 w-8">
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

          <Button
            onClick={() => router.push(`/meeting/${session.callId}`)}
            className="primary-btn hover:primary-btn w-full"
          >
            <Video className="h-4 w-4" />
            Join Meeting
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default SessionCard;
