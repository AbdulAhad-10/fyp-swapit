import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { UpcomingSession } from "./types";

interface UpcomingSessionsCardProps {
  sessions: UpcomingSession[];
}

export const UpcomingSessionsCard: React.FC<UpcomingSessionsCardProps> = ({
  sessions,
}) => {
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
          {sessions.map((session, index) => (
            <div key={index} className="p-4 border rounded-[8px] bg-gray-50">
              <h3 className="font-semibold">{session.title}</h3>
              <p className="text-sm text-gray-500">
                {session.date} • {session.type}
              </p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
