"use client";

import { apiGet } from "@/utils/api";
import { useEffect } from "react";

const Sessions = () => {
  const getSession = async () => {
    const response = await apiGet("/api/sessions");
    console.log(response);
  };

  useEffect(() => {
    getSession();
  }, []);

  return <div>Sessions</div>;
};

export default Sessions;
