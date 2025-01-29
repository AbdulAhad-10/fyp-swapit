"use client";

import React, { useEffect, useState } from "react";
import { apiGet } from "@/utils/api";
import LoaderSpinner from "../ui/loader";
import SessionCard from "./SessionCard";

interface Session {
  _id: string;
  title: string;
  scheduledFor: string;
  duration: string;
  meetingLink: string;
  callId: string;
}
const Sessions = () => {
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const getSession = async () => {
    try {
      setLoading(true);
      const response = await apiGet("/api/sessions");
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

  return (
    <div className="container">
      {sessions.length === 0 ? (
        <div className="text-center text-gray-500 p-4">
          No upcoming sessions found
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {sessions.map((session: Session) => (
            <SessionCard key={session._id} session={session} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Sessions;
