export interface SessionData {
  name: string;
  value: number;
  color: string;
}

export interface UpcomingSession {
  title: string;
  date: string;
  type: "Learning" | "Teaching";
}
