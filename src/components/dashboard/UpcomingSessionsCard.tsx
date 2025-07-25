import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Session } from "./types";
import { formatSessionDate } from "@/utils/formatDate";
import Link from "next/link";

interface UpcomingSessionsCardProps {
  sessions: Session[];
  isLoading: boolean;
  error: string | null;
}

export const UpcomingSessionsCard: React.FC<UpcomingSessionsCardProps> = ({
  sessions,
  isLoading,
  error,
}) => {
  if (isLoading) {
    return (
      <Card className="bg-white rounded-[8px]">
        <CardContent className="p-6">Loading sessions...</CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="bg-white rounded-[8px]">
        <CardContent className="p-6 text-red-500">{error}</CardContent>
      </Card>
    );
  }

  // Sort sessions by date, most recent first
  const sortedSessions = [...sessions].sort(
    (a, b) =>
      new Date(a.scheduledFor).getTime() - new Date(b.scheduledFor).getTime()
  );

  return (
    <Card className="bg-white rounded-[8px]">
      <CardHeader>
        <div className="flex lg:justify-between lg:items-center lg:flex-row flex-col gap-2">
          <div className="flex flex-col gap-2">
            <CardTitle>Upcoming Sessions</CardTitle>
            <CardDescription>
              Your next learning and teaching sessions
            </CardDescription>
          </div>

          <Link
            href={"/my-schedule"}
            className="primary-btn px-4 py-2 text-center"
          >
            View All
          </Link>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {sortedSessions.length > 0 ? (
            sortedSessions.map((session) => (
              <div
                key={session._id}
                className="p-4 border rounded-[8px] bg-gray-50"
              >
                <h3 className="font-semibold">{session.title}</h3>
                <div className="text-sm text-gray-500 space-y-1">
                  <p>
                    {formatSessionDate(session.scheduledFor)} •{" "}
                    {session.duration} minutes
                  </p>
                  <p>
                    Instructor: {session.instructorId.username} • Learner:{" "}
                    {session.learnerId.username}
                  </p>
                  <p className="capitalize">Status: {session.status}</p>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center p-4 text-gray-500">
              No upcoming sessions found
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
