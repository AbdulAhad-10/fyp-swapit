// app/dashboard/page.tsx
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { DonutChart } from "@/components/ui/donut-chart";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { explore, learn } from "../../../../public/images";

export default function DashboardPage() {
  // Sample data for the donut chart
  const sessionData = [
    { name: "Scheduled", value: 12, color: "#3b82f6" }, // Blue
    { name: "Completed", value: 8, color: "#10b981" }, // Green
  ];

  // Sample data for upcoming sessions
  const upcomingSessions = [
    { title: "Learn Python Basics", date: "10/25, 3 PM", type: "Learning" },
    { title: "Teach Graphic Design", date: "10/26, 4 PM", type: "Teaching" },
  ];

  return (
    <div className="space-y-6">
      {/* Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Donut Chart Card */}
        <Card className="bg-white rounded-[8px]">
          <CardHeader>
            <CardTitle>Sessions Overview</CardTitle>
            <CardDescription>
              Total sessions scheduled vs. completed
            </CardDescription>
          </CardHeader>
          <CardContent>
            <DonutChart data={sessionData} />
          </CardContent>
        </Card>

        {/* Explore Skills Card */}
        <Card className="bg-white rounded-[8px]">
          <CardHeader>
            <CardTitle>Explore Skills</CardTitle>
            <CardDescription>
              Discover new skills to learn or teach
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Image
              src={explore}
              alt="explore skills"
              width={300}
              height={200}
            />
            <Button className="w-full primary-btn" asChild>
              <a href="/explore-skills">Explore Skills</a>
            </Button>
          </CardContent>
        </Card>

        {/* Illustration Card */}
        <Card className="col-span-1 md:col-span-2 lg:col-span-1 bg-white rounded-[8px]">
          <CardHeader>
            <CardTitle>Keep Learning!</CardTitle>
            <CardDescription>
              Your journey to skill mastery starts here.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Image
              src={learn}
              alt="Learning Illustration"
              width={300}
              height={200}
              className="mx-auto"
            />
          </CardContent>
        </Card>
      </div>

      {/* Upcoming Sessions */}
      <Card className="bg-white rounded-[8px]">
        <CardHeader>
          <CardTitle>Upcoming Sessions</CardTitle>
          <CardDescription>
            Your next learning and teaching sessions
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {upcomingSessions.map((session, index) => (
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
    </div>
  );
}
