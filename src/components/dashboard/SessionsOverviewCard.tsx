import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { DonutChart } from "@/components/ui/donut-chart";
import { SessionData } from "./types";

interface SessionsOverviewCardProps {
  data: SessionData[];
}

export const SessionsOverviewCard: React.FC<SessionsOverviewCardProps> = ({
  data,
}) => {
  return (
    <Card className="bg-white rounded-[8px]">
      <CardHeader>
        <CardTitle>Sessions Overview</CardTitle>
        <CardDescription>
          Total sessions scheduled vs. completed
        </CardDescription>
      </CardHeader>
      <CardContent>
        <DonutChart data={data} />
      </CardContent>
    </Card>
  );
};
