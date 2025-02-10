"use client";
import React, { useEffect, useState } from "react";
import { apiGet } from "@/utils/api";
import LoaderSpinner from "../ui/loader";
import SessionCard from "./SessionCard";
import { usePathname } from "next/navigation";
import { Calendar, CheckCircle } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

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
  status: "upcoming" | "completed" | "expired";
}

const EmptyState = ({ status }: { status: string }) => {
  const isUpcoming = status === "upcoming";
  return (
    <div className="flex flex-col items-center justify-center h-[70vh] text-center p-4">
      {isUpcoming ? (
        <Calendar className="w-16 h-16 text-gray-400 mb-4" />
      ) : (
        <CheckCircle className="w-16 h-16 text-gray-400 mb-4" />
      )}
      <h3 className="text-xl font-semibold text-gray-700 mb-2">
        {isUpcoming ? "No Upcoming Sessions" : "No Sessions Found"}
      </h3>
      <p className="text-gray-500 max-w-md">
        {isUpcoming
          ? "You don't have any upcoming sessions scheduled. Browse available listings to book a new session."
          : "No sessions found in this category."}
      </p>
    </div>
  );
};

const SessionGrid = ({
  sessions,
  status,
}: {
  sessions: Session[];
  status: string;
}) => {
  if (sessions.length === 0) {
    return <EmptyState status={status} />;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {sessions.map((session: Session) => (
        <SessionCard
          key={session._id}
          session={session}
          status={session.status}
        />
      ))}
    </div>
  );
};

const Sessions = () => {
  const [sessions, setSessions] = useState<Session[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const pathname = usePathname();
  const isUpcomingPage = pathname === "/my-schedule";
  const status = isUpcomingPage ? "upcoming" : "completed";

  const getSession = async () => {
    try {
      setLoading(true);
      const response = await apiGet(`/api/sessions?status=${status}`);
      setSessions(response?.data?.sessions);
    } catch (err) {
      setError("Failed to fetch sessions");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getSession();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[70vh] w-full">
        <LoaderSpinner />
      </div>
    );
  }

  if (error) {
    return <div className="text-center text-red-500 p-4">{error}</div>;
  }

  if (sessions.length === 0) {
    return <EmptyState status={status} />;
  }

  if (isUpcomingPage) {
    return (
      <div className="container">
        <SessionGrid sessions={sessions} status="upcoming" />
      </div>
    );
  }

  // Filter sessions by status for the previous page
  const completedSessions = sessions.filter(
    (session) => session.status === "completed"
  );
  const expiredSessions = sessions.filter(
    (session) => session.status === "expired"
  );

  return (
    <div className="container">
      <Tabs defaultValue="completed" className="w-full">
        <TabsList className="w-fit border-b">
          <TabsTrigger
            value="completed"
            className="px-4 py-2 text-sm font-medium text-gray-600 data-[state=active]:text-blue-1 data-[state=active]:border-b-2 data-[state=active]:border-blue-1"
          >
            Completed Sessions ({completedSessions.length})
          </TabsTrigger>

          <TabsTrigger
            value="expired"
            className="px-4 py-2 text-sm font-medium text-gray-600 data-[state=active]:text-blue-1 data-[state=active]:border-b-2 data-[state=active]:border-blue-1"
          >
            Expired Sessions ({expiredSessions.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="completed">
          <SessionGrid sessions={completedSessions} status="completed" />
        </TabsContent>

        <TabsContent value="expired">
          <SessionGrid sessions={expiredSessions} status="expired" />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Sessions;
