"use client";
import { useEffect, useState } from "react";
import { apiGet } from "@/utils/api";
import { SessionsOverviewCard } from "./SessionsOverviewCard";
import { ExploreSkillsCard } from "./ExploreSkillsCard";
import { LearningCard } from "./LearningCard";
import { UpcomingSessionsCard } from "./UpcomingSessionsCard";
import { explore, learn } from "../../../public/images";
import { Session } from "./types";

export default function Dashboard() {
  const [sessions, setSessions] = useState<Session[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchSessions = async () => {
    try {
      setIsLoading(true);
      const { data } = await apiGet("/api/sessions");
      setSessions(data.sessions);
    } catch (error) {
      setError("Failed to fetch sessions");
      console.error("Error fetching sessions:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchSessions();
  }, []);

  // Filter out expired sessions
  const activeAndUpcomingSessions = sessions.filter(
    (session) => session.status !== "expired"
  );

  // Calculate session statistics
  // Include fallback zeros so chart component doesn't receive empty data
  const totalCount = sessions.length;
  const completedCount = sessions.filter(
    (s) => s.status === "completed"
  ).length;

  // If both are zero, provide minimal placeholder data
  const sessionData = [
    {
      name: "Total",
      value: totalCount || 1, // Fallback to 1 for visualization if no data
      color: "#3b82f6",
    },
    {
      name: "Completed",
      value: completedCount || 1, // Fallback to 1 for visualization if no data
      color: "#10b981",
    },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <SessionsOverviewCard data={sessionData} />
        <ExploreSkillsCard exploreImage={explore} />
        <LearningCard learnImage={learn} />
      </div>
      <UpcomingSessionsCard
        sessions={activeAndUpcomingSessions}
        isLoading={isLoading}
        error={error}
      />
    </div>
  );
}
