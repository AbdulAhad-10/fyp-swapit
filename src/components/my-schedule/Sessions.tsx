"use client";

import React, { useEffect, useState } from "react";
import { apiGet } from "@/utils/api";
import LoaderSpinner from "../ui/loader";
import SessionCard from "./SessionCard";
import { usePathname } from "next/navigation";
import { Calendar, CheckCircle } from "lucide-react";

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
        {isUpcoming ? "No Upcoming Sessions" : "No Completed Sessions"}
      </h3>
      <p className="text-gray-500 max-w-md">
        {isUpcoming
          ? "You don't have any upcoming sessions scheduled. Browse available listings to book a new session."
          : "You haven't completed any sessions yet. Your completed sessions will appear here."}
      </p>
    </div>
  );
};

const Sessions = () => {
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const pathname = usePathname();

  const status = pathname === "/my-schedule" ? "upcoming" : "completed";

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

  return (
    <div className="container">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {sessions.map((session: Session) => (
          <SessionCard key={session._id} session={session} status={status} />
        ))}
      </div>
    </div>
  );
};

export default Sessions;
