import { ExploreSkillsCard } from "@/components/dashboard/ExploreSkillsCard";
import { LearningCard } from "@/components/dashboard/LearningCard";
import { SessionsOverviewCard } from "@/components/dashboard/SessionsOverviewCard";
import { SessionData, UpcomingSession } from "@/components/dashboard/types";
import { UpcomingSessionsCard } from "@/components/dashboard/UpcomingSessionsCard";
import { explore, learn } from "../../../../public/images";

export default function DashboardPage() {
  // Sample data for the donut chart
  const sessionData: SessionData[] = [
    { name: "Scheduled", value: 12, color: "#3b82f6" }, // Blue
    { name: "Completed", value: 8, color: "#10b981" }, // Green
  ];

  // Sample data for upcoming sessions
  const upcomingSessions: UpcomingSession[] = [
    { title: "Learn Python Basics", date: "10/25, 3 PM", type: "Learning" },
    { title: "Teach Graphic Design", date: "10/26, 4 PM", type: "Teaching" },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <SessionsOverviewCard data={sessionData} />
        <ExploreSkillsCard exploreImage={explore} />
        <LearningCard learnImage={learn} />
      </div>
      <UpcomingSessionsCard sessions={upcomingSessions} />
    </div>
  );
}
