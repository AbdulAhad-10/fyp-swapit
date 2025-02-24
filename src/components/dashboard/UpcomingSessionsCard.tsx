import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Session } from "./types";
import { formatSessionDate } from "@/utils/formatDate";

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
        <CardTitle>Upcoming Sessions</CardTitle>
        <CardDescription>
          Your next learning and teaching sessions
        </CardDescription>
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
                    {session.instructorId.username === "abdulahad"
                      ? "Teaching"
                      : "Learning"}{" "}
                    with{" "}
                    {session.instructorId.username === "abdulahad"
                      ? session.learnerId.username
                      : session.instructorId.username}
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
